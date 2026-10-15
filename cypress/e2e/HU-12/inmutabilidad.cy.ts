import { data, page, roles, request, unchanged, state } from './helpers.js'
describe('HU-12 Inmutabilidad', () => {
 it('HU12-25 tarjetas no ofrecen edición ni eliminación', () => {
  data().then((d) => { page(d); cy.get('.incidencia-card').should('have.length',15); cy.get('.incidencia-card button, .incidencia-card a, .incidencia-card input, .incidencia-card textarea').should('not.exist'); unchanged(d) })
 })
 it('HU12-26 registro real de rutas contiene solo índice y registro', () => {
  data().then((d) => { page(d); state().then((s) => expect(s.routes).to.deep.eq([
   { uri:'incidencias', methods:['GET','HEAD'], name:'incidencias.index' }, { uri:'incidencias', methods:['POST'], name:'incidencias.store' },
  ])); unchanged(d) })
 })
 for (const role of roles) for (const method of ['PUT','PATCH','DELETE']) {
  it(`HU12-27 ${role} no modifica datos con ${method}`, () => {
   data().then((d) => { page(d,role); const id = d.records[0].id_incidencia
    // Colección existente; la URI del recurso es una sonda ausente, no una ruta inventada de edición.
    request(method, '/incidencias', { id_incidencia:id, descripcion_motivo:'Alteración prohibida' }).then((r) => { unchanged(d).then(() => expect(r.status).to.eq(405)) })
    request(method, `/incidencias/${id}`, { descripcion_motivo:'Alteración prohibida' }).then((r) => { unchanged(d).then(() => expect(r.status).to.eq(404)) })
   })
  })
 }
})
