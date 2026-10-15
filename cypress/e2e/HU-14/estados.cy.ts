import { data,page,controls,coherent,assign,exam,changed,unchanged } from './helpers.js'
describe('HU-14 Estados vacíos y coherencia', () => {
 it('HU14-14 sección sin personal muestra estado vacío y candidatos', () => { data().then((d) => { expect(d.assignments).to.have.length(0); page(d); coherent(d,[]); cy.get('.personal-vacio').should('be.visible').and('contain','Aun no se asigno personal de control a este examen.'); cy.get('.personal-btn').should('be.enabled'); unchanged(d) }) })
 it('HU14-15 al asignar todos no quedan opciones y registro se deshabilita', () => { data().then((d) => {
  page(d); const list = controls(d); list.forEach((u,i) => { assign(u,d); coherent(d,list.slice(0,i+1)) }); cy.get('.personal-select option').should('have.length',1); cy.get('.personal-btn').should('be.disabled'); cy.get('.personal-nota').should('be.visible').and('contain','No hay mas usuarios de control disponibles para este examen.'); cy.get('.personal-vacio').should('not.exist'); changed(d,list.map((u) => [exam(d).id_examen,u.id])); cy.reload(); coherent(d,list); cy.get('.personal-btn').should('be.disabled')
 }) })
})
