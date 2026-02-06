# Agent Legibility Kernel (Blog Adaptation)

> Code structure optimized for AI reasoning in the blog codebase.

**Adapted from:** AIOS Agent Legibility Kernel
**Domain:** Static site build scripts (TypeScript)

---

## Core Principle

Code is serialized context for transformer models. Optimize for LLM interpretability, not human cleverness.

---

## Axiom: Locality Over Abstraction

**Rule:** Keep related logic colocated. Don't fragment across files unless used ≥5 times.

**Why:** Every file jump = compounding error probability for AI reasoning.

**Blog Application:**

```typescript
// ✅ COLOCATED: renderPost contains all post rendering logic
function renderPost(post: Post): string {
  // STEP 1: Parse frontmatter
  const meta = parseFrontmatter(post.raw);
  
  // STEP 2: Convert markdown to HTML
  const html = markdownToHtml(meta.body);
  
  // STEP 3: Apply syntax highlighting
  const highlighted = highlightCode(html);
  
  // STEP 4: Wrap in template
  return wrapInLayout(highlighted, meta);
}

// ❌ FRAGMENTED: Logic spread across files
function renderPost(post: Post): string {
  return pipeline(post, [
    parseFrontmatter,    // → frontmatter.ts
    markdownToHtml,      // → markdown.ts
    highlightCode,       // → highlight.ts
    wrapInLayout         // → layout.ts
  ]);
}
```

---

## Axiom: Explicit Types Everywhere

**Rule:** All function signatures have explicit parameter and return types.

**Why:** LLMs pattern-match on visible tokens. Type inference creates hidden context.

**Blog Application:**

```typescript
// ✅ EXPLICIT
interface Post {
  title: string;
  date: Date;
  content: string;
  tags: string[];
}

function collectPosts(dir: string): Post[] {
  const files: string[] = readdirSync(dir);
  const posts: Post[] = [];
  
  for (const file of files) {
    const raw: string = readFileSync(join(dir, file), 'utf-8');
    const post: Post = parsePost(raw);
    posts.push(post);
  }
  
  return posts;
}

// ❌ IMPLICIT
function collectPosts(dir) {
  return readdirSync(dir).map(f => parsePost(readFileSync(join(dir, f), 'utf-8')));
}
```

---

## Axiom: Verbose Control Flow

**Rule:** Make every step explicit. Avoid pipe/compose utilities.

**Why:** Terse code hides control flow in operators. LLMs need visible tokens.

**Blog Application:**

```typescript
// ✅ VERBOSE (AI sees every step)
function buildSite(): void {
  console.log('Starting build...');
  
  // STEP 1: Collect content
  const posts: Post[] = collectPosts('content/posts');
  const notes: Note[] = collectNotes('content/notes');
  
  // STEP 2: Validate content
  const validPosts: Post[] = posts.filter(p => !p.draft);
  const validNotes: Note[] = notes.filter(n => !n.draft);
  
  // STEP 3: Render pages
  for (const post of validPosts) {
    const html: string = renderPost(post);
    writeFileSync(`dist/posts/${post.slug}/index.html`, html);
  }
  
  // STEP 4: Generate index pages
  const postsIndex: string = renderPostsIndex(validPosts);
  writeFileSync('dist/writing/index.html', postsIndex);
  
  console.log(`Built ${validPosts.length} posts, ${validNotes.length} notes`);
}

// ❌ TERSE (hidden flow)
const build = () =>
  [collectPosts, collectNotes]
    .flatMap(fn => fn())
    .filter(x => !x.draft)
    .forEach(x => writeSync(render(x)));
```

---

## Axiom: Semantic Function Names

**Rule:** Function names start with verbs that indicate behavior.

**Naming Convention:**

| Prefix | Meaning | Purity |
|--------|---------|--------|
| `calculate*` | Pure computation | Pure |
| `render*` | Generate HTML string | Pure |
| `collect*` | Read from filesystem | Impure |
| `write*` | Write to filesystem | Impure |
| `parse*` | Transform string → object | Pure |
| `validate*` | Check and return boolean/Result | Pure |

**Blog Application:**

```typescript
// ✅ SEMANTIC (name predicts behavior)
function collectPosts(dir: string): Post[] { ... }
function parsePost(raw: string): Post { ... }
function validateFrontmatter(fm: unknown): Result<Frontmatter> { ... }
function renderPost(post: Post): string { ... }
function writeOutput(path: string, content: string): void { ... }

// ❌ VAGUE (what does it do?)
function posts(dir: string): Post[] { ... }
function post(raw: string): Post { ... }
function check(fm: unknown): boolean { ... }
```

---

## Axiom: Comments as AI Prompts

**Rule:** Use structured comments that help LLMs understand intent.

**Comment Patterns:**

```typescript
// WHY: Explains the reason for a decision
// INVARIANT: States something that must always be true
// EDGE_CASE: Highlights unusual conditions
// STEP N: Marks sequential operations
// TODO: Work remaining
```

**Blog Application:**

```typescript
function renderPost(post: Post): string {
  // STEP 1: Generate hero section
  // WHY: Hero images are optional, only render if present
  const hero: string = post.heroImage 
    ? renderHero(post.heroImage, post.title)
    : '';
  
  // STEP 2: Convert markdown to HTML
  // INVARIANT: All wikilinks must be resolved before rendering
  const body: string = markdownToHtml(post.content);
  
  // STEP 3: Wrap in article template
  // EDGE_CASE: Co-authored posts need byline treatment
  const article: string = wrapArticle(body, post.coAuthors);
  
  return hero + article;
}
```

---

## Quick Checklist

Before committing code, verify:

- [ ] All function signatures have explicit types?
- [ ] No `any` types?
- [ ] Function names start with verbs?
- [ ] Control flow is visible (no pipe/compose)?
- [ ] Related logic is colocated?
- [ ] Comments explain WHY, not WHAT?
