#!/usr/bin/env sh

set -e

npm run build

for project_dir in projects/react/* projects/vue/*; do
  [ -f "$project_dir/package.json" ] || continue
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
  tar --exclude='node_modules' --exclude='bower_components' --exclude='.git' -cf - projects | tar -xf - -C "$DEPLOY_DIR"
fi

: > "$DEPLOY_DIR/.nojekyll"
echo 'guseynov.github.io' > "$DEPLOY_DIR/CNAME"

cd "$DEPLOY_DIR"
git init
git checkout -B main
git add -A
git commit -m 'deploy'
git push -f git@github.com:guseynov/guseynov.github.io.git main
