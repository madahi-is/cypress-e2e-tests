import { control, data, exam, input, pivot, select, unchanged } from './helpers.js'

describe('HU-11 · selección de contexto', () => {
  beforeEach(control)
  it('HU11-05 · examen y ambiente obligatorios antes de identificar', () => {
    select('AMBIENTE').should('be.disabled')
    cy.contains('button', 'INICIAR REGISTRO').should('be.disabled')
    input().should('not.exist')
    data().then((d) => {
      select('EXAMEN ACTIVO').select(String(exam(d).id_examen))
      select('AMBIENTE').should('have.value', '')
      cy.contains('button', 'INICIAR REGISTRO').should('be.disabled')
      input().should('not.exist')
      unchanged(d)
    })
  })
  it('HU11-06 · las opciones de ambiente corresponden exclusivamente al examen elegido', () => {
    data().then((d) => {
      ;['Verificación HU11', 'Otro examen HU11'].forEach((title) => {
        const id = exam(d, title).id_examen
        select('EXAMEN ACTIVO').select(String(id))
        select('AMBIENTE').find('option').then(($options) => {
          expect([...$options].map((o) => o.value).filter(Boolean).sort()).to.deep.eq(d.pivots.filter((p) => p.id_examen === id).map((p) => String(p.id_examen_ambiente)).sort())
        })
      })
      unchanged(d)
    })
  })
  it('HU11-07 · cambiar examen limpia la selección incompatible de ambiente', () => {
    data().then((d) => {
      select('EXAMEN ACTIVO').select(String(exam(d).id_examen))
      select('AMBIENTE').select(String(pivot(d).id_examen_ambiente))
      cy.contains('button', 'INICIAR REGISTRO').should('not.be.disabled')
      select('EXAMEN ACTIVO').select(String(exam(d, 'Otro examen HU11').id_examen))
      select('AMBIENTE').should('have.value', '')
      cy.contains('button', 'INICIAR REGISTRO').should('be.disabled')
      unchanged(d)
    })
  })
  it('HU11-08 · examen sin ambientes no permite iniciar', () => {
    data().then((d) => {
      select('EXAMEN ACTIVO').select(String(exam(d, 'Sin ambientes HU11').id_examen))
      select('AMBIENTE').find('option').should('have.length', 1)
      cy.contains('button', 'INICIAR REGISTRO').should('be.disabled')
      input().should('not.exist')
      unchanged(d)
    })
  })
})
