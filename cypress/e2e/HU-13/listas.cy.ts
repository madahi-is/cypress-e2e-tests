import { data,page,select,checkin,pivot,lists,entry,unchanged,student,codes,summary,state } from './helpers.js'
describe('HU-13 Organización, listas y contadores', () => {
 for (const title of ['Un ambiente HU13','Principal HU13']) {
  it(`HU13-08 agrupa ingresos reales por ambiente: ${title}`, () => { data().then((d) => { checkin(d,'Ana',pivot(d,title)).then((s) => { page(d,title); cy.get('.ambiente-card').should('have.length',title === 'Principal HU13' ? 2 : 1); lists(d,s,title); entry(d,s.records[0]) }) }) })
  it(`HU13-09 exige ambas listas dentro de cada ambiente: ${title}`, () => { data().then((d) => { page(d,title); cy.get('.ambiente-card').each(($room) => { cy.wrap($room).should('contain','Ingresaron').and('contain','No se han presentado') }); unchanged(d) }) })
 }
 for (const count of [0,2,4]) {
  it(`HU13-10 listas y resumen coherentes con ${count} de 4 ingresados`, () => { data().then((d) => {
   for (const name of ['Ana','Bruno','Carla','Diego'].slice(0,count)) checkin(d,name,pivot(d,'Principal HU13',name === 'Bruno' ? 'Sur HU13' : 'Norte HU13'))
   page(d,'Principal HU13'); state().then((s) => lists(d,s))
  }) })
 }
 it('HU13-11 inhabilitado y sin habilitación no aparecen en ninguna lista', () => { data().then((d) => { page(d,'Principal HU13'); lists(d,d); for (const name of ['Elena','Fabio']) cy.get('.panel-container').should('not.contain',student(d,name).codigo_universitario); unchanged(d) }) })
 it('HU13-12 ingreso de otro examen no altera pendientes ni resumen principal', () => { data().then((d) => { checkin(d,'Ana',pivot(d,'Otro HU13')).then((s) => { page(d,'Principal HU13'); lists(d,s); cy.get('.ambientes-grid .item-codigo').should('not.exist') }) }) })
 it('HU13-13 ingresados no se repiten entre ambientes y suman el total global', () => { data().then((d) => { checkin(d).then(() => checkin(d,'Bruno',pivot(d,'Principal HU13','Sur HU13'))).then((s) => { page(d,'Principal HU13'); lists(d,s); codes('.ambientes-grid .item-codigo',[student(d).codigo_universitario,student(d,'Bruno').codigo_universitario]); cy.get('.ambiente-card .ambiente-contador').then(($c) => { expect([...$c].reduce((n,e) => n+Number(e.textContent!.trim().split('/')[0]),0)).to.eq(2) }); summary(4,2,2); s.records.forEach((r) => entry(d,r)) }) }) })
})
