import { control, data, rejectionCases, start, student, unchanged, unknown, verify } from './helpers.js'

describe('HU-11 · identidad y habilitación', () => {
  beforeEach(control)
  ;['código', 'documento', 'QR'].forEach((mechanism) => {
    it(`HU11-09 ${mechanism} · resuelve al mismo estudiante sin ingreso previo`, () => {
      data().then((d) => {
        expect(d.records).to.have.length(0)
        const s = student(d)
        const term = mechanism === 'código' ? s.codigo_universitario : mechanism === 'documento' ? s.documento_identidad : s.codigo_qr
        start(d)
        verify(term, 200, mechanism === 'QR').then((response) => expect(response.id_estudiante).to.eq(s.id_estudiante))
        cy.get('.nombre-estudiante').should('have.text', `${s.nombres} ${s.apellidos}`)
        unchanged(d)
      })
    })
  })
  it('HU11-10 · dato desconocido muestra el mensaje exacto y no escribe', () => {
    data().then((d) => {
      start(d)
      verify('HU11-desconocido', 404).then((r) => expect(r.error).to.eq(unknown))
      cy.get('.alerta-error').invoke('text').should('satisfy', (s: string) => s.trim() === unknown)
      cy.get('.confirmacion-box').should('not.exist')
      unchanged(d)
    })
  })
  rejectionCases.forEach(([name, message]) => {
    it(`HU11-11 ${name} · rechaza habilitación inválida y no crea ingreso`, () => {
      data().then((d) => {
        start(d)
        verify(student(d, name).codigo_universitario, 403).then((r) => {
          unchanged(d).then(() => expect(r.error, 'motivo o mensaje por defecto HU').to.eq(message))
        })
        cy.get('.confirmacion-box').should('not.exist')
        cy.get('.alerta-error').invoke('text').should('satisfy', (s: string) => s.trim() === message)
      })
    })
  })
})
