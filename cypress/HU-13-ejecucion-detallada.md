# HU-13 — ejecución detallada

## HU-13: títulos y resultados individuales de la ejecución aportada

**29 ejecutados: 12 aprobados y 17 fallidos; 0 pendientes y 0 omitidos. Duración total: 5 min 43 s.** Fuente: salida completa de Cypress compartida por el usuario. No se ejecutaron nuevas pruebas para preparar este detalle.

| Archivo | Ejecutados | Aprobados | Fallidos |
|---|---:|---:|---:|
| acceso.cy.ts | 8 | 3 | 5 |
| actualizacion.cy.ts | 3 | 0 | 3 |
| busqueda.cy.ts | 3 | 3 | 0 |
| cierre.cy.ts | 2 | 2 | 0 |
| listas.cy.ts | 10 | 2 | 8 |
| seleccion.cy.ts | 3 | 2 | 1 |
| **Total** | **29** | **12** | **17** |

### Aprobados: 12 casos

| N.º | Archivo | Título del caso |
|---:|---|---|
| 1 | `acceso.cy.ts` | HU13-01 personal de control de ingreso entra desde el menú |
| 2 | `acceso.cy.ts` | HU13-01 docente entra desde el menú |
| 3 | `acceso.cy.ts` | HU13-04 visitante no accede a URL ni consulta/actualización |
| 4 | `busqueda.cy.ts` | HU13-15 busca pendientes por nombre; caracteriza resumen global independiente del filtro |
| 5 | `busqueda.cy.ts` | HU13-15 busca pendientes por código; caracteriza resumen global independiente del filtro |
| 6 | `busqueda.cy.ts` | HU13-16 búsqueda sin resultados y limpieza recuperan los pendientes |
| 7 | `cierre.cy.ts` | HU13-19 examen finalizado por reloj PHP muestra cierre y asistencia existente |
| 8 | `cierre.cy.ts` | HU13-20 examen ya cerrado no refresca durante dos intervalos reales del polling |
| 9 | `listas.cy.ts` | HU13-10 listas y resumen coherentes con 0 de 4 ingresados |
| 10 | `listas.cy.ts` | HU13-11 inhabilitado y sin habilitación no aparecen en ninguna lista |
| 11 | `seleccion.cy.ts` | HU13-05 selecciona examen en curso y muestra su asistencia |
| 12 | `seleccion.cy.ts` | HU13-06 caracteriza catálogo que incluye futuro lejano sin ventana de próximo definida |

### Fallidos: 17 casos

| N.º | Archivo | Título del caso |
|---:|---|---|
| 1 | `acceso.cy.ts` | HU13-02 personal de control de ingreso consulta URL, JSON y refresco parcial |
| 2 | `acceso.cy.ts` | HU13-02 docente consulta URL, JSON y refresco parcial |
| 3 | `acceso.cy.ts` | HU13-01 administrador entra desde el menú |
| 4 | `acceso.cy.ts` | HU13-02 administrador consulta URL, JSON y refresco parcial |
| 5 | `acceso.cy.ts` | HU13-03 estudiante no accede por menú, URL o consulta/actualización |
| 6 | `actualizacion.cy.ts` | HU13-17 check-in independiente mueve pendiente a Norte HU13 sin recarga y conserva filtro |
| 7 | `actualizacion.cy.ts` | HU13-17 check-in independiente mueve pendiente a Sur HU13 sin recarga y conserva filtro |
| 8 | `actualizacion.cy.ts` | HU13-18 polling mantiene examen y filtro ante ingreso en otro examen |
| 9 | `listas.cy.ts` | HU13-08 agrupa ingresos reales por ambiente: Un ambiente HU13 |
| 10 | `listas.cy.ts` | HU13-09 exige ambas listas dentro de cada ambiente: Un ambiente HU13 |
| 11 | `listas.cy.ts` | HU13-08 agrupa ingresos reales por ambiente: Principal HU13 |
| 12 | `listas.cy.ts` | HU13-09 exige ambas listas dentro de cada ambiente: Principal HU13 |
| 13 | `listas.cy.ts` | HU13-10 listas y resumen coherentes con 2 de 4 ingresados |
| 14 | `listas.cy.ts` | HU13-10 listas y resumen coherentes con 4 de 4 ingresados |
| 15 | `listas.cy.ts` | HU13-12 ingreso de otro examen no altera pendientes ni resumen principal |
| 16 | `listas.cy.ts` | HU13-13 ingresados no se repiten entre ambientes y suman el total global |
| 17 | `seleccion.cy.ts` | HU13-07 cambiar examen sustituye listas, ambientes y contadores sin mezcla |

### Alcance de los errores aportados

- Diez fallos se detienen en helpers.ts:58 porque el epoch llega como string y la aserción exige número o fecha: actualización (3), listas (6) y selección (1). Esto no demuestra que fallen la actualización automática, los contadores o la separación de exámenes; las comprobaciones posteriores quedan bloqueadas.
- Cuatro casos de acceso reciben HTTP 409: tres esperaban 200 y el del estudiante esperaba 403. Hay que revisar el protocolo Inertia y los encabezados antes de atribuir un problema de autorización.
- El acceso desde el menú del administrador falla porque el centro del enlace está oculto. Falta distinguir layout de automatización.
- Dos HU13-09 no encuentran «Ingresaron» dentro de .ambiente-card. El error acredita esa ausencia en la comprobación, pero no permite concluir por sí solo toda la organización de listas o su causa.

La búsqueda y el cierre aprobaron sus escenarios. HU13-06 caracteriza el catálogo actual; no confirma una ventana temporal de «próximo a comenzar», aún sin definición. Los reintentos y las aserciones no alcanzadas no se cuentan como aprobados. El código de salida 17 comunica los 17 casos fallidos, no un fallo de contenedores.
