#!/usr/bin/env bash
# Ejecutar desde la raíz E2E. Suites secuenciales: comparten app_e2e.
set -uo pipefail
cd "$(dirname "$0")/.."
run_dir="results/$(date +%Y%m%d-%H%M%S)"
mkdir -p "$run_dir"
printf '%s\n' "$run_dir" > results/latest-run.txt
compose=(podman compose -p income-e2e -f cypress/compose.yaml)
if ! podman ps -a --filter name=income-e2e > "$run_dir/containers.log" 2>&1; then
  cat "$run_dir/containers.log"
  exit 1
fi
"${compose[@]}" exec -T runner bash -ic 'npm run e2e:types' 2>&1 | tee "$run_dir/types.log"
if [ "${PIPESTATUS[0]}" -ne 0 ]; then exit 1; fi
failed=0
for hu in 9 10 11 12 13 14 15; do
  "${compose[@]}" exec -T -e "E2E_RESULTS_FILE=$run_dir/HU-$hu.json" runner bash -ic "npx cypress run --spec 'cypress/e2e/HU-$hu/*.cy.ts' --config screenshotsFolder=$run_dir/screenshots/HU-$hu" 2>&1 | tee "$run_dir/HU-$hu.log"
  status=${PIPESTATUS[0]}
  printf '%s\n' "$status" > "$run_dir/HU-$hu.exit"
  if [ "$status" -ne 0 ]; then failed=1; fi
done
printf 'Resultados: %s\n' "$run_dir"
exit "$failed"
