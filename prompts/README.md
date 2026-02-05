# Image Prompts

Generated prompts for blog post hero images.

## Usage

```bash
# Generate prompt for a single post (outputs to stdout)
bun scripts/generate-image-prompt.ts content/posts/2026-02-04-proof-not-truth.md

# Generate prompt and save to file
bun scripts/generate-image-prompt.ts content/posts/proof-not-truth.md > prompts/posts/proof-not-truth.md

# Generate image directly via Gemini Imagen API
GEMINI_API_KEY=xxx bun scripts/generate-image-prompt.ts content/posts/proof-not-truth.md --generate
```

## Image Storage Convention

```
static/images/posts/
├── {slug}-hero.jpg       # Hero image (1200x630, OG-friendly)
├── {slug}-hero@2x.jpg    # Retina version (optional)
└── {slug}/               # Additional images for post (if needed)
    ├── inline-1.jpg
    └── inline-2.jpg

static/images/photos/
├── {slug}.jpg            # Main photo for photo posts
└── {slug}-thumb.jpg      # Thumbnail (auto-generated, optional)
```

## Hero Image Specs

- **Dimensions**: 1200×630px (OG image standard)
- **Aspect ratio**: ~1.91:1
- **Format**: JPG (photos) or PNG (graphics)
- **Max file size**: 200KB target

## Linking in Posts

```yaml
# In post frontmatter
heroImage: /images/posts/proof-not-truth-hero.jpg
```

The hero image will be used for:
- OG meta tags (social sharing)
- Article header (if template supports it)
- RSS feed enclosure

## Brand Guidelines

See `prompts/image-generation.md` for the full brand aesthetic template.

**TL;DR:**
- Warm, editorial, observational
- No text in images
- Dusty rose accent sparingly
- Photographic or painterly (not 3D, not flat illustration)
