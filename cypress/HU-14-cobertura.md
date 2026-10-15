# HU-14 · análisis previo y matriz

2026-10-11. README, AGENTS, suites y helpers revisados antes de escribir pruebas.
Laravel se inspecciona sin modificarlo.

## Rutas, vista y reglas activas

- Detalle real: GET `/examenes/{examen}/habilitaciones`, servido por
  HabilitacionController.index y `Admin/Habilitaciones/Index.vue`. No existe
  un endpoint alternativo /examenes/{id}/detalle que deba inventarse.
- Desde `/examenes`, doble clic en fila `.row-examen` abre el detalle. Rutas bajo
  auth/password.pendiente/role administrador,docente; control/estudiante excluidos.
- POST `/examenes/{examen}/personal-control`: PersonalControlController.store
  usa StorePersonalControlRequest (required/integer/exists y validación del rol).
- DELETE `/examenes/{examen}/personal-control/{usuario}`: destroy valida rol
  administrador/docente y detach solo de ese examen, sin eliminar usuario.
- Vista: `.personal-seccion` separada del `.data-table` de habilitaciones,
  título exacto «Personal de control asignado», selector `.personal-select`,
  botón `.personal-btn`, filas `.personal-item`, quitar `.personal-quitar`.
- personalDisponible consulta solo rol control y excluye asignados de ese examen.
  Sin disponibles: nota y botón deshabilitado. Sin asignados: mensaje de estado vacío.
- Duplicado: controller `back()->withErrors(['id_usuario' => texto HU])`; es
  **302 con error de sesión**, incluso con Accept JSON. Petición posterior Inertia
  permite leer props.errors.id_usuario. UI oculta al asignado: no se altera para
  seleccionar un duplicado. El mensaje visible .personal-error se define en
  onError del router; una petición cy.request no ejecuta ese callback de la vista.
- BD: examen_personal_control con PK id_examen_personal, FKs examen/usuario
  cascadeOnDelete y unique(examen,usuario). Relación belongsToMany en Examen y
  User.examenesAsignados. No columna ambiente ni asignación individual por sala.
- Las asignaciones no actualizan habilitaciones ni ambientes. El helper readonly
  verificará cambios exclusivamente en la tabla pivote y persistencia tras recarga.

Fuentes: routes/web.php:167-200; Controllers/{PersonalControl,Habilitacion,Examen}Controller;
Requests/StorePersonalControlRequest; Models/{Examen,User}; migración
2026_09_30_120000_create_examen_personal_control_table; vistas citadas y middleware de roles.

## Diferencias y reglas adicionales pendientes

No se detectan por inspección incumplimientos explícitos de HU-14 en catálogo,
unicidad, mensaje o detach. Esto no equivale a tests aprobados.

ExamenController.index limita docentes a exámenes ligados con sus grupos.
HabilitacionController.index segmenta estudiantes por grupos propios, pero
muestra personal del examen completo; no aplica autorizarExamen para ese detalle.
PersonalControlController y su request solo validan rol, sin vínculo docente–examen.
Se consultó política del docente sin vínculo; no se exige rechazo ni autorización
universal como criterio confirmado. Casos positivos usan docentes vinculados y
examen compartido real. Alcance sobre examen ajeno queda documentado, pendiente.

Solapamiento de horarios no tiene regla HU ni validación de personal en código;
se consultó si se desea cubrirlo y el resultado. No se inventa un rechazo.
Selección vacía/ID inexistente son defensivos del contrato actual, no textos
obligatorios añadidos a HU-14. No se presenta concurrencia como cubierta por
la comprobación secuencial de duplicado.

## Datos independientes

Reset app_e2e añade dos docentes con grupos del examen principal compartido,
tres controles (incluido control del reset común), segundo examen con grupo del
primer docente y fechas/horas distintas. Ana habilitada/inscrita en grupo principal;
Bruno en grupo del otro docente con habilitación false. Principal con dos ambientes.
Todas las asignaciones parten vacías y se crean por endpoints/UI reales durante
cada caso; no se depende de ejecutar otra suite. Usuario sin vínculo no se usa
para aprobar una regla aún pendiente. State-hu14 solo SELECT de pivote y entidades
relevantes, con las mismas guardias pgsql/app_e2e/current_database antes de consulta.

## Matriz criterio → casos → datos → selectores reales

| Criterio | Casos/variantes | Datos | Selectores/endpoint y comprobación |
|---|---|---|---|
| Ubicación y acceso desde listado | HU14-01 admin/docente1/docente2 | examen compartido vinculado | .row-examen .col-asignatura, dblclick, .exam-title y .personal-seccion |
| Sección separada de estudiantes | HU14-02 | admin + habilitaciones reales | .personal-titulo, .data-table y ausencia .personal-seccion dentro de tabla |
| Control/estudiante/visitante excluidos | HU14-03 ×3 | relación creada antes del intento | detalle 403/redirect, controles ausentes, POST/DELETE reales 403/401, snapshot |
| Solo candidatos control | HU14-04 | todos los roles | valores exactos .personal-select option y exclusión de ids otros roles |
| Registro válido/persistencia | HU14-05 admin/docente1/docente2 | controlador candidato, docentes vinculados | POST observado, .personal-item, recarga, SELECT pivote; otras tablas iguales |
| Varios miembros por examen | HU14-06 | tres controles | tres POST UI reales, lista/opciones coherentes y pivotes exactos |
| Otros roles rechazados al manipular id | HU14-07 admin/docente × admin/docente/estudiante | ids reales ajenos al catálogo | POST 422, errors id_usuario, snapshot |
| Selección vacía UI | HU14-08 (adicional) | opción placeholder | .personal-btn y .personal-error exacto, ninguna escritura |
| ID vacío/inexistente endpoint | HU14-09 vacío/inexistente (adicional) | payload inválido | POST 422, errors campo, snapshot |
| Duplicado exacto sin dos relaciones | HU14-10 admin/docente | asignado oculto por selector | POST autenticado con CSRF 302, GET detalle Inertia errors exacto, SELECT único |
| Quitar preserva entidades y otras relaciones | HU14-11 admin/docente | control1 en dos exámenes, control2 principal | DELETE observado, lista/opciones, recarga, BD sin cambios laterales; login usuario conservado |
| Quitar/reasignar sin duplicados | HU14-12 | control1 | POST→DELETE→POST, opciones/contador/pivote único |
| Distintos exámenes/fechas | HU14-13 | control1 principal+segundo, control2 solo principal | detalles aislados, DELETE de uno conserva otro, BD |
| Sin personal asignado | HU14-14 | reset sin pivotes | .personal-vacio, contador 0, opciones control |
| Sin control disponible | HU14-15 | todos asignados mediante UI | .personal-nota, botón disabled, opciones solo placeholder, filas/BD |

Las variantes son casos independientes. Las peticiones observadas con intercept
no se sustituyen. Se verifica estado visible y persistencia, no solo toast.
Los primeros fallos bloquean aserciones posteriores: no se cuentan como aprobadas.
