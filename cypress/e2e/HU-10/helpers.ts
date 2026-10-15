import { csrf } from '../../support/commands.js'
import { group as hu9Group, type Hu9Data } from '../HU-9/helpers.js'

export type Hu10Data = Hu9Data
export const duplicate = 'El estudiante ya está inscrito en este grupo'
export const otherGroup = 'El estudiante ya está inscrito en otro grupo de esta asignatura para esta gestión'
export const data = () => cy.get<Hu10Data>('@data')
export const state = () => cy.task<Hu10Data>('database', 'state-hu10')
export const mathGroup = (d: Hu10Data, name = 'A') => hu9Group(d, name)
export function physicsGroup(d: Hu10Data) {
  const subject = d.subjects.find((s) => s.nombre_asignatura === 'Física HU9')!
  return d.groups.find((g) => g.id_asignatura === subject.id_asignatura && g.gestion === '2026-2' && g.nombre_grupo === 'A')!
}
export const student = (d: Hu10Data, code = '202610101') => d.students.find((s) => s.codigo_universitario === code)!
export const detailUrl = (id: number) => `/grupos/${id}`
export const enrollUrl = (id: number) => `${detailUrl(id)}/inscripciones`
export const deleteUrl = (groupId: number, enrollmentId: number) => `${enrollUrl(groupId)}/${enrollmentId}`
export const admin = () => cy.login('admin.e2e@example.test')
export function detail(id: number) {
  cy.visit(detailUrl(id))
  cy.get('.grupo-titulo').should('be.visible')
}
let searchSerial = 0
export function search(term: string, enter = false) {
  cy.get('.buscador input').clear().type(term)
  // Observa la petición real para esperar el nuevo resultado; no intercepta respuestas de éxito.
  const alias = `hu10Search${++searchSerial}`
  cy.intercept('GET', '**/grupos/*?busqueda=*').as(alias)
  if (enter) cy.get('.buscador input').type('{enter}')
  else cy.contains('.buscador button', /^Buscar$/).click()
  cy.wait(`@${alias}`).its('response.statusCode').should('eq', 200)
}
export const result = (code: string) => cy.contains('.resultado-item .resultado-codigo', code).closest('.resultado-item')
export const row = (code: string) => cy.contains('.data-table tbody td[data-label="Codigo"]', code).closest('tr')
export const resultCodes = () => cy.get('.resultado-codigo').then(($items) => [...$items].map((i) => i.textContent!.trim()).sort())
export const listedCodes = () => cy.get('.data-table tbody td[data-label="Codigo"]').then(($cells) => [...$cells].map((i) => i.textContent!.trim()).sort())
export function request(method: string, url: string, body?: Cypress.RequestBody) {
  return csrf().then((token) => cy.location('href').then((referer) => cy.request({
    method, url, body, failOnStatusCode: false, followRedirect: false,
    headers: { 'X-CSRF-TOKEN': token!, Accept: 'application/json', Referer: referer },
  })))
}
export const unchanged = (d: Hu10Data) => state().should('deep.eq', d)
export function added(d: Hu10Data, pairs: [number, number][]) {
  return state().then((s) => {
    const existingIds = new Set(d.enrollments.map((i) => i.id_inscripcion))
    const additions = s.enrollments.filter((i) => !existingIds.has(i.id_inscripcion))
    const key = ([g, studentId]: [number, number]) => `${g}:${studentId}`
    expect(additions.map((i) => key([i.id_grupo, i.id_estudiante])).sort(), 'inscripciones nuevas exactas')
      .to.deep.eq(pairs.map(key).sort())
    expect(s.enrollments.filter((i) => existingIds.has(i.id_inscripcion)), 'inscripciones anteriores intactas').to.deep.eq(d.enrollments)
    expect({ ...s, enrollments: d.enrollments }, 'estudiantes, grupos y demás entidades intactos').to.deep.eq(d)
    return s
  })
}
export const removed = (d: Hu10Data, id: number) => unchanged({ ...d, enrollments: d.enrollments.filter((i) => i.id_inscripcion !== id) })
export function drop(code: string) {
  row(code).contains('button', /^Dar de baja$/).click()
  cy.contains('.modal-container .modal-footer button', /^Dar de baja$/).click()
  cy.get('.modal-container').should('not.exist')
}
export function rejected(d: Hu10Data, groupId: number, studentId: number, message: string) {
  request('POST', enrollUrl(groupId), { id_estudiante: studentId }).then((r) => {
    expect(r.status, 'rechazo de Laravel').to.eq(422)
    expect(r.body.errors).to.have.property('id_estudiante')
    // Comprueba primero integridad; el fallo de tildes no debe ocultar una mutación.
    unchanged(d).then(() => expect(r.body.errors.id_estudiante[0], 'mensaje exacto HU-10').to.eq(message))
  })
}
