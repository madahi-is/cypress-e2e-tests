import { csrf, type Student } from '../../support/commands.js'
export interface Group {
  id_grupo: number; id_asignatura: number; id_usuario: number; gestion: string; nombre_grupo: string;
}
export interface Hu9Data {
  groups: Group[];
  subjects: { id_asignatura: number; nombre_asignatura: string }[];
  users: { id: number; name: string; username: string; role: string }[];
  students: Student[];
  enrollments: { id_inscripcion: number; id_grupo: number; id_estudiante: number }[];
  examGroups: { id_examen_grupo: number; id_examen: number; id_grupo: number }[];
  habilitations: { id_habilitacion: number; id_estudiante: number; id_examen: number }[];
}
export const duplicate = 'Ya existe un grupo con ese nombre para esa asignatura en esa gestión'
export const blocked = 'No se puede eliminar el grupo porque tiene estudiantes inscritos'
export const data = () => cy.get<Hu9Data>('@data')
export const state = () => cy.task<Hu9Data>('database', 'state-hu9')
export const admin = () => { cy.login('admin.e2e@example.test'); cy.visit('/grupos') }
export function group(d: Hu9Data, name = 'A') {
  const subject = d.subjects.find((s) => s.nombre_asignatura === 'Matemática HU9')!
  return d.groups.find((g) => g.id_asignatura === subject.id_asignatura && g.gestion === '2026-2' && g.nombre_grupo === name)!
}
export function payload(d: Hu9Data) {
  return { id_asignatura: d.subjects.find((s) => s.nombre_asignatura === 'Vacía HU9')!.id_asignatura,
    id_usuario: d.users.find((u) => u.username === 'docente1.e2e')!.id,
    gestion: '2026-2', nombre_grupo: 'Nuevo' }
}
// Labels sin for: se resuelve el contenedor existente, sin fabricar IDs.
export const field = (label: string) => cy.contains('.modal-container .form-label', label).parent().find('input, select')
export const filter = (label: string) => cy.contains('.filtro-campo label', label).parent().find('select')
export const row = (id: number) => cy.get(`.data-table a[href="/grupos/${id}"]`).closest('tr')
export function fill(body: ReturnType<typeof payload>) {
  field('Asignatura').select(String(body.id_asignatura))
  field('Docente').select(String(body.id_usuario))
  field('Gestion').clear().type(body.gestion)
  field('Nombre del grupo').clear().type(body.nombre_grupo)
}
export function request(method: string, url: string, body?: Cypress.RequestBody) {
  return csrf().then((token) => cy.request({ method, url, body,
    headers: { 'X-CSRF-TOKEN': token!, Accept: 'application/json' },
    failOnStatusCode: false, followRedirect: false,
  }))
}
export const unchanged = (d: Hu9Data) => state().should('deep.eq', d)
export function created(body: ReturnType<typeof payload>) {
  state().then((s) => expect(s.groups.filter((g) => g.id_asignatura === body.id_asignatura &&
    g.id_usuario === body.id_usuario && g.gestion === body.gestion && g.nombre_grupo === body.nombre_grupo)).to.have.length(1))
}
export function remove(id: number) {
  row(id).contains('button', /^Eliminar$/).click()
  cy.get('.modal-container').contains('.modal-footer button', /^Eliminar$/).click()
}
export function expectBlocked(d: Hu9Data, id: number) {
  remove(id)
  cy.get('.toast.error span').should('have.text', blocked)
  cy.get('.modal-container').should('not.exist')
  unchanged(d)
  cy.reload()
  row(id).should('exist')
}
export function ids() {
  return cy.get('.data-table tbody a.btn-ver').then(($a) => [...$a].map((a) => Number(a.getAttribute('href')!.split('/').pop())))
}
