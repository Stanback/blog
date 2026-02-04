# bristanback.com

A bespoke static blog built with Bun, TypeScript, and Tailwind. No frameworks, no client-side JavaScript.

## Setup

```bash
bun install
```

## Development

```bash
bun run dev
```

Watches for changes and rebuilds automatically.

## Build

```bash
bun run build
```

Outputs to `dist/`.

## Other Commands

```bash
bun run typecheck    # Type check
bun run lint         # Lint with Biome
bun run lint:fix     # Lint and fix
bun test             # Run tests
bun run serve        # Build and serve locally
```

## Deployment

Push to `main` to deploy to Cloudflare Pages via GitHub Actions.

Requires these GitHub secrets:
- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`
