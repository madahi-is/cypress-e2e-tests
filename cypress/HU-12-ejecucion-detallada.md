# HU-12 — ejecución detallada

## HU-12: títulos y resultados individuales de la ejecución aportada

**59 ejecutados: 36 aprobados y 23 fallidos; 0 pendientes y 0 omitidos. Duración total: 15 min 21 s.** Fuente: salida completa compartida por el usuario. No se ejecutaron nuevas pruebas para preparar este documento.

Esta salida detallada sustituye el resumen previo de 35 aprobados y 24 fallidos (14 min 23 s). No se suman ambas cifras ni se asume que correspondan a la misma ejecución. El listado pasó 5 casos y falló 6, frente al resumen anterior de 4 y 7.

| Archivo | Ejecutados | Aprobados | Fallidos |
|---|---:|---:|---:|
| acceso.cy.ts | 8 | 3 | 5 |
| defensivos.cy.ts | 5 | 4 | 1 |
| inmutabilidad.cy.ts | 11 | 11 | 0 |
| listado.cy.ts | 11 | 5 | 6 |
| registro.cy.ts | 21 | 12 | 9 |
| responsive.cy.ts | 2 | 0 | 2 |
| vacio.cy.ts | 1 | 1 | 0 |
| **Total** | **59** | **36** | **23** |

### Aprobados: 36 casos

| N.º | Archivo | Título del caso |
|---:|---|---|
| 1 | `acceso.cy.ts` | HU12-01 personal de control de ingreso accede desde navegación |
| 2 | `acceso.cy.ts` | HU12-01 docente accede desde navegación |
| 3 | `acceso.cy.ts` | HU12-04 visitante no accede ni registra |
| 4 | `defensivos.cy.ts` | HU12-29 catálogo cerrado rechaza tipo externo por endpoint |
| 5 | `defensivos.cy.ts` | HU12-30 adicional: relación inexistente id_examen rechazada |
| 6 | `defensivos.cy.ts` | HU12-30 adicional: relación inexistente id_estudiante rechazada |
| 7 | `defensivos.cy.ts` | HU12-31 adicional: rango invertido rechazado por validación actual |
| 8 | `inmutabilidad.cy.ts` | HU12-25 tarjetas no ofrecen edición ni eliminación |
| 9 | `inmutabilidad.cy.ts` | HU12-26 registro real de rutas contiene solo índice y registro |
| 10 | `inmutabilidad.cy.ts` | HU12-27 personal de control de ingreso no modifica datos con PUT |
| 11 | `inmutabilidad.cy.ts` | HU12-27 personal de control de ingreso no modifica datos con PATCH |
| 12 | `inmutabilidad.cy.ts` | HU12-27 personal de control de ingreso no modifica datos con DELETE |
| 13 | `inmutabilidad.cy.ts` | HU12-27 docente no modifica datos con PUT |
| 14 | `inmutabilidad.cy.ts` | HU12-27 docente no modifica datos con PATCH |
| 15 | `inmutabilidad.cy.ts` | HU12-27 docente no modifica datos con DELETE |
| 16 | `inmutabilidad.cy.ts` | HU12-27 administrador no modifica datos con PUT |
| 17 | `inmutabilidad.cy.ts` | HU12-27 administrador no modifica datos con PATCH |
| 18 | `inmutabilidad.cy.ts` | HU12-27 administrador no modifica datos con DELETE |
| 19 | `listado.cy.ts` | HU12-19 filtro individual por rango |
| 20 | `listado.cy.ts` | HU12-20 filtros combinados restringen conjuntamente el resultado |
| 21 | `listado.cy.ts` | HU12-21 limpiar filtros recupera listado sin restricciones |
| 22 | `listado.cy.ts` | HU12-22 rango sin coincidencias muestra estado vacío |
| 23 | `listado.cy.ts` | HU12-23 caracteriza extremos inclusivos del rango implementado (pendiente de confirmación HU) |
| 24 | `registro.cy.ts` | HU12-08 búsqueda desconocida no ofrece estudiantes ni registra |
| 25 | `registro.cy.ts` | HU12-09 cambiar búsqueda limpia la asociación anterior |
| 26 | `registro.cy.ts` | HU12-10 id_examen vacío muestra mensaje obligatorio en UI |
| 27 | `registro.cy.ts` | HU12-11 endpoint rechaza id_examen vacío sin persistir |
| 28 | `registro.cy.ts` | HU12-10 tipo_incidencia vacío muestra mensaje obligatorio en UI |
| 29 | `registro.cy.ts` | HU12-11 endpoint rechaza tipo_incidencia vacío sin persistir |
| 30 | `registro.cy.ts` | HU12-10 descripcion_motivo vacío muestra mensaje obligatorio en UI |
| 31 | `registro.cy.ts` | HU12-11 endpoint rechaza descripcion_motivo vacío sin persistir |
| 32 | `registro.cy.ts` | HU12-12 UI rechaza descripción compuesta solo por espacios |
| 33 | `registro.cy.ts` | HU12-12 endpoint rechaza descripción compuesta solo por espacios |
| 34 | `registro.cy.ts` | HU12-13 cancelar el formulario no crea incidencia |
| 35 | `registro.cy.ts` | HU12-15 formulario no tiene controles para fecha, hora o reportante |
| 36 | `vacio.cy.ts` | HU12-17 listado vacío permite abrir registro |

### Fallidos: 23 casos

| N.º | Archivo | Título del caso |
|---:|---|---|
| 1 | `acceso.cy.ts` | HU12-02 personal de control de ingreso accede por URL y registra por endpoint |
| 2 | `acceso.cy.ts` | HU12-02 docente accede por URL y registra por endpoint |
| 3 | `acceso.cy.ts` | HU12-01 administrador accede desde navegación |
| 4 | `acceso.cy.ts` | HU12-02 administrador accede por URL y registra por endpoint |
| 5 | `acceso.cy.ts` | HU12-03 estudiante rechazado por navegación, URL y registro |
| 6 | `defensivos.cy.ts` | HU12-32 caracteriza texto largo sin límite max:1000 activo |
| 7 | `listado.cy.ts` | HU12-16 listado completo y recarga con estudiante |
| 8 | `listado.cy.ts` | HU12-16 listado completo y recarga sin estudiante |
| 9 | `listado.cy.ts` | HU12-18 navega entre páginas sin perder ni repetir incidencias |
| 10 | `listado.cy.ts` | HU12-19 filtro individual por examen |
| 11 | `listado.cy.ts` | HU12-19 filtro individual por tipo |
| 12 | `listado.cy.ts` | HU12-24 paginación mantiene filtros activos en backend y navegación UI |
| 13 | `registro.cy.ts` | HU12-05 registra Expulsión con estudiante sin ingreso previo |
| 14 | `registro.cy.ts` | HU12-05 registra Problema de identificación con estudiante sin ingreso previo |
| 15 | `registro.cy.ts` | HU12-05 registra Cambio de ambiente con estudiante sin ingreso previo |
| 16 | `registro.cy.ts` | HU12-05 registra Otro con estudiante sin ingreso previo |
| 17 | `registro.cy.ts` | HU12-06 registra incidencia sin estudiante y sin error obligatorio para él |
| 18 | `registro.cy.ts` | HU12-07 búsqueda por código asocia el estudiante correcto |
| 19 | `registro.cy.ts` | HU12-07 búsqueda por documento asocia el estudiante correcto |
| 20 | `registro.cy.ts` | HU12-07 búsqueda por nombre asocia el estudiante correcto |
| 21 | `registro.cy.ts` | HU12-14 el cliente no suplanta reportante ni fija fecha del servidor |
| 22 | `responsive.cy.ts` | HU12-28 listado, filtros y formulario utilizables en móvil |
| 23 | `responsive.cy.ts` | HU12-28 listado, filtros y formulario utilizables en tablet |

### Alcance de la evidencia

Quince fallos se detienen en la comparación temporal del helper porque el epoch llega como string (por ejemplo, «1792058193») y la aserción exige número o fecha. Esto identifica un problema de tipos de la verificación; no demuestra una hora incorrecta ni un fallo de registro. Las comprobaciones posteriores quedan no ejecutadas.

Los ocho fallos restantes son: enlace de navegación del administrador no interactuable (1), CSRF 419 frente a 403 (1), espera de petición de paginación no observada (1), filtrado por examen/tipo y tablet con 15 resultados frente a 2 esperados (3), discrepancia de resultados al paginar con filtros (1) y desbordamiento móvil de 418 px frente a viewport de 390 px (1). No se atribuye una causa común sin diagnóstico.

El código de salida 23 comunica los 23 casos fallidos, no un fallo de contenedores. «Pendiente de confirmación HU» dentro del título HU12-23 describe la política de límites de fechas: el caso se ejecutó y aprobó, no quedó Pending de Cypress.
