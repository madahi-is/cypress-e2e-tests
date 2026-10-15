# HU-9 — ejecución detallada

## HU-9: títulos y resultados individuales de la ejecución aportada

Fuente: salida completa de Cypress compartida por el usuario. **58 ejecutados: 38 aprobados y 20 fallidos; 0 pendientes y 0 omitidos. Duración total: 12 min 35 s.** No se ejecutaron pruebas nuevas para preparar esta tabla.

| Archivo | Ejecutados | Aprobados | Fallidos |
|---|---:|---:|---:|
| acceso.cy.ts | 5 | 2 | 3 |
| gestion.cy.ts | 11 | 8 | 3 |
| listado.cy.ts | 10 | 10 | 0 |
| registro.cy.ts | 32 | 18 | 14 |
| **Total** | **58** | **38** | **20** |

### Aprobados: 38 casos

| N.º | Archivo | Título del caso |
|---:|---|---|
| 1 | `acceso.cy.ts` | HU09-01 · administrador accede desde menú y al detalle de inscritos |
| 2 | `acceso.cy.ts` | HU09-03 · anónimo no accede al módulo ni escribe datos |
| 3 | `gestion.cy.ts` | HU09-24 · reasigna docente y persiste sin alterar grupo ni relaciones |
| 4 | `gestion.cy.ts` | HU09-25 UI · exige seleccionar docente al reasignar |
| 5 | `gestion.cy.ts` | HU09-25 ausente · rechaza reasignación inválida sin cambios |
| 6 | `gestion.cy.ts` | HU09-25 inexistente · rechaza reasignación inválida sin cambios |
| 7 | `gestion.cy.ts` | HU09-26 · elimina un grupo libre y persiste la baja |
| 8 | `gestion.cy.ts` | HU09-27 · UI bloquea eliminar grupo con inscrito y muestra mensaje exacto |
| 9 | `gestion.cy.ts` | HU09-28 · UI protege grupo cuyos inscritos se relacionan con examen |
| 10 | `gestion.cy.ts` | HU09-30 · inscribir bloquea eliminación; dar de baja permite eliminar grupo libre |
| 11 | `listado.cy.ts` | HU09-16 · muestra asignatura, nombre de grupo, Gestión y docente reales |
| 12 | `listado.cy.ts` | HU09-17 · recorre todas las páginas sin omisiones ni duplicados y permite volver |
| 13 | `listado.cy.ts` | HU09-18 · filtra solo por Asignatura y conserva el filtro al recargar |
| 14 | `listado.cy.ts` | HU09-19 · filtra solo por Gestión y conserva el filtro al recargar |
| 15 | `listado.cy.ts` | HU09-20 · aplica ambos filtros y los mantiene entre páginas |
| 16 | `listado.cy.ts` | HU09-21 · combinación sin coincidencias muestra lista vacía |
| 17 | `listado.cy.ts` | HU09-22 · limpiar restaura ambos filtros y el listado completo |
| 18 | `listado.cy.ts` | HU09-23 asignatura inexistente · rechaza filtros inválidos en servidor |
| 19 | `listado.cy.ts` | HU09-23 asignatura texto · rechaza filtros inválidos en servidor |
| 20 | `listado.cy.ts` | HU09-23 gestion larga · rechaza filtros inválidos en servidor |
| 21 | `registro.cy.ts` | HU09-06 · UI exige todos los campos y no escribe el formulario vacío |
| 22 | `registro.cy.ts` | HU09-07 id_asignatura · servidor rechaza campo obligatorio ausente |
| 23 | `registro.cy.ts` | HU09-07 id_usuario · servidor rechaza campo obligatorio ausente |
| 24 | `registro.cy.ts` | HU09-07 gestion · servidor rechaza campo obligatorio ausente |
| 25 | `registro.cy.ts` | HU09-07 nombre_grupo · servidor rechaza campo obligatorio ausente |
| 26 | `registro.cy.ts` | HU09-08 abc · Gestión malformada rechazada en UI y servidor |
| 27 | `registro.cy.ts` | HU09-08 26-2 · Gestión malformada rechazada en UI y servidor |
| 28 | `registro.cy.ts` | HU09-09 · listas de alta y reasignación incluyen exclusivamente los docentes |
| 29 | `registro.cy.ts` | HU09-10 POST administrador · rechaza asignar usuario que no es docente |
| 30 | `registro.cy.ts` | HU09-10 PATCH administrador · rechaza asignar usuario que no es docente |
| 31 | `registro.cy.ts` | HU09-10 POST personal de control de ingreso · rechaza asignar usuario que no es docente |
| 32 | `registro.cy.ts` | HU09-10 PATCH personal de control de ingreso · rechaza asignar usuario que no es docente |
| 33 | `registro.cy.ts` | HU09-10 POST estudiante · rechaza asignar usuario que no es docente |
| 34 | `registro.cy.ts` | HU09-10 PATCH estudiante · rechaza asignar usuario que no es docente |
| 35 | `registro.cy.ts` | HU09-11 id_asignatura inexistente · valida referencia y tipo |
| 36 | `registro.cy.ts` | HU09-11 id_usuario inexistente · valida referencia y tipo |
| 37 | `registro.cy.ts` | HU09-15 51 · límite actual del nombre y blancos |
| 38 | `registro.cy.ts` | HU09-15 0 · límite actual del nombre y blancos |

### Fallidos: 20 casos

| N.º | Archivo | Título del caso |
|---:|---|---|
| 1 | `acceso.cy.ts` | HU09-02 docente · sin menú, URL ni ninguna escritura de grupos/inscripciones |
| 2 | `acceso.cy.ts` | HU09-02 control · sin menú, URL ni ninguna escritura de grupos/inscripciones |
| 3 | `acceso.cy.ts` | HU09-02 estudiante · sin menú, URL ni ninguna escritura de grupos/inscripciones |
| 4 | `gestion.cy.ts` | HU09-25 texto · rechaza reasignación inválida sin cambios |
| 5 | `gestion.cy.ts` | HU09-29 B · DELETE directo preserva inscripciones y exámenes asociados |
| 6 | `gestion.cy.ts` | HU09-29 C · DELETE directo preserva inscripciones y exámenes asociados |
| 7 | `registro.cy.ts` | HU09-04 A · registra por UI con Gestión 2026-2 y persiste |
| 8 | `registro.cy.ts` | HU09-04 B · registra por UI con Gestión 2026-2 y persiste |
| 9 | `registro.cy.ts` | HU09-04 1A · registra por UI con Gestión 2026-2 y persiste |
| 10 | `registro.cy.ts` | HU09-04 14 · registra por UI con Gestión 2026-2 y persiste |
| 11 | `registro.cy.ts` | HU09-05 · servidor acepta Gestión semestral sin depender de validación UI |
| 12 | `registro.cy.ts` | HU09-11 id_asignatura texto · valida referencia y tipo |
| 13 | `registro.cy.ts` | HU09-11 id_usuario texto · valida referencia y tipo |
| 14 | `registro.cy.ts` | HU09-12 docente1.e2e · rechaza triple duplicada con mensaje exacto de HU |
| 15 | `registro.cy.ts` | HU09-12 docente2.e2e · rechaza triple duplicada con mensaje exacto de HU |
| 16 | `registro.cy.ts` | HU09-13 · UI muestra el mensaje exacto de triple duplicada |
| 17 | `registro.cy.ts` | HU09-14 nombre · permite otra combinación y varios grupos del mismo docente |
| 18 | `registro.cy.ts` | HU09-14 asignatura · permite otra combinación y varios grupos del mismo docente |
| 19 | `registro.cy.ts` | HU09-14 gestion · permite otra combinación y varios grupos del mismo docente |
| 20 | `registro.cy.ts` | HU09-15 50 · límite actual del nombre y blancos |

### Alcance de los fallos

Los tres fallos de acceso recibieron 419 en lugar de 403; por sí solos no demuestran acceso indebido. Los dos HU09-29 se detuvieron por un GET Inertia con HTTP 409, antes de completar sus comprobaciones. Tres validaciones de IDs con texto devolvieron 500 en lugar de 422. Dos casos de duplicados evidencian diferencia entre «gestion» y «gestión». Los demás errores se conservan como observaciones de ejecución, sin atribuir automáticamente una causa común ni contar cada caso como un bug distinto.

La advertencia de deprecación de Electron no impidió terminar la suite. El código de salida 20 representa los 20 casos fallidos.
