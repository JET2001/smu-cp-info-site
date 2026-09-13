#!/usr/bin/env bash
set -euo pipefail

pr_number="${1:?Usage: comment-preview.sh <pr-number>}"

if [[ ! "$pr_number" =~ ^[0-9]+$ ]]; then
  echo "PR number must be numeric" >&2
  exit 1
fi

repo="${GITHUB_REPOSITORY:?GITHUB_REPOSITORY is required}"
marker="<!-- cloudflare-pr-preview -->"
url="https://pr-${pr_number}-smu-cp-info-site.jrteo-2022.workers.dev"
body="${marker}
### Preview ready

[View preview](${url})"

comment_id="$(
  gh api --paginate \
    "repos/${repo}/issues/${pr_number}/comments" \
    --jq '.[] | select(.user.login == "github-actions[bot]" and (.body | contains("<!-- cloudflare-pr-preview -->"))) | .id' \
    | head -n 1
)"

if [[ -n "$comment_id" ]]; then
  gh api \
    --method PATCH \
    "repos/${repo}/issues/comments/${comment_id}" \
    -f body="$body" >/dev/null
else
  gh api \
    --method POST \
    "repos/${repo}/issues/${pr_number}/comments" \
    -f body="$body" >/dev/null
fi
