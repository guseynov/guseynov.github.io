#!/usr/bin/env sh

set -eu

# GitHub Pages is served from the generated `main` branch. The application
# source remains on `master`.
DEPLOY_REMOTE="${DEPLOY_REMOTE:-origin}"
DEPLOY_BRANCH="${DEPLOY_BRANCH:-main}"
DEPLOY_CNAME="${DEPLOY_CNAME-alex23.com}"
DEPLOY_REMOTE_URL="${DEPLOY_REMOTE_URL:-}"

SCRIPT_DIR=$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)
cd "$SCRIPT_DIR"

command -v git >/dev/null 2>&1 || {
  echo "Error: git is required." >&2
  exit 1
}

command -v npm >/dev/null 2>&1 || {
  echo "Error: npm is required." >&2
  exit 1
}

git rev-parse --is-inside-work-tree >/dev/null 2>&1 || {
  echo "Error: deploy.sh must be run from a Git repository." >&2
  exit 1
}

if [ -n "$DEPLOY_REMOTE_URL" ]; then
  REMOTE_URL=$DEPLOY_REMOTE_URL
  REMOTE_LABEL="configured remote"
else
  REMOTE_URL=$(git remote get-url "$DEPLOY_REMOTE")
  REMOTE_LABEL=$DEPLOY_REMOTE
fi

SOURCE_REV=$(git rev-parse --short HEAD)
SOURCE_AUTHOR_NAME=$(git log -1 --format=%an)
SOURCE_AUTHOR_EMAIL=$(git log -1 --format=%ae)

echo "Building site from $SOURCE_REV..."
npm run build

if [ ! -f dist/index.html ]; then
  echo "Error: build completed without producing dist/index.html." >&2
  exit 1
fi

DEPLOY_DIR=$(mktemp -d)

cleanup() {
  rm -rf "$DEPLOY_DIR"
}

trap cleanup EXIT HUP INT TERM

cp -R dist/. "$DEPLOY_DIR/"
: > "$DEPLOY_DIR/.nojekyll"

if [ -n "$DEPLOY_CNAME" ]; then
  printf '%s\n' "$DEPLOY_CNAME" > "$DEPLOY_DIR/CNAME"
fi

# Record the current remote tip so --force-with-lease refuses to overwrite a
# deployment that changed while this script was running.
REMOTE_REV=$(git ls-remote "$REMOTE_URL" "refs/heads/$DEPLOY_BRANCH" | awk 'NR == 1 { print $1 }')

cd "$DEPLOY_DIR"
git init --quiet
git checkout --quiet -b "$DEPLOY_BRANCH"
git add --all
git \
  -c user.name="$SOURCE_AUTHOR_NAME" \
  -c user.email="$SOURCE_AUTHOR_EMAIL" \
  commit --quiet -m "Deploy $SOURCE_REV"

echo "Publishing to $REMOTE_LABEL/$DEPLOY_BRANCH..."
git push \
  --force-with-lease="refs/heads/$DEPLOY_BRANCH:$REMOTE_REV" \
  "$REMOTE_URL" \
  "HEAD:refs/heads/$DEPLOY_BRANCH"

echo "Deployment complete."
