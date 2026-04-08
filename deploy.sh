#!/usr/bin/env sh

set -e

PROJECT_SPECS='
projects/react/synthesizer|build|projects/synthesizer
projects/react/breathing_bubble|build|projects/breathing-bubble
projects/react/calculator|build|projects/calculator
projects/react/metronome|build|projects/metronome
projects/react/weather|build|projects/weather
projects/vue/todo|dist|projects/todo
'

npm run build

printf '%s\n' "$PROJECT_SPECS" | while IFS='|' read -r project_dir build_dir deploy_path; do
  [ -n "$project_dir" ] || continue
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

mkdir -p "$DEPLOY_DIR/projects"

printf '%s\n' "$PROJECT_SPECS" | while IFS='|' read -r project_dir build_dir deploy_path; do
  [ -n "$project_dir" ] || continue
  [ -d "$project_dir/$build_dir" ] || continue

  mkdir -p "$DEPLOY_DIR/$deploy_path"
  cp -R "$project_dir/$build_dir"/. "$DEPLOY_DIR/$deploy_path"
done

: > "$DEPLOY_DIR/.nojekyll"
echo 'guseynov.github.io' > "$DEPLOY_DIR/CNAME"

cd "$DEPLOY_DIR"
git init
git checkout -B main
git add -A
git commit -m 'deploy'
git push -f git@github.com:guseynov/guseynov.github.io.git main
