import { control, data, start, student, verify, photo, unchanged, state, confirm, persisted, pivot, input, request, payload } from './helpers.js'
describe('HU-11 Confirmación y persistencia', () => {
  it('HU11-13 muestra identidad y foto sin registrar ni permitir editar la hora', () => {
    data().then((d) => { control(); start(d); verify(student(d).codigo_universitario); photo(d); unchanged(d)
      cy.get('.registro-wrapper input[type="datetime-local"], .registro-wrapper input[type="time"], .registro-wrapper input[type="date"]').should('not.exist')
    })
  })
  it('HU11-14 cancelar no registra y permite buscar otro estudiante', () => {
    data().then((d) => { control(); start(d); verify(student(d).codigo_universitario)
      cy.contains('.confirmacion-box button', 'Cancelar').click(); cy.get('.confirmacion-box').should('not.exist'); unchanged(d)
      verify(student(d, 'Bruno').codigo_universitario); photo(d, 'Bruno'); unchanged(d)
    })
  })
  it('HU11-15 confirmar persiste todas las relaciones y la hora del servidor', () => {
    data().then((d) => { control(); start(d); verify(student(d).codigo_universitario)
      state().then((before) => { confirm(); state().then((after) => persisted(d, before, after, pivot(d))) })
    })
  })
  it('HU11-16 el cliente no puede imponer hora ni usuario', () => {
    data().then((d) => { control(); state().then((before) => {
      request('/registro-ingreso', { ...payload(d), fecha_hora_ingreso: '2000-01-01 00:00:00', id_usuario: d.users.find((u) => u.role === 'administrador')!.id }).then((r) => expect(r.status).to.eq(200))
      state().then((after) => persisted(d, before, after, pivot(d)))
    }) })
  })
  it('HU11-17 registra dos estudiantes sin recargar ni perder examen y ambiente', () => {
    data().then((d) => { control(); start(d)
      cy.document().then((original) => {
        verify(student(d).codigo_universitario); state().then((before) => { confirm(); state().then((after) => persisted(d, before, after, pivot(d))) })
        input().should('have.value', ''); cy.get('.confirmacion-box').should('not.exist')
        cy.document().then((current) => expect(current).to.eq(original))
        cy.get('.resumen-bar').should('contain', 'Verificación HU11').and('contain', 'Aula Norte HU11')
        verify(student(d, 'Bruno').codigo_universitario)
        state().then((before) => { confirm(); state().then((after) => persisted(d, before, after, pivot(d), 'Bruno')) })
        input().should('have.value', ''); cy.document().then((current) => expect(current).to.eq(original))
      })
    })
  })
})
