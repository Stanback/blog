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

*Still exploring this. These are notes, not conclusions.*
