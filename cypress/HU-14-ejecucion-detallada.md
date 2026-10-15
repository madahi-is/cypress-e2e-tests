# HU-14 — ejecución detallada

## HU-14: títulos y resultados individuales de la ejecución aportada

**29 ejecutados: 25 aprobados y 4 fallidos; 0 pendientes y 0 omitidos. Duración total: 6 min 56 s.** Fuente: salida completa de Cypress compartida por el usuario. No se ejecutaron nuevas pruebas para preparar el detalle.

Esta salida sustituye el resumen previo de 23 aprobados y 6 fallidos. Los cuatro casos de desasignación aprobaron en esta ejecución; no se atribuye la mejora automáticamente a una corrección sin confirmar la revisión de código ejecutada.

| Archivo | Ejecutados | Aprobados | Fallidos |
|---|---:|---:|---:|
| acceso.cy.ts | 7 | 5 | 2 |
| asignacion.cy.ts | 6 | 4 | 2 |
| desasignacion.cy.ts | 4 | 4 | 0 |
| estados.cy.ts | 2 | 2 | 0 |
| selector.cy.ts | 10 | 10 | 0 |
| **Total** | **29** | **25** | **4** |

### Aprobados: 25 casos

| N.º | Archivo | Título del caso |
|---:|---|---|
| 1 | `acceso.cy.ts` | HU14-01 admin.e2e abre personal desde el detalle del examen compartido |
| 2 | `acceso.cy.ts` | HU14-01 docente1.hu14 abre personal desde el detalle del examen compartido |
| 3 | `acceso.cy.ts` | HU14-01 docente2.hu14 abre personal desde el detalle del examen compartido |
| 4 | `acceso.cy.ts` | HU14-02 sección de personal separada de las habilitaciones |
| 5 | `acceso.cy.ts` | HU14-03 visitante no asigna ni quita por interfaz o endpoint |
| 6 | `asignacion.cy.ts` | HU14-05 admin.e2e asigna y persiste tras recargar sin cambios laterales |
| 7 | `asignacion.cy.ts` | HU14-05 docente1.hu14 asigna y persiste tras recargar sin cambios laterales |
| 8 | `asignacion.cy.ts` | HU14-05 docente2.hu14 asigna y persiste tras recargar sin cambios laterales |
| 9 | `asignacion.cy.ts` | HU14-06 varios miembros permanecen asignados al mismo examen |
| 10 | `desasignacion.cy.ts` | HU14-11 admin.e2e quita solo la relación y preserva usuario, rol y otras asignaciones |
| 11 | `desasignacion.cy.ts` | HU14-11 docente1.hu14 quita solo la relación y preserva usuario, rol y otras asignaciones |
| 12 | `desasignacion.cy.ts` | HU14-12 quitar y volver a asignar no duplica relaciones |
| 13 | `desasignacion.cy.ts` | HU14-13 mismo miembro en exámenes con fechas/horas distintas y detalles aislados |
| 14 | `estados.cy.ts` | HU14-14 sección sin personal muestra estado vacío y candidatos |
| 15 | `estados.cy.ts` | HU14-15 al asignar todos no quedan opciones y registro se deshabilita |
| 16 | `selector.cy.ts` | HU14-04 selector ofrece exclusivamente el rol control |
| 17 | `selector.cy.ts` | HU14-07 admin.e2e no puede asignar id de administrador |
| 18 | `selector.cy.ts` | HU14-07 admin.e2e no puede asignar id de docente |
| 19 | `selector.cy.ts` | HU14-07 admin.e2e no puede asignar id de estudiante |
| 20 | `selector.cy.ts` | HU14-07 docente1.hu14 no puede asignar id de administrador |
| 21 | `selector.cy.ts` | HU14-07 docente1.hu14 no puede asignar id de docente |
| 22 | `selector.cy.ts` | HU14-07 docente1.hu14 no puede asignar id de estudiante |
| 23 | `selector.cy.ts` | HU14-08 adicional: selección vacía muestra validación local y no envía registro |
| 24 | `selector.cy.ts` | HU14-09 adicional: endpoint rechaza ID vacío |
| 25 | `selector.cy.ts` | HU14-09 adicional: endpoint rechaza ID inexistente |

### Fallidos: 4 casos

| N.º | Archivo | Título del caso |
|---:|---|---|
| 1 | `acceso.cy.ts` | HU14-03 control no asigna ni quita por interfaz o endpoint |
| 2 | `acceso.cy.ts` | HU14-03 estudiante no asigna ni quita por interfaz o endpoint |
| 3 | `asignacion.cy.ts` | HU14-10 admin.e2e recibe mensaje exacto de duplicado por endpoint aunque selector lo oculta |
| 4 | `asignacion.cy.ts` | HU14-10 docente1.hu14 recibe mensaje exacto de duplicado por endpoint aunque selector lo oculta |

### Alcance de los errores aportados

- HU14-03 control y estudiante: HTTP 419 en vez de 403. Obstáculo CSRF/sesión; no demuestra permiso de asignar o quitar. Faltan encabezados y diagnóstico para fijar causa.
- HU14-10 administrador y docente: `SyntaxError: "undefined" is not valid JSON` en helpers.ts:64 al leer la información de página. El mensaje exacto del rechazo no se alcanza a comprobar; no se demuestra que sea incorrecto.
- Los cuatro casos de desasignación aprobaron; el problema de sesión observado en capturas anteriores no se presenta como fallo de esta ejecución.

El código de salida 4 corresponde a cuatro casos fallidos, no a un fallo de contenedores. No se contabilizan las comprobaciones posteriores no alcanzadas como aprobadas.
