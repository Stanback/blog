---
name: blog
description: Create and manage content on bristanback.com (posts, notes, photos). Load axioms/voice.md before writing. Use when user asks to write blog content, generate hero images, or publish.
---

# Blog Skills (bristanback.com)

> Skills for creating and managing content on Bri's blog.

## Before Writing

**Load these before creating/editing content:**

1. **Always**: `axioms/voice.md` — voice axioms (owner mode, human cost signals)
2. **For design/CSS**: `axioms/design-system.md` + `axioms/accessibility.md`
3. **For structure changes**: `axioms/architecture.md`
4. **Full context**: `CLAUDE.md` (links to all axioms)

The voice axiom is non-negotiable for content work. Owner mode = axiom, not suggestion.

---

## Content Types

### Posts (Writing)
- **Purpose**: Published, dated pieces — committed thinking
- **Location**: `content/posts/YYYY-MM-DD-slug.md`
- **Characteristics**: Frozen once published, have hero images

### Notes
- **Purpose**: Living documents — public exploration, undated
- **Location**: `content/notes/slug.md` (no date in filename)
- **Characteristics**: Can be updated, usually no hero images

### Drafts
- **Purpose**: Private/vulnerable work in progress
- **Naming**: Add `-draft` suffix: `content/posts/2026-02-04-vulnerability-draft.md`
- **Frontmatter**: `draft: true`

---

## Creating a New Post

### 1. Create the file

```bash
# Pattern: content/posts/YYYY-MM-DD-slug.md
touch content/posts/$(date +%Y-%m-%d)-my-post-slug.md
```

### 2. Frontmatter template

```yaml
---
title: "Your Title Here"
description: "One sentence that captures the core idea"
date: 2026-02-05
type: post
schemaVersion: 1
draft: false
tags:
  - tag-one
  - tag-two
heroImage: /images/posts/slug-hero.png
tension: "Optional — the core tension or provocation"
questions:
  - "Optional question the post explores"
  - "Another question"
coAuthors:
  - name: "Lunen"
    emoji: "🌙"
featured: false  # Set true for Start Here / homepage featuring
---
```

### 3. Valid Tags

**Domain tags**: `ai`, `architecture`, `design`, `epistemology`, `identity`, `systems`, `judgment`, `interfaces`, `mental-models`

**Format tags**: `framework`, `thesis`, `reflection`, `tutorial`

### 4. Writing Style

- **Voice**: Sharp, observational, warm — not corporate
- **Density**: Density is a feature, not a bug
- **Structure**: Clear headings, short paragraphs, breathing room
- **Wikilinks**: Use `[[Note Title]]` or `[[Note Title|display text]]` to link to notes

### 5. Generate Hero Image

```bash
cd /Users/bri/clawd/repos/blog

# Preview the prompt (no generation)
bun scripts/generate-image-prompt.ts content/posts/2026-02-05-my-post.md

# Refine prompt with Gemini (shows what would be generated)
GEMINI_API_KEY=xxx bun scripts/generate-image-prompt.ts content/posts/2026-02-05-my-post.md --refine

# Generate the image
GEMINI_API_KEY=xxx bun scripts/generate-image-prompt.ts content/posts/2026-02-05-my-post.md --generate
```

**Image requirements**:
- 1200x630 px hero
- No text in image
- Warm, editorial aesthetic (Parisian photo book vibe)
- Metaphorical, not literal
- Output: `static/images/posts/slug-hero.png`

### 6. Build & Deploy

```bash
bun run build  # Verify it compiles
git add -A && git commit -m "feat: add post — Title Here"
git push  # Auto-deploys via GitHub Actions (~30s)
```

---

## Creating a New Note

### 1. Create the file

```bash
# Pattern: content/notes/slug.md (NO date prefix)
touch content/notes/my-note-slug.md
```

### 2. Frontmatter template

```yaml
---
title: "Note Title"
date: 2026-02-05  # Creation date (for sorting)
type: note
schemaVersion: 1
draft: false
description: "Brief description of what this note explores"
tags:
  - relevant-tag
updated: 2026-02-05  # Optional — add when you update it
---
```

### 3. Notes vs Posts

| Aspect | Note | Post |
|--------|------|------|
| Dated in URL | No | Yes |
| Can be updated | Yes (add `updated:`) | No (frozen) |
| Hero image | Usually no | Yes |
| Commitment level | Exploration | Published stance |

---

## Updating Content

### Updating a Note

1. Edit the content
2. Add/update the `updated:` field in frontmatter
3. Commit with message: `docs: update note — Title`

### Updating a Post

Posts are **frozen** — don't change the core content after publishing.

**Allowed changes**:
- Typo fixes
- Broken link fixes
- Adding `updated:` with a note about what changed

**Not allowed**:
- Changing the argument
- Major rewrites

If the thinking has evolved, write a new post and link back.

---

## Frontmatter Reference

### Required (all content)
- `title`: String
- `date`: YYYY-MM-DD
- `type`: `post` | `note` | `page`
- `schemaVersion`: `1`
- `draft`: `true` | `false`

### Optional
- `description`: One-sentence summary
- `tags`: Array of valid tags
- `heroImage`: Path like `/images/posts/slug-hero.png`
- `tension`: Core tension/provocation (posts)
- `questions`: Array of questions explored (posts)
- `coAuthors`: Array of `{name, emoji}` objects
- `featured`: Boolean — for homepage featuring
- `updated`: YYYY-MM-DD — when content was last updated
- `preface`: 1-2 sentence orientation (renders in italics before content)

---

## Image Generation Details

The `scripts/generate-image-prompt.ts` script:

1. **Parses** the post frontmatter and body
2. **Extracts** themes from tags and H2 headings
3. **Infers** tone from content
4. **Generates** a meta-prompt using `prompts/image-generation.md` template
5. **Refines** via Gemini Flash into a direct image prompt
6. **Generates** image via `gemini-2.0-flash-exp-image-generation`

**Brand aesthetic** (from template):
- Warm paper (#f5f3ef), deep ink (#2d2a26)
- Dusty rose accent (#b8968a) — sparingly
- Editorial, observational, like a well-made notebook
- Photographic or painterly, not 3D or flat illustration
- No text in images, no stock clichés

**API Key**: Set `GEMINI_API_KEY` env var (check `~/.config/shell/secrets.zsh`)

---

## Infographic Generation (2x2 Diagrams)

The `scripts/generate-infographic.ts` script creates AI-rendered infographics:

```bash
# Use a preset
source ~/.config/shell/secrets.zsh
bun scripts/generate-infographic.ts --preset multi-agent

# Custom infographic
bun scripts/generate-infographic.ts \
  --title "My Diagram" \
  --x-axis "Left Label,Right Label" \
  --y-axis "Bottom Label,Top Label" \
  --items "Item 1:0.2:0.8,Item 2:0.7:0.3" \
  --output static/images/posts/diagram.png
```

**Available presets**: `multi-agent`

**Output**: PNG to specified path (default: `static/images/posts/`)

**Known limitation**: AI image generation struggles with precise text placement in diagrams. For accurate quadrant positioning, may need a hybrid approach:
- AI generates the background style/texture
- Programmatic overlay adds accurate text labels

---

## Embedding Image Prompts

Use HTML comments to store original prompts for reproducibility:

```markdown
<!-- IMAGE_PROMPT: Vintage technical illustration of interconnected gears... -->
![Multi-agent landscape](/images/posts/multi-agent-hero.png)
```

Comments are automatically stripped at build time:
- Won't appear in rendered output
- Don't affect word count or reading time
- Great for documenting the creative process

---

## Promoting Notes to Posts

When a note graduates to a post:

### 1. Move the file
```bash
mv content/notes/slug.md content/posts/$(date +%Y-%m-%d)-slug.md
```

### 2. Update frontmatter
```yaml
type: post      # was: note
date: 2026-02-06  # update to publish date
```

### 3. Add redirect (preserve SEO)
Add to `public/_redirects`:
```
/notes/slug  /posts/YYYY/MM/DD/slug  301
```

### 4. Commit both changes together
```bash
git add -A && git commit -m "promote: Title from note to post"
```

**Why redirects matter:** Even for young content, building the habit prevents future headaches when a popular note gets promoted after accumulating backlinks.

---

## Quick Commands

```bash
# Build locally
bun run build

# Dev server (if available)
bun run dev

# Generate image for a post
GEMINI_API_KEY=$GEMINI_API_KEY bun scripts/generate-image-prompt.ts content/posts/FILE.md --generate

# Check what would be generated
bun scripts/generate-image-prompt.ts content/posts/FILE.md --refine
```

---

## File Locations

- **Posts**: `content/posts/`
- **Notes**: `content/notes/`
- **Pages**: `content/pages/`
- **Images**: `static/images/posts/`
- **Styles**: `styles/main.css`
- **Build**: `src/build.ts`, `src/render.ts`
- **Prompts**: `prompts/image-generation.md`
