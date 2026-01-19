#!/usr/bin/env bash
set -euxo pipefail

echo "==> Initializing SvelteKit project (headless)..."

if [ -f "package.json" ] && grep -q "@sveltejs/kit" package.json; then
    echo "SvelteKit already initialized, skipping."
    exit 0
fi

pnpm dlx sv@0.11.2 create \
  --template minimal \
  --types ts \
  --add prettier eslint vitest="usages:unit,component" playwright tailwindcss="plugins:typography,forms" sveltekit-adapter="adapter:auto" devtools-json \
  --install pnpm \
  --no-dir-check \
  ./

echo "==> SvelteKit setup complete."
