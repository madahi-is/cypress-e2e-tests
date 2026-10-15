# HU-10 — ejecución detallada

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
