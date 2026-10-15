import { data,page,search,student,codes,summary,unchanged,lists } from './helpers.js'
describe('HU-13 Búsqueda de pendientes', () => {
 for (const term of ['nombre','código']) {
  it(`HU13-15 busca pendientes por ${term}; caracteriza resumen global independiente del filtro`, () => { data().then((d) => { page(d,'Principal HU13'); const s = student(d); search().type(term === 'nombre' ? s.nombres : s.codigo_universitario); codes('.pendientes-card .item-codigo',[s.codigo_universitario]); cy.get('.pendientes-card .ambiente-contador').should('have.text','1 de 4'); summary(4,0,4); unchanged(d) }) })
 }
 it('HU13-16 búsqueda sin resultados y limpieza recuperan los pendientes', () => { data().then((d) => { page(d,'Principal HU13'); search().type('HU13-desconocido'); codes('.pendientes-card .item-codigo',[]); cy.get('.pendientes-card .lista-vacia').should('contain','Sin coincidencias con esa busqueda.'); summary(4,0,4); search().clear(); lists(d,d); unchanged(d) }) })
})
