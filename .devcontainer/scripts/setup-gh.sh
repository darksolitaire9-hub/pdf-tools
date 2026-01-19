#!/usr/bin/env bash
set -euxo pipefail

echo "==> Installing GitHub CLI..."

sudo apt-get update
sudo apt-get install -y gh

echo "==> Verifying GitHub CLI installation..."
gh --version

echo "==> Checking GitHub CLI authentication..."

# Check if gh is authenticated
if gh auth status &>/dev/null; then
    echo "==> GitHub CLI is already authenticated ✓"
else
    echo "==> GitHub CLI is not authenticated"
    echo "==> Running authentication..."
    gh auth login
fi

echo "==> GitHub CLI setup complete."
