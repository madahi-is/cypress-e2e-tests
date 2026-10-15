import { control, data, start, student, verify, confirm, state, pivot, select, duplicate, request, payload, snapshot, persisted } from './helpers.js'
describe('HU-11 Duplicados', () => {
  for (const other of [false, true]) {
    it(`HU11-18 rechaza segundo ingreso en ${other ? 'otro' : 'el mismo'} ambiente`, () => {
      data().then((d) => { control(); start(d); verify(student(d).codigo_universitario); confirm()
        state().then((before) => {
          if (other) { cy.contains('button', 'CAMBIAR').click(); select('AMBIENTE').select(String(pivot(d, 'Verificación HU11', 'Aula Sur HU11').id_examen_ambiente)); cy.contains('button', 'INICIAR REGISTRO').click() }
          verify(student(d).codigo_universitario, 409).then((r) => expect(r.error).to.eq(duplicate(before.records[0])))
          cy.get('.alerta-error').invoke('text').should('satisfy', (s: string) => s.trim() === duplicate(before.records[0]))
          state().then((after) => { expect(after.records).to.have.length(1); expect(snapshot(after)).to.deep.eq(snapshot(before)) })
        })
      })
    })
    it(`HU11-19 reenvío secuencial directo en ${other ? 'otro' : 'el mismo'} ambiente conserva un registro`, () => {
      data().then((d) => { control(); request('/registro-ingreso', payload(d)).then((r) => expect(r.status).to.eq(200))
        state().then((before) => {
          request('/registro-ingreso', payload(d, other ? pivot(d, 'Verificación HU11', 'Aula Sur HU11') : pivot(d))).then((r) => expect(r.status).to.eq(409))
          state().then((after) => { expect(after.records).to.have.length(1); expect(snapshot(after)).to.deep.eq(snapshot(before)) })
        })
      })
    })
  }
  it('HU11-20 el endpoint directo devuelve el mensaje exigido con hora previa', () => {
    data().then((d) => { control(); request('/registro-ingreso', payload(d)).then((r) => expect(r.status).to.eq(200))
      state().then((before) => { request('/registro-ingreso', payload(d)).then((r) => { expect(r.status).to.eq(409); expect(r.body.error).to.eq(duplicate(before.records[0])) }) })
    })
  })
  it('HU11-21 permite al mismo estudiante ingresar en otro examen habilitado', () => {
    data().then((d) => { control(); start(d); verify(student(d).codigo_universitario); confirm()
      cy.contains('button', 'CAMBIAR').click(); const p = pivot(d, 'Otro examen HU11', 'Aula Exclusiva HU11'); start(d, p)
      verify(student(d).codigo_universitario); state().then((before) => { confirm(); state().then((after) => persisted(d, before, after, p)) })
    })
  })
})
