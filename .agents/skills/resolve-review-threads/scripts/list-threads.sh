#!/usr/bin/env bash
# GraphQL and jq variables stay literal inside single quotes.
# shellcheck disable=SC2016
# Print the unresolved, non-outdated review threads of a pull request.
# Usage: list-threads.sh <pr-number> [owner/repo]
set -euo pipefail

die() { printf 'list-threads: %s\n' "$*" >&2; exit 1; }

command -v gh >/dev/null 2>&1 || die "gh is not installed. See https://cli.github.com."
gh auth status >/dev/null 2>&1 || die "gh is not authenticated. Run 'gh auth login' or set GH_TOKEN."

if [ $# -lt 1 ] || [ $# -gt 2 ]; then die "usage: list-threads.sh <pr-number> [owner/repo]"; fi
pr=$1
[[ $pr =~ ^[0-9]+$ ]] || die "PR number must be a positive integer, got '$pr'."

if [ $# -eq 2 ]; then
  repo=$2
else
  repo=$(gh repo view --json nameWithOwner --jq .nameWithOwner 2>/dev/null) \
    || die "cannot detect the current repo. Pass owner/repo."
fi
[[ $repo =~ ^[^/[:space:]]+/[^/[:space:]]+$ ]] || die "repo must be owner/repo, got '$repo'."

# The first and the last comment are enough, so two aliased one-node windows
# replace comment pagination. Only reviewThreads is paginated (--paginate).
query='
query($owner: String!, $name: String!, $number: Int!, $endCursor: String) {
  repository(owner: $owner, name: $name) {
    pullRequest(number: $number) {
      reviewThreads(first: 100, after: $endCursor) {
        pageInfo { hasNextPage endCursor }
        nodes {
          id
          isResolved
          isOutdated
          path
          line
          originalLine
          opener: comments(first: 1) { totalCount nodes { author { login } bodyText } }
          latest: comments(last: 1) { nodes { author { login } bodyText } }
        }
      }
    }
  }
}'

filter='
def clip($n): gsub("\\s+"; " ") | ltrimstr(" ") | if length > $n then .[0:$n] + "…" else . end;
def who: (.author.login // "ghost");
.data.repository.pullRequest.reviewThreads.nodes[]
| select((.isResolved | not) and (.isOutdated | not))
| .opener.nodes[0] as $first
| .latest.nodes[0] as $last
| "\(.id)  \(.path)\(.line // .originalLine | if . then ":\(.)" else " (file)" end)  @\($first | who)  comments: \(.opener.totalCount)\n"
  + "  \($first.bodyText | clip(400))\n"
  + (if .opener.totalCount > 1 then "  latest @\($last | who): \($last.bodyText | clip(200))\n" else "" end)'

err=$(mktemp)
trap 'rm -f "$err"' EXIT
if ! out=$(gh api graphql --paginate \
  -f query="$query" -f owner="${repo%/*}" -f name="${repo#*/}" -F number="$pr" \
  --jq "$filter" 2>"$err"); then
  die "GraphQL request failed for $repo#$pr: $(cat "$err")"
fi

if [ -z "$out" ]; then
  printf 'No unresolved, current threads on %s#%s.\n' "$repo" "$pr" >&2
else
  printf '%s\n' "$out"
fi
