# Reportes HU-10

Ejecución aportada: **31 casos, 24 aprobados y 7 fallidos**, sin pendientes ni omitidos. Duración **6 min 17 s**. Fuente: salida completa de Cypress compartida por el usuario; no se reejecutó la suite.

| Reporte | Título | Casos fallidos | Clasificación |
|---|---|---:|---|
| [CS17](CS17.md) | Mensaje de duplicado en el mismo grupo sin tilde | 1: HU10-09 | Incumplimiento del mensaje HU-10 |
| [CS18](CS18.md) | Mensaje de otro grupo sin tildes | 2: HU10-10 y HU10-11 | Incumplimiento del mensaje HU-10 |
| [CS19](CS19.md) | ID no entero causa HTTP 500 | 1: HU10-13 no entero | Validación defensiva adicional |
| [CS20](CS20.md) | CSRF 419 bloquea la comprobación de roles | 3: HU10-02 | Investigación; causa pendiente |
| **Total** | **4 reportes; no equivalen a 7 defectos distintos** | **7** | |

Prioridad y severidad son propuestas de triaje. Los mensajes incorrectos no demuestran inscripciones indebidas; las pruebas de mensajes alcanzaron la comprobación de integridad antes de fallar. En CS19 y CS20 las comprobaciones posteriores quedaron bloqueadas.

[Títulos de los 24 aprobados y 7 fallidos](../../cypress/HU-10-ejecucion-detallada.md).
