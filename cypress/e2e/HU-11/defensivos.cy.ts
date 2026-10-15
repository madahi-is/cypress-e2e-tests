import { control, data, rejectionCases, request, payload, unchanged, pivot } from './helpers.js'
describe('HU-11 Restricciones en endpoints reales', () => {
  for (const [name] of rejectionCases) {
    it(`HU11-12 guardado directo rechaza estudiante no habilitado: ${name}`, () => {
      data().then((d) => { control(); request('/registro-ingreso', payload(d, pivot(d), name)).then((r) => expect(r.status).to.eq(403)); unchanged(d) })
    })
  }
  for (const field of ['id_examen', 'dato_estudiante']) {
    it(`HU11-23 validar exige ${field}`, () => {
      data().then((d) => { control(); const body: Record<string, unknown> = { id_examen: pivot(d).id_examen, dato_estudiante: d.students[0].codigo_universitario }; delete body[field]
        request('/registro-ingreso/validar', body).then((r) => { expect(r.status).to.eq(422); expect(r.body.errors).to.have.property(field) }); unchanged(d)
      })
    })
  }
  for (const field of ['id_estudiante', 'id_examen_ambiente']) {
    it(`HU11-24 guardar exige ${field}`, () => {
      data().then((d) => { control(); const body: Record<string, unknown> = { ...payload(d) }; delete body[field]
        request('/registro-ingreso', body).then((r) => { expect(r.status).to.eq(422); expect(r.body.errors).to.have.property(field) }); unchanged(d)
      })
    })
  }
  it('HU11-25 ambiente de examen inexistente se rechaza como entrada inválida', () => {
    data().then((d) => { control(); request('/registro-ingreso', { ...payload(d), id_examen_ambiente: 2147483647 }).then((r) => expect(r.status).to.eq(422)); unchanged(d) })
  })
})
