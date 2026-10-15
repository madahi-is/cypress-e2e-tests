import { data, page, unchanged } from './helpers.js'
describe('HU-12 Sin incidencias', () => {
 it('HU12-17 listado vacío permite abrir registro', () => {
  data().then((d) => { expect(d.records).to.have.length(0); page(d); cy.get('.empty-state').should('be.visible').invoke('text').should('satisfy', (s: string) => s.trim() === 'No hay incidencias registradas.'); cy.get('.incidencia-card, .pagination').should('not.exist'); cy.get('.btn-reportar').should('be.enabled'); unchanged(d) })
 })
})
