import { data,page,lists,unchanged } from './helpers.js'
describe('HU-13 Cierre observable por horario implementado', () => {
 it('HU13-19 examen finalizado por reloj PHP muestra cierre y asistencia existente', () => { data().then((d) => { page(d,'Cerrado HU13'); cy.get('.estado-chip').should('contain','Examen cerrado'); cy.get('.estado-detalle').should('contain','Se muestra el estado final de asistencia.'); cy.get('.estado-barra button').should('not.exist'); lists(d,d,'Cerrado HU13'); unchanged(d) }) })
 it('HU13-20 examen ya cerrado no refresca durante dos intervalos reales del polling', () => { data().then((d) => {
  let refreshes = 0
  cy.intercept('GET','**/panel-asistencia*',(req) => { if (req.headers['x-inertia-partial-data']) refreshes++ })
  page(d,'Cerrado HU13'); cy.get('.estado-chip').should('contain','Examen cerrado')
  // La carga inicial terminó y no hay consultas parciales en vuelo. La ventana deriva del código.
  cy.window().then({ timeout: d.poll_interval_ms*3 }, (win) => new Cypress.Promise<void>((resolve) => win.setTimeout(resolve,d.poll_interval_ms*2)))
  cy.then(() => expect(refreshes,'consultas automáticas de panel cerrado').to.eq(0)); unchanged(d)
 }) })
})
