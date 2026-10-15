# HU-15 · revisión actual y matriz de ampliación

2026-10-11. README, guía Cypress, cuatro specs iniciales y resultados históricos
revisados. La línea base del 2026-10-05 (2 aprobados/8 fallidos) no es resultado actual.

## Evidencia actual

- StudentController.store crea estudiante y cuenta transaccionalmente: rol estudiante,
  username código, contraseña CI hasheada, debe_cambiar_password true. Cambio de
  contraseña vigente en CambiarPasswordController. Después devuelve dashboard,
  que todavía redirige estudiante a /mis-examenes. Login final no cumple panel exclusivo.
- Rutas /estudiante/panel, /estudiante/qr/regenerar y /estudiante/foto revisadas
  en routes/web.php:215-242. Panel bajo role estudiante/password.pendiente;
  acciones foto/QR bajo auth solamente y sus closures aún solo devuelven back().
- Panel entrega nombres/apellidos/código/ci/token, pero foto_path siempre null y
  no entrega foto_url. Vista Panel.vue no representa CI; imagen QR externa
  api.qrserver.com con data=token. Es imagen real de 300×300, no un decoder por URL.
- Estudiante.qrPayload todavía concatena ident:v1: con código; no hay generador
  aleatorio ni secreto. E2E puede demostrar predictibilidad/igualdad, no certificar
  criptográficamente entropía. La revisión del generador es evidencia complementaria.
- Foto: frontend JPG/PNG, límite inclusivo 2×1024×1024 bytes. No validación ni
  guardado backend activos. Se consultó política: fronteras se caracterizan como
  comportamiento frontend mientras no se confirme límite obligatorio del servidor.
- No se encontró activo/desactivar/reactivar en rutas, User ni UserController.
  Baja definitiva con relaciones protegidas y revocación de cuenta existente sigue
  implementada. HU15-10 se conserva byte por byte, sin hacerlo pasar por reactivación.

## Qué conservar, ajustar o separar

| Inicial | Decisión |
|---|---|
| 01 alta+contraseña+destino | Separar creación/credenciales, cambio obligatorio y destino después del cambio. Mantener todos los requisitos. |
| 02 login+identidad | Conservar destino exclusivo; identidad se visita directamente en casos independientes. |
| 03 URLs/enlaces en bucle | Un caso por URL para que dashboard no bloquee módulos restantes; enlaces en caso separado. |
| 04 autorregistro+edición | Separar ausencia de registro público, controles UI, rechazo de edición y de creación autenticada. |
| 05 responsive+decoder | Separar imagen/decodificación de responsive móvil/tablet y de sus acciones. No repetir decoder por viewport. |
| 06 token único+no predecible | Separar unicidad de token y predictibilidad. Comparar siempre con BD; decoder no depende de esas pruebas. |
| 07 regeneración+invalidación | Separar persistencia/recarga, invalidación mediante HU-11 y segunda regeneración. Mantener comparación estricta. |
| 08 JPG→PNG→control | JPG/PNG independientes, cada uno reemplaza una foto previa; referencia HU-11 separada con foto de fixture persistida. |
| 09 formato+tamaño+servidor | Casos independientes para UI y HTTP multipart real; foto previa/archivos sin cambios. Fronteras separadas y etiquetadas. |
| 10 baja | Conservar archivo completo y reset original; Bruno sin relaciones. |

## Datos y protección

Nuevos casos usan reset-hu15: baseline independiente con Ana/Bruno y fotos distintas
copiadas únicamente al volumen /var/www/storage; cuentas del baseline para inspección de roles.
HU15-10 conserva reset/state originales. state-hu15 solo lee estudiantes/cuentas,
relaciones y hashes/lista de archivos públicos en storage aislado; nunca expone
hashes de contraseña. Comprueba si la contraseña temporal coincide con CI mediante
Hash::check. No elimina archivos previos ni depende del orden de suites.

PNG de frontera son imágenes válidas con chunk auxiliar tEXt y CRC correcto,
no texto renombrado: 2097151, 2097152 y 2097153 bytes. JPG/PNG pequeños ya existentes
son imágenes reales. Ningún rechazo debe alterar BD o guardar nuevos archivos.

## Matriz criterio → existente → faltante → datos → selectores reales

| Criterio | Inicial | Ampliación | Datos/selectores/endpoints reales |
|---|---|---|---|
| Alta administrativa/cuenta temporal | 01 amplio | 01 aislado | #nombres/#apellidos/#codigo_universitario/#documento_identidad/#email, POST /estudiantes, cuenta BD rol/flag/Hash::check |
| Cambio obligatorio y destino final | 01 bloqueado | 11 cambio, 12 destino | /cambiar-password, .form-cambiar inputs, POST real; credencial temporal/nueva |
| Login exclusivo | 02 | 02 solo destino | /login, pathname /estudiante/panel |
| Módulos prohibidos | 03 bucle | 03 cada URL | rutas reales dashboards/listados/Mis Exámenes/panel-asistencia; 403 o panel permitido |
| Sin enlaces ajenos | 03 | 16 separado | enlaces del documento del panel |
| No autorregistro | 04 | 04 aislado + 17 creación autenticada | GET/POST /register son sondas ausentes, POST /estudiantes y /usuarios rechazados; BD |
| Identidad propia completa | 02 bloqueado | 13 nombre/apellido/código por alumno, 14 CI por alumno | .student-name/.student-code-badge/.credential-card |
| Sin edición | 04 | 18 UI y 19 peticiones | sin inputs de identidad; PUT /estudiantes/{id}, PUT /usuarios/{id}, BD intacta |
| QR/foto propios | parcial 02/06 | 20 ×2 | visitar panel con parámetro id ajeno (ruta ignora query), token persistido propio, avatar propio; estudiante distinto fuera |
| Imagen QR vigente/decoder real | 05 bloqueado | 05 imagen + decoder | .qr-image, naturalWidth/alto, decoder jsQR del PNG descargado; comparar codigo_qr BD |
| Tokens distintos | 06 bloqueado | 06 unicidad | Ana/Bruno BD y referencias del panel |
| Token no predecible | 06 | 21 independiente | contra CI/código/qrPayload; inspección generador, límite E2E |
| Regenerar funcional/persistente | 07 | 07 solo cambio/recarga | .btn-regenerar, POST /estudiante/qr/regenerar, BD y URL vigente |
| Viejo inválido/nuevo válido | 07 bloqueado | 22 independiente | endpoint /registro-ingreso/validar con CSRF como control, sin guardar check-in |
| Segunda regeneración | no | 23 | dos POST reales y resolución vieja/nueva por HU-11 |
| Autorización de acciones | no | 24 QR/foto con id ajeno, 25 visitante QR/foto | mismos endpoints existentes, parámetros no deben cambiar otro estudiante; HTTP multipart para foto |
| JPG/PNG válidos y persistencia | 08 amplio | 08 JPG/PNG | input[type=file], POST foto observado, avatar.src persistido y recarga, BD/archivo |
| Reemplazo | 08 bloqueado | 08 JPG/PNG con foto previa real (sin caso redundante) | fixture previa distinta; solo perfil propio cambia |
| Referencia en verificación | 08 bloqueado | 27 API+UI | foto fixture BD, control HU-11 .foto-perfil, naturalWidth y src exacto |
| UI formato/tamaño inválido | 09 | 09 formato/tamaño | .file-error-msg, no POST, foto previa y archivos iguales |
| Backend formato/tamaño inválido | 09 bloqueado | 28 formato; tamaño pendiente de política | fetch FormData real, 422/error foto, BD/archivos iguales; tamaño caracterización pendiente |
| Fronteras | no | 29 debajo/exacto/encima | PNG válidos ±1 byte del límite frontend; observar envío/rechazo, sin pretender contrato servidor confirmado |
| Baja con cookies previas | 10 aprobado histórico | 10 intacto | Bruno sin relaciones, DELETE /estudiantes/{id}, cookies restauradas y nuevo login rechazado |
| Desactivar/reactivar | no | Pendiente, no implementado | mecanismo ausente; se consultó sesión tras reactivación |
| Responsive identidad/QR/controles | 05 móvil bloqueó tablet | 30 layout y CI separados en móvil/tablet | 390×844 y 768×1024, ancho documento y controles utilizables; sin decoder aquí |
| Responsive subida y regeneración | no | 31 foto y 32 QR móvil/tablet | POST real observado, BD; casos separados para no bloquearse entre acciones |

La legibilidad se comprueba con imagen real cargada, dimensiones positivas y
resolución nativa suficiente; el decoder certifica lectura de ese PNG, no facilidad
con cualquier cámara física. No se inventa un tamaño mínimo obligatorio de la HU.
Infraestructura QR externa tiene errores explícitos de servicio/red/PNG y se
clasifica aparte de token incorrecto o layout. No se simulan respuestas.
