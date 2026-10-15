# HU-10 · resultados, cobertura y pendientes

Fecha: 2026-10-10. Destino único de ejecución: income-e2e / app_e2e / puerto 8082.

## Verificado en esta sesión

- **TypeScript pasó** para configuración, helpers y todas las suites (HU-10,
  HU-9 y HU-15), sin errores. Runtime Node de VS Code, dependencias existentes
  del proyecto independiente; no se instalaron dependencias en Laravel.
- Inventario de **31 casos** con nombres únicos en cinco specs, sin ejecutar
  callbacks de tests. [Inventario estático](HU-10-inventario.json).
- SHA-256: 169 archivos comprobados de Laravel y de las suites/helpers anteriores
  permanecen iguales, incluidos todos los specs HU-9/HU-15, helpers HU-9,
  commands.ts y Compose. El cambio original de package-lock.json sigue presente.
- La selección real de reset del soporte se comprobó para HU-10/HU-9/HU-15 y
  separadores Windows: reset-hu10 / reset-hu9 / reset, respectivamente.
- Compose conserva nombre income-e2e, base app_e2e, puerto 8082 y montaje Laravel
  de solo lectura; paquete/lock consistentes y script histórico e2e:run intacto.
- Inicializador de storage: sintaxis Bash correcta.

| Spec HU-10 | Casos | Resultado funcional nuevo |
|---|---:|---|
| acceso.cy.ts | 5 | No ejecutados: bloqueo de infraestructura |
| baja.cy.ts | 8 | No ejecutados: bloqueo de infraestructura |
| busqueda.cy.ts | 5 | No ejecutados: bloqueo de infraestructura |
| inscripcion.cy.ts | 9 | No ejecutados: bloqueo de infraestructura |
| listado.cy.ts | 4 | No ejecutados: bloqueo de infraestructura |

**No hay nuevos aprobados/fallidos funcionales de ninguna suite.**

## Intentos de ejecución

Primero `podman ps -a --filter name=income-e2e` falló antes de listar contenedores.
También fallaron, secuencialmente, los comandos siguientes:

```bash
podman compose -p income-e2e -f cypress/compose.yaml exec -T runner bash -ic 'npm run e2e:types'
podman compose -p income-e2e -f cypress/compose.yaml exec -T runner bash -ic 'npm run e2e:hu10'
podman compose -p income-e2e -f cypress/compose.yaml exec -T runner bash -ic 'npm run e2e:hu9'
podman compose -p income-e2e -f cypress/compose.yaml exec -T runner bash -ic 'npm run e2e:hu15'
```

Cada comando retornó 1 antes de iniciar el runner:
`set sticky bit on: chmod /run/user/1000/libpod: read-only file system`.
El sandbox sigue sin admitir escalación (sandbox_approval=false); no se dispone
de terminal externa desde esta sesión. No se restauró ni escribió ninguna base.

TypeScript se verificó con:

```bash
ELECTRON_RUN_AS_NODE=1 /usr/share/code/code node_modules/typescript/bin/tsc --project cypress/tsconfig.json
```

Quedan pendientes: lint PHP con php -l (no hay PHP local en PATH), ejecución del
helper, comprobación de arranque, dependencias/binario Cypress, assets Vite y
los tests contra la aplicación. No se evade el sandbox ni se ejecuta contra app
o app_testing.

## Separación de fallos

| Categoría | Evidencia / estado |
|---|---|
| Infraestructura previa | El bloqueo libpod existía antes de añadir HU-10; ningún caso llegó a iniciarse. |
| HU-10: diferencias funcionales por inspección | Los rechazos usan «esta» y «gestion» sin las tildes exigidas. Tests mantienen «está» y «gestión». No hay aún fallos E2E certificados. |
| Validación defensiva HU10-13 | El hook after consulta id_estudiante incluso cuando falló integer. Con PostgreSQL, un texto no entero puede producir un error SQL antes del 422. Es una inferencia del código previo, pendiente de ejecución; se conserva la expectativa 422. |
| Automatización nueva | TypeScript y comprobaciones estáticas correctos. Selectores, tiempos y rutas de ejecución aún requieren comprobación real; no se asegura que estén libres de errores de ejecución. |
| Regresiones HU-9 | Specs y helpers previos intactos; reset conservado. HU-9 tenía 58 casos implementados pero ninguna ejecución funcional verificada. Comparación funcional pendiente. |
| Regresiones HU-15 | Specs intactos; reset y esquema students/examen/ambiente conservados. Línea base histórica: 2 aprobados (04/10), 8 fallidos del 2026-10-05, no resultados de hoy. Comparación funcional pendiente. |

No se cambian producción ni expectativas para obtener aprobaciones.

## Cobertura y diseño

[Matriz previa y diferencias](HU-10-cobertura.md). Los 31 casos cubren todos los
criterios explícitos, con permisos, búsqueda, altas, dos rechazos literales,
listado/paginación/vacío, baja y preservación de otras inscripciones. Los casos
complementarios de payload/recurso inválido y cancelación están identificados
como defensivos, sin atribuir reglas adicionales a la HU.

Cada caso restaura app_e2e de forma independiente. reset-hu10 reutiliza seedHu9
y añade solo sus fixtures; no necesita que los tests HU-9 se hayan ejecutado.
Los estados reset/state de HU-15 y reset-hu9/state-hu9 siguen separados.

La UI oculta al ya inscrito; el duplicado se comprueba con POST auténtico y CSRF.
El conflicto con otro grupo sí se intenta desde la UI y mediante endpoint.
Snapshots comprueban que altas añaden solo los vínculos esperados y que bajas
quitan exclusivamente la inscripción seleccionada. Los mensajes efímeros de
UI se capturan antes de consultar DB, evitando depender de su duración de 4 s.

El intercept de búsqueda observa y espera respuestas reales; no fabrica éxitos.
Fixtures semestrales no se confunden con un alta aprobada por HU-9.
Las comprobaciones posteriores a un primer fallo no se cuentan como aprobadas.

La ejecución debe hacerse secuencialmente. Si HU-10 falla, ejecutar igualmente
HU-9 y HU-15 para clasificar las diferencias; no usar una cadena que omita las
suites posteriores por el código de salida de una suite.

## Ejecución completa comunicada por el usuario — resultado más reciente disponible

**31 ejecutados; 24 aprobados; 7 fallidos; 0 pendientes y 0 omitidos. Duración: 6 min 25 s.**

Fuente: resumen suministrado por el usuario, sin log completo ni fecha exacta de ejecución. Supera los antecedentes de ejecución bloqueada que figuran arriba. No permite identificar cada caso fallido ni atribuir causas.

| Archivo o área | Casos | Aprobados | Fallidos |
|---|---:|---:|---:|
| Acceso | 5 | 2 | 3 |
| Baja | 8 | 8 | 0 |
| Búsqueda | 5 | 5 | 0 |
| Inscripción | 9 | 5 | 4 |
| Listado | 4 | 4 | 0 |
| **Total** | **31** | **24** | **7** |

Clasificación causal pendiente de los bloques numerados de error y/o JSON Cypress. No se extrapolan resultados históricos o de inspección a esta ejecución.

## HU-10: títulos y resultados individuales de la ejecución aportada

Fuente: salida completa de Cypress compartida por el usuario. **31 ejecutados: 24 aprobados y 7 fallidos; 0 pendientes y 0 omitidos. Duración total: 6 min 17 s.** No se ejecutaron pruebas nuevas para preparar este detalle.

| Archivo | Ejecutados | Aprobados | Fallidos |
|---|---:|---:|---:|
| acceso.cy.ts | 5 | 2 | 3 |
| baja.cy.ts | 8 | 8 | 0 |
| busqueda.cy.ts | 5 | 5 | 0 |
| inscripcion.cy.ts | 9 | 5 | 4 |
| listado.cy.ts | 4 | 4 | 0 |
| **Total** | **31** | **24** | **7** |

### Aprobados: 24 casos

| N.º | Archivo | Título del caso |
|---:|---|---|
| 1 | `acceso.cy.ts` | HU10-01 · administrador llega desde Grupos al detalle y sus acciones |
| 2 | `acceso.cy.ts` | HU10-03 · sin sesión no accede al detalle ni inscribe o da de baja |
| 3 | `baja.cy.ts` | HU10-18 · baja por UI persiste sin borrar estudiante, grupo u otras inscripciones |
| 4 | `baja.cy.ts` | HU10-19 · DELETE directo realiza únicamente la baja elegida y coincide con la UI |
| 5 | `baja.cy.ts` | HU10-20 · no elimina la inscripción usando una URL de otro grupo |
| 6 | `baja.cy.ts` | HU10-21 GET · grupo inexistente rechazado sin modificar datos |
| 7 | `baja.cy.ts` | HU10-21 POST · grupo inexistente rechazado sin modificar datos |
| 8 | `baja.cy.ts` | HU10-21 DELETE · grupo inexistente rechazado sin modificar datos |
| 9 | `baja.cy.ts` | HU10-22 · inscripción inexistente rechazada sin modificar datos |
| 10 | `baja.cy.ts` | HU10-23 · cancelar baja conserva la inscripción después de recargar |
| 11 | `busqueda.cy.ts` | HU10-04 código · busca y conserva resultados correctos al recargar |
| 12 | `busqueda.cy.ts` | HU10-04 nombre · busca y conserva resultados correctos al recargar |
| 13 | `busqueda.cy.ts` | HU10-04 apellido · busca y conserva resultados correctos al recargar |
| 14 | `busqueda.cy.ts` | HU10-05 · término inexistente muestra búsqueda sin resultados y no cambia datos |
| 15 | `busqueda.cy.ts` | HU10-06 · limpiar búsqueda restaura el buscador y conserva el listado |
| 16 | `inscripcion.cy.ts` | HU10-07 · inscripción por UI persiste después de recargar |
| 17 | `inscripcion.cy.ts` | HU10-08 · POST autenticado válido persiste y coincide con el listado UI |
| 18 | `inscripcion.cy.ts` | HU10-12 · permite inscribir simultáneamente en distintas asignaturas de la misma Gestión |
| 19 | `inscripcion.cy.ts` | HU10-13 ausente · servidor valida el estudiante sin alterar inscripciones |
| 20 | `inscripcion.cy.ts` | HU10-13 inexistente · servidor valida el estudiante sin alterar inscripciones |
| 21 | `listado.cy.ts` | HU10-14 · lista código, nombres y apellidos reales de los inscritos |
| 22 | `listado.cy.ts` | HU10-15 · pagina todos los inscritos sin omisiones y conserva la búsqueda al navegar |
| 23 | `listado.cy.ts` | HU10-16 · grupo sin inscritos muestra estado vacío y permite buscar |
| 24 | `listado.cy.ts` | HU10-17 · exactamente 15 inscritos caben en una página después de una baja |

### Fallidos: 7 casos

| N.º | Archivo | Título del caso |
|---:|---|---|
| 1 | `acceso.cy.ts` | HU10-02 docente responsable · UI, URL y acciones directas denegadas |
| 2 | `acceso.cy.ts` | HU10-02 control · UI, URL y acciones directas denegadas |
| 3 | `acceso.cy.ts` | HU10-02 estudiante del grupo · UI, URL y acciones directas denegadas |
| 4 | `inscripcion.cy.ts` | HU10-09 · UI excluye al inscrito; endpoint rechaza duplicado con mensaje exacto |
| 5 | `inscripcion.cy.ts` | HU10-10 · UI rechaza otro grupo de la misma Asignatura y Gestión con mensaje exacto |
| 6 | `inscripcion.cy.ts` | HU10-11 · endpoint rechaza otro grupo de la misma Asignatura y Gestión con mensaje exacto |
| 7 | `inscripcion.cy.ts` | HU10-13 no entero · servidor valida el estudiante sin alterar inscripciones |

### Evidencia de los fallos

- HU10-02 docente responsable, control y estudiante del grupo: HTTP 419 en lugar de 403. No demuestra acceso indebido; falta determinar la causa del obstáculo CSRF/sesión.
- HU10-09: mensaje recibido «El estudiante ya esta inscrito en este grupo»; requerido «El estudiante ya está inscrito en este grupo».
- HU10-10 y HU10-11: mensaje recibido «El estudiante ya esta inscrito en otro grupo de esta asignatura para esta gestion»; requerido «El estudiante ya está inscrito en otro grupo de esta asignatura para esta gestión». Las dos variantes evidencian el mismo defecto de mensaje.
- HU10-13 no entero: HTTP 500 en lugar de 422; validación defensiva adicional. La traza de servidor no fue aportada y no se atribuye una causa interna exacta.

El código de salida 7 representa siete casos fallidos, no un fallo de los contenedores. Una comprobación posterior al primer fallo no se presenta como aprobada.

## Bugs HU-10 documentados con evidencia de ejecución

[Reportes separados por HU](../bug-reports/HU-10/README.md): CS17 mensaje de duplicado (1 caso); CS18 mensaje de otro grupo (2 casos); CS19 ID de texto con respuesta 500 (1 caso, validación adicional); CS20 obstáculo CSRF 419 (3 casos, causa pendiente). Cuatro reportes cubren los siete casos fallidos sin atribuir acceso indebido ni duplicación de inscripciones. No se modificó Laravel ni se debilitaron expectativas.
