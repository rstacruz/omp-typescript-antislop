#!/usr/bin/env bash
# Install the TTSR rules into the omp user rules directory.
#
#   ./install.sh
#   PI_CODING_AGENT_DIR=/path/to/agent ./install.sh
#
# Prefer the plugin when you want versioned installs and enable/disable:
#   omp plugin marketplace add rstacruz/omp-typescript-antislop
#   omp plugin install typescript-antislop@omp-typescript-antislop
#
# The destination is $PI_CODING_AGENT_DIR/rules when set (default profile only),
# otherwise ~/.omp/agent/rules.
set -euo pipefail

here="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
src="$here/plugins/typescript-antislop/rules"
dest="${PI_CODING_AGENT_DIR:-$HOME/.omp/agent}/rules"

command -v omp >/dev/null 2>&1 || echo "warning: omp not found on PATH; copied anyway" >&2

mkdir -p "$dest"
cp -f "$src"/*.md "$dest"/

count=0
for file in "$src"/*.md; do
  count=$((count + 1))
  printf '  %s\n' "$(basename "$file")"
done

echo "Installed $count rules into $dest"
echo "Verify with: omp ttsr list"
