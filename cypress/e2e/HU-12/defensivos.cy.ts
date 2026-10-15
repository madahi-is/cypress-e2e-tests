import { data, page, request, payload, unchanged, state, persisted } from './helpers.js'
describe('HU-12 Catálogo y caracterizaciones adicionales', () => {
 it('HU12-29 catálogo cerrado rechaza tipo externo por endpoint', () => {
  data().then((d) => { page(d); request('POST','/incidencias',{ ...payload(d), tipo_incidencia:'Robo' }).then((r) => { expect(r.status).to.eq(422); expect(r.body.errors).to.have.property('tipo_incidencia'); unchanged(d) }) })
 })
 for (const field of ['id_examen','id_estudiante']) {
  it(`HU12-30 adicional: relación inexistente ${field} rechazada`, () => {
   data().then((d) => { page(d); request('POST','/incidencias',{ ...payload(d), [field]:2147483647 }).then((r) => { expect(r.status).to.eq(422); expect(r.body.errors).to.have.property(field); unchanged(d) }) })
  })
 }
 it('HU12-31 adicional: rango invertido rechazado por validación actual', () => {
  data().then((d) => { page(d); request('GET','/incidencias?desde=2026-03-12&hasta=2026-03-10').then((r) => { expect(r.status).to.eq(422); expect(r.body.errors.hasta).to.deep.eq(['La fecha final no puede ser anterior a la inicial']); unchanged(d) }) })
 })
 it('HU12-32 caracteriza texto largo sin límite max:1000 activo', () => {
  data().then((d) => { page(d); state().then((before) => { const p = { ...payload(d), descripcion_motivo:'X'.repeat(1001) }; request('POST','/incidencias',p).its('status').should('eq',302); state().then((after) => persisted(d,before,after,p)) }) })
 })
})
