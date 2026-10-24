#!/usr/bin/env bash
# GraphQL variables stay literal inside single quotes.
# shellcheck disable=SC2016
# Reply to a review thread, then resolve it unless --no-resolve is given.
# Usage: reply-resolve.sh [--no-resolve] <thread-id> [--] [<body> | -]
#        reply-resolve.sh [--no-resolve] <thread-id> --body-file <file>
#        reply-resolve.sh --resolve-only <thread-id>
# With no body or '-', the body is read from stdin. Use -- before a body that starts with -.
set -euo pipefail

die() { printf 'reply-resolve: %s\n' "$*" >&2; exit 1; }
usage="usage: reply-resolve.sh [--no-resolve] <thread-id> [--] [<body> | - | --body-file <file>]
       reply-resolve.sh --resolve-only <thread-id>"

command -v gh >/dev/null 2>&1 || die "gh is not installed. See https://cli.github.com."
gh auth status >/dev/null 2>&1 || die "gh is not authenticated. Run 'gh auth login' or set GH_TOKEN."

resolve=1
resolve_only=0
thread=""
body=""
body_set=0
while [ $# -gt 0 ]; do
  case $1 in
    --) shift; break ;;
    --no-resolve) resolve=0 ;;
    --resolve-only) resolve_only=1 ;;
    --body-file)
      [ $# -ge 2 ] || die "--body-file needs a path. $usage"
      [ -r "$2" ] || die "cannot read body file '$2'."
      [ "$body_set" -eq 0 ] || die "body given twice. $usage"
      body=$(cat -- "$2"); body_set=1; shift ;;
    -h|--help) printf '%s\n' "$usage"; exit 0 ;;
    -) [ "$body_set" -eq 0 ] || die "body given twice. $usage"; body=$(cat); body_set=1 ;;
    -*) die "unknown option '$1'. $usage" ;;
    *)
      if [ -z "$thread" ]; then thread=$1
      elif [ "$body_set" -eq 0 ]; then body=$1; body_set=1
      else die "too many arguments. $usage"; fi ;;
  esac
  shift
done
# Args after -- are the reply body (so a leading - is not an option).
if [ $# -gt 0 ]; then
  [ "$body_set" -eq 0 ] || die "body given twice. $usage"
  body=$*; body_set=1
fi

[ -n "$thread" ] || die "missing thread id. $usage"
[[ $thread =~ ^PRRT_[A-Za-z0-9_-]+$ ]] || die "thread id must look like PRRT_…, got '$thread'. Use the id from list-threads.sh."
[ "$resolve_only" -eq 0 ] || [ "$resolve" -eq 1 ] || die "cannot combine --resolve-only with --no-resolve."
[ "$resolve_only" -eq 0 ] || [ "$body_set" -eq 0 ] || die "--resolve-only does not take a body."

err=$(mktemp)
trap 'rm -f "$err"' EXIT

resolve_thread() {
  local resolve_q state
  resolve_q='
mutation($thread: ID!) {
  resolveReviewThread(input: {threadId: $thread}) { thread { isResolved } }
}'
  if ! state=$(gh api graphql -f query="$resolve_q" -f thread="$thread" \
    --jq '.data.resolveReviewThread.thread.isResolved' 2>"$err"); then
    return 1
  fi
  [ "$state" = "true" ]
}

if [ "$resolve_only" -eq 1 ]; then
  if ! resolve_thread; then
    detail=$(cat "$err")
    [ -n "$detail" ] || detail="$thread is still unresolved"
    die "resolve failed for $thread: $detail"
  fi
  printf 'resolved: %s\n' "$thread"
  exit 0
fi

if [ "$body_set" -eq 0 ]; then
  [ -t 0 ] && die "missing body. $usage"
  body=$(cat)
fi
[[ $body =~ [^[:space:]] ]] || die "reply body is empty."

reply='
mutation($thread: ID!, $body: String!) {
  addPullRequestReviewThreadReply(input: {pullRequestReviewThreadId: $thread, body: $body}) {
    comment { url }
  }
}'
if ! url=$(gh api graphql -f query="$reply" -f thread="$thread" -f body="$body" \
  --jq '.data.addPullRequestReviewThreadReply.comment.url' 2>"$err"); then
  die "reply failed for $thread: $(cat "$err")"
fi
printf 'replied: %s\n' "$url"

[ "$resolve" -eq 1 ] || { printf 'left open: %s\n' "$thread"; exit 0; }

if ! resolve_thread; then
  detail=$(cat "$err")
  [ -n "$detail" ] || detail="$thread is still unresolved"
  die "reply posted, but resolve failed for $thread: $detail. Rerun with --resolve-only $thread so the reply is not posted twice."
fi
printf 'resolved: %s\n' "$thread"
