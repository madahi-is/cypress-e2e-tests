#!/usr/bin/env bash
set -euo pipefail
# Ejecutar únicamente en el servicio runner de income-e2e (volumen separado).
if [[ "${E2E_DB_DATABASE:-}" != app_e2e || "${DB_DATABASE:-}" != app_e2e ]]; then
  echo 'Se requiere el entorno exclusivo app_e2e.' >&2
  exit 1
fi
mkdir -p /var/www/storage/app/public /var/www/storage/framework/cache/data \
  /var/www/storage/framework/sessions /var/www/storage/framework/views /var/www/storage/logs
chown -R "$(id -u www):$(id -g www)" /var/www/storage
