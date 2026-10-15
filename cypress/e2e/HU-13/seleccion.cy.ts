import { data,page,select,exam,lists,unchanged,checkin,pivot } from './helpers.js'
describe('HU-13 Selección', () => {
 it('HU13-05 selecciona examen en curso y muestra su asistencia', () => { data().then((d) => { page(d); cy.get('.aviso').should('contain','Seleccione un examen'); select(d); cy.get('.estado-chip').should('contain','Actualizacion automatica activa'); lists(d,d); unchanged(d) }) })
 it('HU13-06 caracteriza catálogo que incluye futuro lejano sin ventana de próximo definida', () => { data().then((d) => { page(d); cy.get('.selector select option').should('contain','Futuro lejano HU13'); select(d,'Futuro lejano HU13'); lists(d,d,'Futuro lejano HU13'); unchanged(d) }) })
 it('HU13-07 cambiar examen sustituye listas, ambientes y contadores sin mezcla', () => { data().then((d) => {
  checkin(d).then(() => checkin(d,'Elena',pivot(d,'Otro HU13'))).then((s) => { page(d); select(d); lists(d,s); select(d,'Otro HU13'); lists(d,s,'Otro HU13'); cy.get('.ambiente-card').should('have.length',1).and('contain','Otro HU13 Aula'); cy.get('.selector select').should('have.value',String(exam(d,'Otro HU13').id_examen)) })
 }) })
})
