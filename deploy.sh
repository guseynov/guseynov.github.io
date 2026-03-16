#!/usr/bin/env sh

# abort on errors
set -e

# build
npm run build

# create an isolated deploy workspace so dist stays a plain build folder
DEPLOY_DIR="$(mktemp -d)"

cleanup() {
  rm -rf "$DEPLOY_DIR"
}

trap cleanup EXIT

# copy the build output into the deploy workspace
cp -R dist/. "$DEPLOY_DIR"

# copy public files so root-level static assets are always deployed
if [ -d public ]; then
  cp -R public/. "$DEPLOY_DIR"
fi

# copy the "projects" folder
if [ -d projects ]; then
  cp -R projects "$DEPLOY_DIR/projects"
fi

# place .nojekyll to bypass Jekyll processing
: > "$DEPLOY_DIR/.nojekyll"

# if you are deploying to a custom domain
echo 'guseynov.github.io' > "$DEPLOY_DIR/CNAME"

cd "$DEPLOY_DIR"

git init
git checkout -B main
git add -A
git commit -m 'deploy'

# if you are deploying to https://<USERNAME>.github.io
git push -f git@github.com:guseynov/guseynov.github.io.git main

# if you are deploying to https://<USERNAME>.github.io/<REPO>
# git push -f git@github.com:<USERNAME>/<REPO>.git main:gh-pages
