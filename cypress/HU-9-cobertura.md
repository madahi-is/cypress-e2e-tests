# HU-9 · análisis previo y matriz de cobertura

Fecha: 2026-10-10. Fuente de requisitos: texto HU-9 proporcionado por el usuario.
Este análisis se escribió antes de los tests. No se modifica Laravel.

## Implementación inspeccionada

- `routes/web.php:111-121`: GET/POST `/grupos`, GET/PATCH/DELETE
  `/grupos/{grupo}`, POST `/grupos/{grupo}/inscripciones` y DELETE
  `/grupos/{grupo}/inscripciones/{inscripcion}` bajo auth, password.pendiente
  y role:administrador. `EnsureUserHasRole` deniega otros roles con 403.
- `GrupoController`: listado con relaciones, conteo y paginate(15), filtros
  exactos por asignatura/gestión, docentes filtrados por rol; alta transaccional,
  PATCH solo docente y DELETE bloqueado por inscripciones.
- `StoreGrupoRequest`: obligatorios, FK existentes, docente verificado por rol,
  Gestión con regex de **cuatro dígitos**, nombre de hasta 50 caracteres,
  unicidad triple; recorta blancos de nombre/gestión.
- `UpdateGrupoRequest`: docente requerido, existente y del rol docente.
  `IndexGrupoRequest`: asignatura existente, gestión de hasta 20 caracteres.
- `InscripcionController`/`StoreInscripcionRequest`: detalle, búsqueda,
  inscripción y baja; exclusividad administrador; evita inscripciones duplicadas
  y dos grupos de la misma asignatura/gestión. Estas últimas reglas no se
  convierten en criterios de HU-9 sin un requisito adicional.
- Modelos `Grupo`, `Inscripcion`, `Examen`, `Habilitacion`: inscripcion une
  estudiante y grupo; habilitacion une estudiante y examen; examen_grupo une
  directamente grupo y examen. No existe FK de examen a id_inscripcion.
- Migraciones: unique(asignatura,nombre,gestion); inscripcion→grupo y
  examen_grupo→grupo usan cascadeOnDelete. La protección depende del controlador.
- Vistas `Admin/Grupos/Index.vue`, `Detalle.vue`, `AuthenticatedLayout.vue`,
  `components/ui/Modal.vue` y `ToastContainer.vue`: menú solo admin, formularios,
  errores, filtros, filas, botones de paginación y modales reales.
- Feature tests originales revisados como contexto; usan Gestión anual,
  no reemplazan el texto de aceptación ni se ejecutan contra app_testing.

## Diferencias antes de automatizar

1. **Formato:** UI y servidor rechazan `2026-2`; HU-9 lo exige como ejemplo válido.
   Los casos de alta esperan éxito con ese valor. No se sustituye por `2026`.
2. **Mensaje exacto de duplicado:** servidor devuelve
   `Ya existe un grupo con ese nombre para esa asignatura en esa gestion`;
   HU exige `Ya existe un grupo con ese nombre para esa asignatura en esa gestión`.
   Se conserva la tilde en las aserciones. En UI, el error de formato puede
   impedir llegar a la validación de duplicado; el caso directo lo aísla.
3. **Baja:** se protegen las inscripciones con el mensaje exacto requerido.
   Con inscritos que además tienen habilitación y examen vinculado, se protege
   por la misma condición. Un vínculo examen_grupo sin inscritos no se comprueba
   y puede borrarse en cascada. Se consultó si ese escenario adicional debe
   bloquearse; queda pendiente, sin expectativa inventada.
4. Paginación, filtros, reasignación y restricciones de rol parecen implementar
   los requisitos por inspección; todavía no son resultados de ejecución.
5. Límites 50/51 del nombre y FK/tipos inválidos son comprobaciones defensivas
   derivadas del código, no límites numéricos especificados por HU-9.

## Datos deterministas

Cada caso HU-9 ejecuta `reset-hu9` en app_e2e. No depende de casos anteriores.
Dos docentes (`docente1.e2e`, `docente2.e2e`), admin, control, Ana/Bruno y Carla sin inscripción (202609903).
Asignaturas Matemática HU9, Física HU9 y Vacía HU9. Grupos semestrales insertados
como fixtures de aceptación, sin pasar por la validación de alta incompatible:
A libre, B inscrito con Bruno, C inscrito con Ana y vinculado al examen/habilitación;
A en Física y A en Matemática/2026-1; P01..P13 en Matemática/2026-2.
Total 18 grupos: 17 en 2026-2, 1 en 2026-1; Matemática/2026-2 tiene 16.
Periodo/examen de fecha fija en 2026. Todos los IDs se obtienen del helper,
no se presuponen secuencias. Fixture HU-15 permanece separada, con su reset original.

## Matriz criterio → casos → datos → selectores reales

Los sufijos indican casos parametrizados independientes. No hay límite artificial.

| Criterio | Casos propuestos | Datos | Selectores / petición real |
|---|---|---|---|
| Solo administrador: UI, URL y escrituras | HU09-01; HU09-02 docente, control, estudiante; HU09-03 anónimo | Cuatro roles, B con inscripción | `.sidebar-nav a[href="/grupos"]`, `.panel-title`; todas las 7 rutas GET/POST/PATCH/DELETE; snapshots de grupos/inscripciones/vínculos |
| Formulario y registro válido | HU09-04 A/B/1A/14; HU09-05 servidor | Asignatura Vacía, docente1, 2026-2 | `Nuevo grupo`; `.modal-container .form-group` resuelto por label; `Registrar grupo`; POST `/grupos`, recarga y estado DB |
| Obligatorios | HU09-06 UI; HU09-07 cuatro campos | Formulario vacío; payload válido menos un campo | `.error-msg`, POST con JSON 422 y error por campo; DB sin cambios |
| Formato Gestión | HU09-04/05 aceptan 2026-2; HU09-08 texto, año incompleto | abc, 26-2 | Input dentro de form-group `Gestion`; UI y servidor; sin persistencia inválida |
| Solo docentes seleccionables | HU09-09 altas/edición; HU09-10 tres roles × POST/PATCH | Dos docentes; admin/control/estudiante | `.modal-container select` resuelto por label `Docente`; opciones exactas; JSON y snapshot |
| FK y tipos válidos | HU09-11 asignatura/docente inexistente o no entero | IDs inexistentes obtenidos desde máximos, texto | POST JSON 422, errores por campo; sin mutación |
| Unicidad y mensaje exacto | HU09-12 mismo/otro docente; HU09-13 UI | Triple existente A/Matemática/2026-2 | POST JSON `errors.nombre_grupo[0]` y `.error-msg` con texto HU exacto; conteo sin cambios |
| Combinaciones permitidas, varios grupos/docente | HU09-14 nombre/asignatura/gestión | Docente1 ya responsable de varios grupos | POST `/grupos`, snapshot demuestra persistencia y misma asignación docente |
| Límites relevantes de nombre (implementación) | HU09-15 50, 51, blancos | Grupo nuevo, nombre límite | POST; éxito en 50, 422 en 51/blancos; DB |
| Columnas y paginación | HU09-16 columnas; HU09-17 páginas | 18 filas, dos páginas | `.data-table th`, `td[data-label]`, `.page-info`, botones Anterior/Siguiente, href de Ver inscritos sin duplicados |
| Filtro Asignatura | HU09-18 | Física: 1 fila | `.filtro-campo` por label + `select`, `td[data-label="Asignatura"]`, URL/recarga |
| Filtro Gestión | HU09-19 | 2026-1: 1 fila | filtro Gestion, `td[data-label="Gestion"]`, URL/recarga |
| Filtros combinados y páginas | HU09-20 | Matemática/2026-2: 16 filas | Dos filtros, paginación, query preservado, filas exactas |
| Vacío y limpiar filtros | HU09-21; HU09-22 | Física/2026-1 sin filas; restaurar 18 | `.empty-state`, botón Limpiar y URL |
| Filtros inválidos (defensivo) | HU09-23 asignatura inexistente/no entera, gestión demasiado larga | Parámetros inválidos | GET `/grupos` Accept JSON 422 |
| Reasignación persistente | HU09-24; HU09-25 UI y missing/inexistente/tipo | A libre docente1→docente2 | Botón Reasignar docente, select Docente, Guardar cambios, td Docente, recarga y snapshot |
| Eliminar libre | HU09-26 | A libre | Eliminar en fila; `.modal-footer .btn-danger`; DB y recarga |
| No eliminar inscritos | HU09-27 UI; HU09-29 inscrito directo | B/Bruno | `.toast.error span` exacto; DELETE; snapshot y recarga |
| No eliminar inscritos relacionados con examen | HU09-28 UI; HU09-29 examen directo | C/Ana, examen_grupo + habilitacion | Mismos selectores y mensaje HU; snapshot conserva todas las relaciones |
| Flujo inscripciones y efecto en eliminación | HU09-30 (complementario) | A libre + Carla; luego baja | `.buscador input`, `.resultado-item`, Inscribir, `.data-table`, Dar de baja; bloqueo con mensaje HU y posterior eliminación |

Los mensajes exactos exigidos por la HU son únicamente duplicado y eliminación.
Los otros mensajes se verifican por campo/estado o se identifican explícitamente
como feedback actual de UI, sin presentarlos como requisitos textuales de HU-9.

## Ambigüedades consultadas

- ¿Se acepta año solo y qué otros periodos/formato significa «o similar»?
  Se automatiza 2026-2 y se prueban solo formatos inequívocamente malformados;
  no se decide sobre 2026, 2026-0, 2026-3 ni separadores alternativos como 2026/2.
- ¿Debe protegerse examen_grupo sin inscripciones? Pendiente de respuesta.
- La HU no fija tamaño de página, longitud máxima ni orden: se comprueba el
  límite actual 15 como contrato de implementación, y navegación completa;
  no se atribuye a la HU ese número.
