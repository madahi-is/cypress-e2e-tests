import { data,page,poll,checkin,pivot,entry,student,search,codes,summary,unchanged,lists } from './helpers.js'
describe('HU-13 Actualización real', () => {
 for (const room of ['Norte HU13','Sur HU13']) {
  it(`HU13-17 check-in independiente mueve pendiente a ${room} sin recarga y conserva filtro`, () => { data().then((d) => {
   page(d,'Principal HU13'); search().type(student(d).codigo_universitario); const wait = poll()
   cy.document().then((original) => {
    checkin(d,'Ana',pivot(d,'Principal HU13',room)).then((after) => {
     wait().then((props) => { expect(props.resumen.ingresaron).to.eq(1); expect(props.resumen.pendientes).to.eq(3); expect(props.pendientes.map((s) => s.id_estudiante)).not.to.include(student(d).id_estudiante) })
     entry(d,after.records[0]); summary(4,1,3); codes('.pendientes-card .item-codigo',[]); search().should('have.value',student(d).codigo_universitario); cy.get('.pendientes-card .ambiente-contador').should('have.text','0 de 3')
     cy.get('.selector select').should('have.value',String(pivot(d).id_examen)); cy.document().then((current) => expect(current).to.eq(original)); unchanged(after)
     search().clear(); lists(d,after)
    })
   })
  }) })
 }
 it('HU13-18 polling mantiene examen y filtro ante ingreso en otro examen', () => { data().then((d) => {
  page(d,'Principal HU13'); search().type('Ana'); const wait = poll()
  cy.document().then((original) => { checkin(d,'Elena',pivot(d,'Otro HU13')).then((after) => {
   wait().then((props) => { expect(props.resumen.ingresaron).to.eq(0); expect(props.resumen.pendientes).to.eq(4) }); summary(4,0,4); codes('.pendientes-card .item-codigo',[student(d).codigo_universitario]); cy.get('.ambientes-grid .item-codigo').should('not.exist'); search().should('have.value','Ana'); cy.document().then((current) => expect(current).to.eq(original)); unchanged(after)
  }) })
 }) })
})
