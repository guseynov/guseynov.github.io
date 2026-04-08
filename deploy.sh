#!/usr/bin/env sh

set -e

npm run build

find projects -path '*/package.json' -not -path '*/node_modules/*' | while read -r package_file; do
  project_dir=$(dirname "$package_file")
  (
    cd "$project_dir"
    npm run build
  )
done

DEPLOY_DIR="$(mktemp -d)"

cleanup() {
  rm -rf "$DEPLOY_DIR"
}

trap cleanup EXIT

cp -R dist/. "$DEPLOY_DIR"

if [ -d public ]; then
  cp -R public/. "$DEPLOY_DIR"
fi

if [ -d projects ]; then
  tar --exclude='node_modules' --exclude='.git' -cf - projects | tar -xf - -C "$DEPLOY_DIR"
fi

: > "$DEPLOY_DIR/.nojekyll"
echo 'guseynov.github.io' > "$DEPLOY_DIR/CNAME"

cd "$DEPLOY_DIR"
git init
git checkout -B main
git add -A
git commit -m 'deploy'

git push -f git@github.com:guseynov/guseynov.github.io.git main
