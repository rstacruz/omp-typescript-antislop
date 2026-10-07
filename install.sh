#!/usr/bin/env bash
# Install the TTSR rules into the omp user rules directory.
#
#   ./install.sh
#   PI_CODING_AGENT_DIR=/path/to/agent ./install.sh
#
# The destination is $PI_CODING_AGENT_DIR/rules when set (default profile only),
# otherwise ~/.omp/agent/rules.
set -euo pipefail

here="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
dest="${PI_CODING_AGENT_DIR:-$HOME/.omp/agent}/rules"

command -v omp >/dev/null 2>&1 || echo "warning: omp not found on PATH; copied anyway" >&2

mkdir -p "$dest"
cp -f "$here"/rules/*.md "$dest"/

count=0
for file in "$here"/rules/*.md; do
  count=$((count + 1))
  printf '  %s\n' "$(basename "$file")"
done

echo "Installed $count rules into $dest"
echo "Verify with: omp ttsr list"
