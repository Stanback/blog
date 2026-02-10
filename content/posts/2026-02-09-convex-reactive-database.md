---
title: "Convex and the Reactive Database Paradigm"
description: "How Convex challenges our mental models of databases—not relational, not NoSQL, but something new."
date: 2026-02-09T22:00
type: post
schemaVersion: 1
tags:
  - architecture
  - engineering
heroImage: /images/posts/convex-reactive-database-hero.png
tension: "The old database categories don't fit anymore."
---

# Convex and the Reactive Database Paradigm

I've been building a browser automation system that coordinates multiple AI sessions against different platforms. The state management problem is brutal: session state, selector validity, authentication tokens, rate limits — all changing asynchronously while agents work in parallel.

My first pass was traditional: poll for changes, maintain local state, reconcile conflicts. It was fragile. Stale reads caused retries, retries caused rate limits, rate limits caused cascading failures. What I actually wanted was simpler: every component subscribes to the state it cares about and reacts when it changes. Agent starts working? UI updates. Selector breaks? Repair pipeline triggers. Token expires? Re-auth flow kicks off. No polling, no reconciliation, no "did I miss an update?"

That's what led me to [Convex](https://convex.dev), and it's messing with my mental models.

---

## What Convex Actually Is

Convex calls itself a "document-relational" database. That's not marketing — it's a genuine hybrid:

- **Document**: You store JSON-like nested objects. No rigid schemas upfront.
- **Relational**: You have tables with relations. Tasks reference users via IDs. Joins are real.
- **Reactive**: Queries aren't one-shot. They're subscriptions. When underlying data changes, your query reruns automatically and pushes to clients.
- **Transactional**: Full ACID with serializable isolation. Your entire mutation function is a transaction — no `BEGIN`/`COMMIT` to manage.

The server functions are just TypeScript:

```typescript
export const getAllOpenTasks = query({
  handler: async (ctx) => {
    return await ctx.db
      .query("tasks")
      .withIndex("by_completed", (q) => q.eq("completed", false))
      .collect();
  },
});
```

No SQL. No ORM. The query *is* the code.

---

## How It Actually Works

### Schema: Optional but Powerful

Convex is schemaless by default — you can just start writing data. But add a `schema.ts` file and you get end-to-end type safety:

```typescript
// convex/schema.ts
export default defineSchema({
  messages: defineTable({
    body: v.string(),
    user: v.id("users"),
  }),
  users: defineTable({
    name: v.string(),
    tokenIdentifier: v.string(),
  }).index("by_token", ["tokenIdentifier"]),
});
```

The validators (`v.string()`, `v.id()`, etc.) work at runtime *and* generate TypeScript types. Same validators used for argument validation and schema definition. No separate type definitions to keep in sync.

Philosophy: prototype without a schema, add one when you've solidified your plan. The dashboard can even generate a schema suggestion from your existing data.

### Reactivity: Dependency Tracking

This is where it clicked for my browser automation problem. When you call `useQuery()` in React:

1. **Client opens WebSocket** — a persistent connection to Convex (not HTTP request/response)
2. **Client subscribes** to a query function over that connection
3. **Function runs** in the database, reading whatever tables it needs
4. **Convex tracks the "read set"** — every document the function touched
5. **Result streams back** over the WebSocket
6. **Mutation happens** somewhere (any client, any function)
7. **Convex checks**: did this mutation touch any document in any active query's read set?
8. **If yes**: rerun the query, push new result over the WebSocket to all subscribers

The read-set tracking means you don't declare subscriptions manually — your code implicitly subscribes to whatever it reads. Change propagation is automatic and precise. For my automation system, this means every component subscribes to the state it cares about just by reading it.

![Reactive data flow — one change propagates to all connected clients](/images/posts/convex-reactivity-diagram.png)

### Storage & Scaling

**Under the hood:** Convex Cloud runs on Amazon RDS with MySQL as the persistence layer. The open-source version supports SQLite, Postgres, or MySQL. Documents are JSON-like objects with system fields (`_id`, `_creationTime`) added automatically.

**Scaling:** Convex handles the infrastructure — load balancing, connection pooling, WebSocket management. You don't configure replicas or shard keys. The tradeoff: less control, but also less ops burden. They enforce read limits per transaction to prevent runaway scans from killing your database.

**Indices:** Convex deliberately avoids a SQL-style query planner that guesses which index to use. Instead, you're explicit:

```typescript
// In schema.ts
users: defineTable({
  email: v.string(),
  createdAt: v.number(),
}).index("by_email", ["email"])

// In your query
const user = await ctx.db
  .query("users")
  .withIndex("by_email", (q) => q.eq("email", "test@example.com"))
  .unique();
```

The index is a sorted data structure. `.withIndex()` does binary search to jump directly to matching documents. No index = full table scan (which Convex limits to prevent disasters). Think of it like the card catalog in a library — you declare how to organize the cards, then queries can go straight to the right drawer.

### External World: HTTP Actions

Queries and mutations can't make network requests (that's what keeps them transactional). For external integrations, you use **actions**:

```typescript
export const sendNotification = action({
  handler: async (ctx, { userId }) => {
    const user = await ctx.runQuery(api.users.get, { userId });
    await fetch("https://api.twilio.com/...", { /* ... */ });
  },
});
```

For incoming webhooks, **HTTP actions** expose endpoints:

```typescript
export const stripeWebhook = httpAction(async (ctx, request) => {
  const body = await request.json();
  await ctx.runMutation(api.payments.record, { data: body });
  return new Response("ok");
});
```

Your endpoint lives at `https://your-app.convex.site/stripeWebhook`. Stripe calls it, you write to the database, reactivity propagates to all connected clients. No pub/sub to configure.

---

## Where Does This Sit?

The obvious question: how is this different from Supabase, Firebase, D1, and the dozen other database-as-backend options?

Supabase gives you Postgres + realtime subscriptions + auth + storage — closer to Convex's reactive model, but the reactivity is bolted on (publication/subscription) rather than native to the query model itself. Supabase is "make Postgres do everything." Convex is "rethink from first principles."

Cloudflare D1 is SQLite at the edge — familiar SQL, lightweight, fast for read-heavy workloads with replication to edge locations. It's a different bet entirely: edge-first vs. reactive-first.

Firebase pioneered the reactive document model. Convex feels like Firebase with proper relational capabilities, ACID transactions, and TypeScript-first design instead of SDK-based rules.

PlanetScale and Turso are distributed SQL databases — they optimize for scale and edge latency but remain in the "query/response" model. No native reactivity.

| Use case | Reach for |
|----------|-----------|
| Real-time collaborative app | Convex |
| Read-heavy, edge-first static-ish content | D1 |
| "I know Postgres and want everything" | Supabase |
| Massive scale, MySQL compatibility | PlanetScale |
| SQLite at edge, read replicas | Turso |
| Document-first, Firebase migration | Convex or Firestore |

---

## The Paradigm Shift

Here's what's actually different:

**Queries are subscriptions, not requests.** In traditional databases, you ask a question and get an answer. If the data changes, tough luck — ask again. Convex inverts this: you subscribe to a query, and the answer updates whenever relevant data changes. The database itself tracks dependencies and knows when to rerun.

**Your backend logic lives in the database layer.** Convex server functions run "in" the database. There's no network hop between your function and the data. The whole function is a transaction. Compare to: "write a Lambda, connect to RDS, manage connection pooling, wrap in transactions." Convex collapses that stack.

*Is this a feature or a bug?* It's the stored procedures debate all over again. **Feature:** co-location means performance, automatic transactions, simpler architecture. **Bug:** logic coupled to data model, can't scale compute separately from storage, testing is harder, vendor lock-in deepens. The answer depends on whether you value simplicity or separation of concerns more.

**Optimistic concurrency is built-in.** Conflicts are automatically retried. You write your function as if you're the only writer. The database handles contention.

---

## Back to the Automation System

The pattern I keep reaching for: **holographic events** — every state change carries enough context to understand and replay it without querying external systems. Convex's document model fits this naturally. Each mutation can include the full context of what happened and why, and reactive queries surface that to whatever needs to know.

Large payloads — screenshots, recordings, logs — still go in object storage. The document carries metadata and references, not the blob itself. Convex has built-in file storage for this.

The reactive model feels like the right primitive for the class of problems I'm working on: multi-agent coordination where state changes constantly and every component needs to know about the changes that affect it. Whether Convex specifically "wins" the database wars, I'm less sure about. But it's asking the right questions about what the abstraction between app and data should look like.

---

*Future rabbit hole: how does this compare to the analytics layer — BigQuery, Iceberg, Parquet, Redshift, Snowflake? OLTP vs OLAP is a different axis entirely. Maybe another post.*
