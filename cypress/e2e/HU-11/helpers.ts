import { csrf, type Student } from '../../support/commands.js'
export interface Pivot { id_examen_ambiente: number; id_examen: number; id_ambiente: number }
export interface Entry extends Pivot {
  id_registro: number; id_estudiante: number; id_usuario: number;
  fecha_hora_ingreso: string; ingreso_epoch: number; hora_mensaje: string;
}
export interface Hu11Data {
  server_epoch: number; students: Student[];
  users: { id: number; email: string; role: string }[];
  exams: { id_examen: number; title: string }[];
  rooms: { id_ambiente: number; nombre_ambiente: string }[];
  pivots: Pivot[];
  habilitations: { id_habilitacion: number; id_estudiante: number; id_examen: number; estado_habilitado: boolean; motivo_inhabilitacion: string | null }[];
  records: Entry[];
}
export const data = () => cy.get<Hu11Data>('@data')
export const state = () => cy.task<Hu11Data>('database', 'state-hu11')
export const unknown = 'No se encontró ningún estudiante con ese dato'
export const disabled = 'El estudiante no está habilitado para rendir este examen'
export const duplicate = (r: Entry) => `Este estudiante ya registró su ingreso a este examen a las ${r.hora_mensaje}`
export const actor = (d: Hu11Data, role = 'personal de control de ingreso') => d.users.find((u) => u.role === role)!
export const student = (d: Hu11Data, name = 'Ana') => d.students.find((s) => s.nombres === name)!
export const exam = (d: Hu11Data, title = 'Verificación HU11') => d.exams.find((e) => e.title === title)!
export function pivot(d: Hu11Data, title = 'Verificación HU11', room = 'Aula Norte HU11') {
  return d.pivots.find((p) => p.id_examen === exam(d, title).id_examen && p.id_ambiente === d.rooms.find((r) => r.nombre_ambiente === room)!.id_ambiente)!
}
export const control = () => { cy.login('control.e2e@example.test'); cy.visit('/registro-ingreso') }
export function select(label: string) {
  return cy.contains('.registro-wrapper label', label).invoke('attr', 'for').then((id) => cy.get<HTMLSelectElement>(`#${id}`))
}
export const input = () => cy.get('.registro-wrapper input[placeholder="Escanear o escribir..."]')
export function start(d: Hu11Data, p = pivot(d)) {
  select('EXAMEN ACTIVO').select(String(p.id_examen))
  select('AMBIENTE').select(String(p.id_examen_ambiente))
  cy.contains('.registro-wrapper button', 'INICIAR REGISTRO').click()
  input().should('be.visible')
}
let serial = 0
export function verify(term: string, status = 200, reader = false) {
  const alias = `hu11Validate${++serial}`
  cy.intercept('POST', '**/registro-ingreso/validar').as(alias)
  input().clear().type(term, { parseSpecialCharSequences: false })
  if (reader) input().type('{enter}')
  else cy.contains('.registro-wrapper button', /^BUSCAR$/).click()
  return cy.wait(`@${alias}`).then((r) => {
    expect(r.response?.statusCode, 'respuesta real de verificación').to.eq(status)
    return r.response!.body as { id_estudiante?: number; error?: string }
  })
}
export function confirm() {
  const alias = `hu11Store${++serial}`
  cy.intercept('POST', '**/registro-ingreso').as(alias)
  cy.contains('.confirmacion-box button', 'Confirmar ingreso').click()
  return cy.wait(`@${alias}`).then((r) => expect(r.response?.statusCode).to.eq(200))
}
export function request(url: string, body: Cypress.RequestBody) {
  return csrf().then((token) => cy.request({ method: 'POST', url, body,
    headers: { 'X-CSRF-TOKEN': token!, Accept: 'application/json' },
    failOnStatusCode: false, followRedirect: false,
  }))
}
export const payload = (d: Hu11Data, p = pivot(d), name = 'Ana') => ({ id_estudiante: student(d, name).id_estudiante, id_examen_ambiente: p.id_examen_ambiente })
export function snapshot(s: Hu11Data) {
  const { server_epoch: _time, ...rest } = s
  return rest
}
export function unchanged(d: Hu11Data) {
  return state().then((s) => expect(snapshot(s)).to.deep.eq(snapshot(d)))
}
export function persisted(d: Hu11Data, before: Hu11Data, after: Hu11Data, p: Pivot, name = 'Ana', role = 'personal de control de ingreso') {
  expect(after.records).to.have.length(before.records.length + 1)
  const r = after.records.find((r) => !before.records.some((old) => old.id_registro === r.id_registro))!
  expect(r.id_estudiante).to.eq(student(d, name).id_estudiante)
  expect(r.id_examen_ambiente).to.eq(p.id_examen_ambiente)
  expect(r.id_examen).to.eq(p.id_examen)
  expect(r.id_ambiente).to.eq(p.id_ambiente)
  expect(r.id_usuario).to.eq(actor(d, role).id)
  expect(r.ingreso_epoch, 'hora entre lecturas del servidor, precisión segundos').to.be.at.least(before.server_epoch).and.at.most(after.server_epoch)
  expect(after.records.filter((entry) => entry.id_registro !== r.id_registro)).to.deep.eq(before.records)
  expect(snapshot({ ...after, records: d.records }), 'datos de base sin cambios').to.deep.eq(snapshot(d))
  return r
}
export function photo(d: Hu11Data, name = 'Ana') {
  const s = student(d, name)
  cy.get('.nombre-estudiante').should('have.text', `${s.nombres} ${s.apellidos}`)
  cy.get<HTMLImageElement>('.foto-perfil').should('be.visible').and('have.attr', 'src', s.foto_url!).should(($img) => expect($img[0].naturalWidth).to.be.greaterThan(0))
}
export function widthFits() {
  cy.document().then((doc) => expect(doc.documentElement.scrollWidth, 'sin desbordamiento horizontal').to.be.at.most(doc.defaultView!.innerWidth))
}
export const rejectionCases: [string, string][] = [
  ['Carla', 'Documentación incompleta HU11'], ['Diego', disabled], ['Gina', disabled], ['Elena', disabled], ['Fabio', disabled],
]
