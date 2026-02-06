---
title: "Convex and the Reactive Database Paradigm"
description: "How Convex challenges our mental models of databases—not relational, not NoSQL, but something new."
date: 2026-02-06
type: note
schemaVersion: 1
tags:
  - architecture
  - engineering
heroImage: /images/posts/convex-reactive-database-hero.png
tension: "The old database categories don't fit anymore."
---

# Convex and the Reactive Database Paradigm

I recently discovered [Convex](https://convex.dev) and it's messing with my mental models.

We've spent decades sorting databases into buckets: relational vs. NoSQL, SQL vs. document, ACID vs. BASE, row vs. column. Convex doesn't fit cleanly into any of them.

---

## What Convex Actually Is

Convex calls itself a "document-relational" database. That's not marketing—it's a genuine hybrid:

- **Document**: You store JSON-like nested objects. No rigid schemas upfront.
- **Relational**: You have tables with relations. Tasks reference users via IDs. Joins are real.
- **Reactive**: Queries aren't one-shot. They're subscriptions. When underlying data changes, your query reruns automatically and pushes to clients.
- **Transactional**: Full ACID with serializable isolation. Your entire mutation function is a transaction—no `BEGIN`/`COMMIT` to manage.

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

Convex is schemaless by default—you can just start writing data. But add a `schema.ts` file and you get end-to-end type safety:

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

Here's what happens when you call `useQuery()` in React:

1. **Client opens WebSocket** — a persistent connection to Convex (not HTTP request/response)
2. **Client subscribes** to a query function over that connection
3. **Function runs** in the database, reading whatever tables it needs
4. **Convex tracks the "read set"** — every document the function touched
5. **Result streams back** over the WebSocket
6. **Mutation happens** somewhere (any client, any function)
7. **Convex checks**: did this mutation touch any document in any active query's read set?
8. **If yes**: rerun the query, push new result over the WebSocket to all subscribers

The WebSocket is just the transport—the persistent pipe that lets Convex push updates without clients polling. The magic is the read-set tracking: Convex knows *exactly* which queries care about which data, so it only reruns what's needed.

![Reactive data flow — one change propagates to all connected clients](/images/posts/convex-reactivity-diagram.png)

### Storage & Scaling

**Under the hood:** Convex Cloud runs on Amazon RDS with MySQL as the persistence layer. The open-source version supports SQLite, Postgres, or MySQL. Documents are JSON-like objects with system fields (`_id`, `_creationTime`) added automatically.

**Scaling:** Convex handles the infrastructure—load balancing, connection pooling, WebSocket management. You don't configure replicas or shard keys. The tradeoff: less control, but also less ops burden. They enforce read limits per transaction to prevent runaway scans from killing your database.

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

The index is a sorted data structure. `.withIndex()` does binary search to jump directly to matching documents. No index = full table scan (which Convex limits to prevent disasters). Think of it like the card catalog in a library—you declare how to organize the cards, then queries can go straight to the right drawer.

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

## Comparison: Where Does This Sit?

### Cloudflare D1

D1 is SQLite at the edge. It's familiar (SQL), lightweight, and fast for read-heavy workloads with replication to edge locations.

| Aspect | Convex | D1 |
|--------|--------|-----|
| Query language | TypeScript | SQL |
| Reactivity | Built-in subscriptions | Manual polling/websockets |
| Transactions | Automatic (whole function) | Manual SQL transactions |
| Edge distribution | No (region-based) | Yes (edge replicas) |
| Schema | Dynamic (document) | Fixed (SQL schema) |
| Best for | Real-time apps, live sync | Read-heavy, edge-first apps |

D1 is "SQLite but distributed." Convex is "what if the database was a reactive backend?"

### Supabase (Postgres)

Supabase gives you Postgres + realtime subscriptions + auth + storage. It's closer to Convex's "reactive" model but via a different architecture:

- Supabase: Postgres + realtime layer bolted on (publication/subscription)
- Convex: Reactivity is native to the query model itself

Supabase is "make Postgres do everything." Convex is "rethink from first principles."

### Firebase / Firestore

Firebase pioneered the reactive document model. Convex feels like Firebase with:
- Proper relational capabilities (not just document nesting)
- ACID transactions (Firestore's transactions are more limited)
- TypeScript-first (vs. SDK-based rules)

Firebase showed the model works. Convex adds the relational semantics back in.

### PlanetScale / Turso

These are distributed SQL databases (MySQL-compatible and SQLite-based respectively). They optimize for scale and edge latency but remain firmly in the "query/response" model. No native reactivity.

---

## The Paradigm Shift

Here's what's actually different about Convex:

**1. Queries are subscriptions, not requests.**

In traditional databases, you ask a question and get an answer. If the data changes, tough luck—ask again. Convex inverts this: you subscribe to a query, and the answer updates whenever relevant data changes.

This isn't just "add websockets." The database itself tracks query dependencies and knows when to rerun.

**2. Your backend logic lives in the database layer.**

Convex server functions run "in" the database. There's no network hop between your function and the data. The whole function is a transaction.

Compare to: "write a Lambda, connect to RDS, manage connection pooling, wrap in transactions." Convex collapses that stack.

*Is this a feature or a bug?* It's the stored procedures debate all over again. **Feature:** co-location means performance, automatic transactions, simpler architecture. **Bug:** logic coupled to data model, can't scale compute separately from storage, testing is harder, vendor lock-in deepens. The answer depends on whether you value simplicity or separation of concerns more.

**3. Optimistic concurrency is built-in.**

Conflicts are automatically retried. You write your function as if you're the only writer. The database handles contention.

---

## What This Unlocks

**Real-time collaboration** — Multiple users editing the same data? Convex handles sync automatically. No custom conflict resolution, no CRDTs, no operational transforms.

**Live dashboards** — Subscribe to aggregate queries. They update as data flows in. No polling.

**AI-native backends** — Convex explicitly markets to LLM-based development. TypeScript functions are easier for models to generate than SQL + ORM + migrations. And the open source version means you can run it locally.

**Simpler architecture** — No separate API layer, no connection pooling, no transaction management, no pub/sub infrastructure. The database *is* your backend.

---

## The Tradeoffs

**Not edge-native.** Convex runs in specific regions, not at every edge pop like D1. For read-heavy, globally distributed apps, this matters.

**Vendor coupling.** The TypeScript-in-database model means you're not writing portable SQL. Migrating away means rewriting your backend.

**Learning curve.** If your mental model is "database = SQL tables + queries," Convex requires rewiring. The reactive model is genuinely different.

**Scale questions.** It's newer than Postgres or MySQL. The "runs on RDS under the hood" is reassuring, but battle scars matter.

---

## When to Use What

| Use case | Reach for |
|----------|-----------|
| Real-time collaborative app | Convex |
| Read-heavy, edge-first static-ish content | D1 |
| "I know Postgres and want everything" | Supabase |
| Massive scale, MySQL compatibility | PlanetScale |
| SQLite at edge, read replicas | Turso |
| Document-first, Firebase migration | Convex or Firestore |

---

## The Bigger Picture

The relational vs. NoSQL debate was 2010s thinking. The new question is: **what's the right abstraction between your app and your data?**

- SQL is powerful but leaks implementation details into your app code
- ORMs try to hide SQL but add their own complexity
- Document stores simplify writes but complicate relations
- Convex asks: what if your queries were just functions?

I don't know if Convex "wins." But it's asking the right questions.

---

## From the Trenches

I've been building a browser automation system that coordinates multiple AI sessions against different platforms. The state management problem is brutal: session state, selector validity, authentication tokens, rate limits—all changing asynchronously while agents work in parallel.

Traditional approach: poll for changes, maintain local state, reconcile conflicts. It's fragile. Stale reads cause retries, retries cause rate limits, rate limits cause cascading failures.

What I actually want: every component subscribes to the state it cares about and reacts when it changes. Agent starts working? UI updates. Selector breaks? Repair pipeline triggers. Token expires? Re-auth flow kicks off. No polling, no reconciliation, no "did I miss an update?"

This is exactly what Convex's model enables. The read-set tracking means you don't declare subscriptions manually—your code implicitly subscribes to whatever it reads. Change propagation is automatic and precise.

The pattern I keep reaching for: **holographic events**—every state change carries enough context to understand and replay it without querying external systems. Convex's document model fits this naturally. Each mutation can include the full context of what happened and why, and reactive queries surface that to whatever needs to know.

(Large payloads—screenshots, recordings, logs—still go in object storage. The document carries metadata and references, not the blob itself. Convex has built-in file storage for this.)

Still working through the architecture. But the reactive database model feels like the right primitive for this class of problem.

---

*Still exploring this. These are notes, not conclusions.*

*Future rabbit hole: how does this compare to the analytics layer—BigQuery, Iceberg, Parquet, Redshift, Snowflake? OLTP vs OLAP is a different axis entirely. Maybe another post.*
