# HU-10 · análisis previo y matriz de cobertura

Fecha: 2026-10-10. Requisitos: texto completo HU-10 proporcionado por el usuario.
Este análisis y la propuesta se prepararon antes de escribir los tests.

## Código inspeccionado y diferencias

- Rutas `routes/web.php:111-121`: GET `/grupos/{grupo}`, POST
  `/grupos/{grupo}/inscripciones` y DELETE
  `/grupos/{grupo}/inscripciones/{inscripcion}` dentro de auth,
  password.pendiente y role:administrador. `EnsureUserHasRole` deniega otros
  roles con 403; también hay autorización en controller/request.
- `InscripcionController::show`: búsqueda recortada, coincidencia parcial ILIKE
  sobre código/nombres/apellidos, escape de comodines, excluye inscritos del
  grupo actual, máximo 20 disponibles; lista inscritos del grupo con estudiante,
  orden por id_inscripcion y paginate(15), conservando busqueda en enlaces.
- `StoreInscripcionRequest`: id_estudiante obligatorio, entero, existente;
  rechazo si ya está en el mismo grupo o en otro de la misma asignatura/gestión.
  La segunda regla no restringe otras asignaturas.
- **Incumplimientos textuales por inspección:** devuelve
  `El estudiante ya esta inscrito en este grupo` y
  `El estudiante ya esta inscrito en otro grupo de esta asignatura para esta gestion`.
  HU exige **está** y **gestión**. Las aserciones mantienen los textos exactos
  de HU-10. Se verifica también que el rechazo no haya mutado datos.
- `destroy` valida que la inscripción pertenezca al grupo de la URL (404 si no),
  elimina solo esa inscripción en una transacción. Modelos Grupo/Estudiante
  tienen hasMany de inscripciones; no se llama a borrar estudiante ni grupo.
- Migración de inscripcion: FK estudiante/grupo y unique(estudiante,grupo).
  La regla entre distintos grupos está en el request, no en esa restricción DB.
- Vista `Admin/Grupos/Detalle.vue`: búsqueda, resultados con botón Inscribir,
  toast de rechazo, tabla Código/Nombres/Apellidos y botones de baja con modal;
  paginación Anterior/Siguiente. Index.vue proporciona enlaces Ver inscritos.
  Layout muestra Grupos únicamente al administrador.
- Se revisaron Modal.vue, ToastContainer.vue, HandleInertiaRequests y los tests
  Feature de inscripciones como contexto. Estos últimos no exigen los mensajes
  con tildes y no sustituyen HU-10. No se ejecutan contra app_testing.
- No se exige que el buscador oculte estudiantes de otros grupos: actualmente
  aparecen y el servidor rechaza la inscripción; se cubre ese flujo real.
- No hay otras diferencias funcionales confirmadas por ejecución. Acceso,
  persistencia, búsqueda y baja se valoran por tests reales cuando Podman permita
  ejecutarlos. El defecto de alta semestral de HU-9 no cambia los criterios HU-10.

## Preparación independiente

Cada caso ejecuta reset-hu10: reset común → seedHu9() → seedHu10(). No depende
de correr HU-9 antes. seedHu9 y las suites anteriores se conservan sin cambios.
Se reutilizan Matemática/Física, grupos A/B/C, docentes y alumnos de HU-9.

Fixtures adicionales exclusivos de HU-10:

- Lucía Mamani Quispe (202610101) y Lucía Rojas (202610102), inicialmente libres.
- 16 alumnos Lista/Alumno Uno..Dieciseis (202610001..202610016), inscritos en P01.
- Bruno está en B/Matemática y también A/Física en la misma gestión 2026-2;
  esto permite verificar que la baja respeta su otra inscripción.
- A/Matemática queda vacío. C contiene a Ana y conserva su vínculo a examen.
- Todos los IDs proceden del estado preparado, sin asumir secuencias.

Los grupos semestrales son fixtures de aceptación cargados solo en app_e2e.
No se presenta su inserción como éxito del formulario de alta de HU-9.
Los snapshots incluyen estudiantes, grupos, usuarios, inscripciones, asignaturas,
examen_grupo y habilitaciones, para comprobar escrituras y bajas sin daños laterales.

## Matriz criterio → casos → datos → selectores reales

Los sufijos denotan tests independientes; la cifra final se obtiene del inventario.

| Criterio | Casos propuestos | Datos | Selectores/peticiones reales |
|---|---|---|---|
| Administrador accede desde interfaz | HU10-01 | Admin, B/Bruno | `.sidebar-nav a[href="/grupos"]`, enlace `/grupos/{id}` Ver inscritos, `.grupo-titulo`, `.buscador`, botón Dar de baja |
| Otros roles no acceden al detalle ni operaciones | HU10-02 docente/control/estudiante | Docente responsable, control, Bruno intentando acceder a su propio grupo | Menú/enlaces ausentes; GET con búsqueda, POST y DELETE con CSRF → 403, navegación por URL sin detalle y sin controles, snapshot intacto |
| Sin sesión no accede ni modifica | HU10-03 | Visitante, B/Bruno | GET/POST/DELETE JSON → 401 con CSRF válido obtenido en login; URL → login; snapshot |
| Búsqueda por código/nombre/apellido | HU10-04 código/nombre/apellido | Código Lucía Mamani, nombre Lucía (dos resultados), apellido Mamani Quispe | `.buscador input`, botón Buscar/Enter, `.resultado-codigo`, `.resultado-nombre`, GET JSON disponibles, recarga |
| Búsqueda sin resultados | HU10-05 | Término inexistente | `.sin-resultados`, `.resultado-item` ausente, snapshot |
| Limpiar búsqueda | HU10-06 (complementario) | B con Bruno, término Lucía | botón Limpiar, input, query, listado conservado |
| Inscripción válida persistente | HU10-07 UI; HU10-08 endpoint | Lucía libre → A/Matemática | `.resultado-item` por código, Inscribir, fila por `td[data-label="Codigo"]`, recarga, POST real y snapshot exacto de alta |
| Duplicado mismo grupo y mensaje HU exacto | HU10-09 | Bruno ya inscrito en B | UI no ofrece Inscribir para Bruno; POST al endpoint con CSRF → 422; error `id_estudiante` exacto; snapshot intacto |
| Otro grupo misma asignatura/gestión y mensaje HU exacto | HU10-10 UI; HU10-11 endpoint | Bruno en B; intento en A/Matemática, gestión 2026-2 | resultado Bruno → Inscribir → `.toast.error span` exacto; POST JSON 422 con texto exacto; snapshot |
| Permitir distintas asignaturas simultáneamente | HU10-12 | Lucía → A/Matemática y A/Física, ambas 2026-2 | Dos inscripciones por UI; tabla tras recargas y snapshot con ambos vínculos |
| Validaciones de estudiante (defensivo) | HU10-13 ausente/inexistente/no entero | Payload inválido | POST JSON 422 y errores por campo; datos sin cambios |
| Listar código, nombre, apellidos | HU10-14 | B/Bruno | `.data-table th`, `td[data-label="Codigo"]`, `Nombres`, `Apellidos`; datos reales y recarga |
| Paginación sin omisiones/duplicados | HU10-15 | P01 con 16 alumnos y búsqueda Lucía | `.page-info`, Anterior/Siguiente, códigos de ambas páginas, query mantenida, recarga y vuelta |
| Estado vacío | HU10-16 | A/Matemática | `.empty-state`, sin filas de alumnos ni paginación, Inscritos: 0 |
| Límite de página (implementación) | HU10-17 | Baja de un alumno P01 deja exactamente 15 | DELETE real, recarga, tabla completa y sin paginación; snapshot preserva alumnos/grupo |
| Baja UI sin borrar estudiante/grupo/otros vínculos | HU10-18 | Bruno con dos inscripciones y otros alumnos | Dar de baja → `.modal-container` → confirmación; vacío y recarga; snapshot difiere solo en la inscripción elegida; otro grupo conserva a Bruno |
| Baja directa coherente | HU10-19 | Mismos vínculos Bruno | DELETE autenticado/CSRF; snapshot y recarga |
| No borrar inscripción de otro grupo mediante URL | HU10-20 (defensivo) | Inscripción B, URL A | DELETE → 404, snapshot |
| Grupo inexistente | HU10-21 GET/POST/DELETE (defensivo) | ID por encima del máximo | Endpoint real 404, snapshot |
| Inscripción inexistente | HU10-22 (defensivo) | B + ID inexistente | DELETE → 404, snapshot |
| Cancelar baja | HU10-23 (complementario) | B/Bruno | `.modal-footer` Cancelar, fila permanece al recargar, snapshot |

## Alcance e información no supuesta

Los dos mensajes de aceptación se comparan literalmente. El resto de errores
se comprueba por estado/campo y conservación de datos; no se inventan mensajes HU.
La cifra 15 y el límite de 20 resultados provienen de la implementación, no de la HU.
Se prueba la frontera 15/16 del listado; no se atribuye un máximo de inscritos.
No se añade una regla sobre distintas gestiones, nombre completo como frase,
normalización de acentos, límites de búsqueda o efectos de baja en habilitaciones
futuras: no están especificados aquí. No se cambia la vista para probar rechazos.
Los criterios solicitados permiten implementar estos casos sin aclaración adicional.

## Verificación prevista

TypeScript de todas las suites; HU-10 y después HU-9/HU-15 de forma secuencial,
aun si una suite falla. Comparación de hashes de los specs/helpers anteriores.
En esta sesión, la consulta inicial de Podman ya falló por libpod de solo lectura;
los resultados de ejecución se documentarán sin confundir bloqueo con fallo HU.
