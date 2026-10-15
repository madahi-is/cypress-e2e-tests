import { independentCheckin } from './cypress/support/hu13-session.js'
import { defineConfig } from 'cypress'
import { execFileSync } from 'node:child_process'
import { createRequire } from 'node:module'
const jsQR = createRequire(import.meta.url)('jsqr') as
  (data: Uint8ClampedArray, width: number, height: number) => { data: string } | null
import { PNG } from 'pngjs'
import { fileURLToPath } from 'node:url'
import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'

const databaseHelper = fileURLToPath(new URL('./cypress/support/database.php', import.meta.url))

export default defineConfig({
  e2e: {
    baseUrl: process.env.E2E_BASE_URL || 'http://localhost:8082',
    specPattern: 'cypress/e2e/**/*.cy.ts',
    supportFile: 'cypress/support/e2e.ts',
    setupNodeEvents(on) {
      on('after:run', (results) => {
        const target = process.env.E2E_RESULTS_FILE
        if (target) {
          const path = resolve(target)
          mkdirSync(dirname(path), { recursive: true })
          writeFileSync(path, JSON.stringify(results, null, 2) + '\n')
        }
      })
      on('task', {
        database(action: string) {
          if (!['reset', 'state', 'reset-hu9', 'state-hu9', 'reset-hu10', 'state-hu10', 'reset-hu11', 'state-hu11', 'reset-hu12', 'reset-hu12-empty', 'state-hu12', 'reset-hu13', 'state-hu13', 'reset-hu14', 'state-hu14', 'reset-hu15', 'state-hu15'].includes(action)) throw new Error('Acción E2E inválida')
          return JSON.parse(execFileSync('php', [databaseHelper, action], {
            env: { ...process.env, E2E_DB_DATABASE: 'app_e2e' }, encoding: 'utf8',
          }))
        },
        async hu13Checkin(input: { id_estudiante: number; id_examen: number; id_examen_ambiente: number; dato: string }) {
          // Comprueba también la conexión real antes de escribir mediante HTTP.
          execFileSync('php', [databaseHelper, 'state-hu13'], { env: { ...process.env, E2E_DB_DATABASE: 'app_e2e' } })
          return independentCheckin(process.env.E2E_BASE_URL || 'http://localhost:8082', input)
        },
        async decodeQr(url: string) {
          const parsed = new URL(url)
          if (parsed.hostname !== 'api.qrserver.com' || parsed.protocol !== 'https:') {
            throw new Error('Origen QR inesperado')
          }
          const response = await fetch(url, { signal: AbortSignal.timeout(15000) }).catch((error) => { throw new Error(`Infraestructura QR externa: red/timeout (${String(error)})`) })
          if (!response.ok) throw new Error(`Infraestructura QR externa: HTTP ${response.status}`)
          const bytes = Buffer.from(await response.arrayBuffer())
          let png: ReturnType<typeof PNG.sync.read>
          try { png = PNG.sync.read(bytes) } catch (error) { throw new Error(`Infraestructura QR externa: PNG inválido (${String(error)})`) }
          const qr = jsQR(new Uint8ClampedArray(png.data), png.width, png.height)
          if (!qr) throw new Error('La imagen no contiene un QR decodificable')
          return qr.data
        },
      })
    },
  },
  video: false,
  screenshotOnRunFailure: true,
})
