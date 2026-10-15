import { admin, created, data, duplicate, field, fill, group, payload, request, state, unchanged } from './helpers.js'

describe('HU-9 · registro, validaciones y unicidad', () => {
  beforeEach(admin)
  ;['A', 'B', '1A', '14'].forEach((name) => {
    it(`HU09-04 ${name} · registra por UI con Gestión 2026-2 y persiste`, () => {
      data().then((d) => {
        const body = { ...payload(d), nombre_grupo: name }
        cy.contains('button', 'Nuevo grupo').click()
        ;['Asignatura', 'Docente', 'Gestion', 'Nombre del grupo'].forEach((label) => {
          cy.contains('.modal-container .form-label', label).find('.required').should('have.text', '*')
          field(label).should('be.visible')
        })
        fill(body)
        cy.contains('.modal-footer button', 'Registrar grupo').click()
        cy.get('.modal-container').should('not.exist')
        created(body)
        cy.reload()
        // Filtra para no depender de la posición del registro nuevo en la paginación.
        cy.visit(`/grupos?id_asignatura=${body.id_asignatura}&gestion=${body.gestion}`)
        cy.get('.data-table tbody').should('contain', name).and('contain', '2026-2').and('contain', 'Docente 1 HU9')
      })
    })
  })
  it('HU09-05 · servidor acepta Gestión semestral sin depender de validación UI', () => {
    data().then((d) => {
      const body = payload(d)
      request('POST', '/grupos', body).its('status').should('eq', 302)
      created(body)
    })
  })
  it('HU09-06 · UI exige todos los campos y no escribe el formulario vacío', () => {
    cy.contains('button', 'Nuevo grupo').click()
    cy.contains('.modal-footer button', 'Registrar grupo').click()
    ;['Debe seleccionar una asignatura', 'Debe seleccionar un docente', 'Debe indicar la gestion',
      'Debe indicar el nombre del grupo'].forEach((message) => cy.contains('.error-msg', message).should('be.visible'))
    data().then(unchanged)
  })
  ;['id_asignatura', 'id_usuario', 'gestion', 'nombre_grupo'].forEach((key) => {
    it(`HU09-07 ${key} · servidor rechaza campo obligatorio ausente`, () => {
      data().then((d) => {
        const body: Record<string, unknown> = payload(d)
        delete body[key]
        request('POST', '/grupos', body).then((r) => {
          expect(r.status).to.eq(422)
          expect(r.body.errors).to.have.property(key)
        })
        unchanged(d)
      })
    })
  })
  ;['abc', '26-2'].forEach((gestion) => {
    it(`HU09-08 ${gestion} · Gestión malformada rechazada en UI y servidor`, () => {
      data().then((d) => {
        const body = { ...payload(d), gestion }
        cy.contains('button', 'Nuevo grupo').click()
        fill(body)
        cy.contains('.modal-footer button', 'Registrar grupo').click()
        cy.contains('.modal-container .form-group', 'Gestion').find('.error-msg').should('be.visible')
        request('POST', '/grupos', body).then((r) => {
          expect(r.status).to.eq(422)
          expect(r.body.errors).to.have.property('gestion')
        })
        unchanged(d)
      })
    })
  })
  it('HU09-09 · listas de alta y reasignación incluyen exclusivamente los docentes', () => {
    data().then((d) => {
      const expected = d.users.filter((u) => u.role === 'docente').map((u) => String(u.id)).sort()
      const check = () => field('Docente').find('option').then(($options) => {
        expect([...$options].map((o) => o.value).filter(Boolean).sort()).to.deep.eq(expected)
      })
      cy.contains('button', 'Nuevo grupo').click()
      check()
      field('Asignatura').find('option').then(($options) => {
        expect([...$options].map((o) => o.value).filter(Boolean).sort())
          .to.deep.eq(d.subjects.map((s) => String(s.id_asignatura)).sort())
      })
      cy.get('.modal-close').click()
      cy.get(`a[href="/grupos/${group(d).id_grupo}"]`).closest('tr').contains('button', 'Reasignar docente').click()
      check()
    })
  })
  ;['administrador', 'personal de control de ingreso', 'estudiante'].forEach((role) => {
    ;['POST', 'PATCH'].forEach((method) => {
      it(`HU09-10 ${method} ${role} · rechaza asignar usuario que no es docente`, () => {
        data().then((d) => {
          const id = d.users.find((u) => u.role === role)!.id
          request(method, method === 'POST' ? '/grupos' : `/grupos/${group(d).id_grupo}`,
            method === 'POST' ? { ...payload(d), id_usuario: id } : { id_usuario: id }).then((r) => {
            expect(r.status).to.eq(422)
            expect(r.body.errors.id_usuario).to.include('El usuario seleccionado no es docente')
          })
          unchanged(d)
        })
      })
    })
  })
  ;['id_asignatura', 'id_usuario'].forEach((key) => {
    ;['inexistente', 'texto'].forEach((invalid) => {
      it(`HU09-11 ${key} ${invalid} · valida referencia y tipo`, () => {
        data().then((d) => {
          const maximum = key === 'id_asignatura' ? Math.max(...d.subjects.map((s) => s.id_asignatura)) : Math.max(...d.users.map((u) => u.id))
          request('POST', '/grupos', { ...payload(d), [key]: invalid === 'texto' ? 'no-entero' : maximum + 100 }).then((r) => {
            expect(r.status).to.eq(422)
            expect(r.body.errors).to.have.property(key)
          })
          unchanged(d)
        })
      })
    })
  })
  ;['docente1.e2e', 'docente2.e2e'].forEach((teacher) => {
    it(`HU09-12 ${teacher} · rechaza triple duplicada con mensaje exacto de HU`, () => {
      data().then((d) => {
        const g = group(d)
        request('POST', '/grupos', { ...g, id_usuario: d.users.find((u) => u.username === teacher)!.id }).then((r) => {
          expect(r.status).to.eq(422)
          expect(r.body.errors.nombre_grupo[0]).to.eq(duplicate)
        })
        unchanged(d)
      })
    })
  })
  it('HU09-13 · UI muestra el mensaje exacto de triple duplicada', () => {
    data().then((d) => {
      cy.contains('button', 'Nuevo grupo').click()
      fill(group(d))
      cy.contains('.modal-footer button', 'Registrar grupo').click()
      cy.contains('.modal-container .form-group', 'Nombre del grupo').find('.error-msg').should('have.text', duplicate)
      unchanged(d)
    })
  })
  ;['nombre', 'asignatura', 'gestion'].forEach((dimension) => {
    it(`HU09-14 ${dimension} · permite otra combinación y varios grupos del mismo docente`, () => {
      data().then((d) => {
        const body = { ...group(d) }
        if (dimension === 'nombre') body.nombre_grupo = '1A'
        if (dimension === 'asignatura') body.id_asignatura = payload(d).id_asignatura
        if (dimension === 'gestion') body.gestion = '2027-2'
        request('POST', '/grupos', body).its('status').should('eq', 302)
        created(body)
        state().then((s) => {
          expect(s.groups).to.have.length(d.groups.length + 1)
          expect(s.groups.filter((g) => g.id_usuario === body.id_usuario)).to.have.length(d.groups.filter((g) => g.id_usuario === body.id_usuario).length + 1)
        })
      })
    })
  })
  ;[50, 51, 0].forEach((length) => {
    it(`HU09-15 ${length} · límite actual del nombre y blancos`, () => {
      data().then((d) => {
        const body = { ...payload(d), nombre_grupo: length ? 'N'.repeat(length) : '   ' }
        request('POST', '/grupos', body).then((r) => {
          if (length === 50) {
            expect(r.status).to.eq(302)
            created(body)
          } else {
            expect(r.status).to.eq(422)
            expect(r.body.errors).to.have.property('nombre_grupo')
            unchanged(d)
          }
        })
      })
    })
  })
})
