import { data,page,controls,user,actors,request,endpoint,unchanged,required } from './helpers.js'
describe('HU-14 Selector y validaciones', () => {
 it('HU14-04 selector ofrece exclusivamente el rol control', () => { data().then((d) => { page(d); cy.get<HTMLOptionElement>('.personal-select option').then(($o) => {
  const ids = [...$o].map((o) => o.value).filter(Boolean); expect(ids.sort()).to.deep.eq(controls(d).map((u) => String(u.id)).sort())
  d.users.filter((u) => u.role !== 'personal de control de ingreso').forEach((u) => expect(ids).not.to.include(String(u.id)))
 }); unchanged(d) }) })
 for (const actor of [actors[0],actors[1]]) for (const role of ['administrador','docente','estudiante']) {
  it(`HU14-07 ${actor} no puede asignar id de ${role}`, () => { data().then((d) => {
   page(d,actor); const u = d.users.find((u) => u.role === role)!
   request('POST',endpoint(d),{ id_usuario:u.id }).then((r) => { expect(r.status).to.eq(422); unchanged(d).then(() => expect(r.body.errors.id_usuario).to.include('El usuario seleccionado no es personal de control de ingreso')) })
  }) })
 }
 it('HU14-08 adicional: selección vacía muestra validación local y no envía registro', () => { data().then((d) => {
  page(d); let posts = 0; cy.intercept('POST',`**${endpoint(d)}`,() => { posts++ }); cy.get('.personal-select').should('have.value',''); cy.get('.personal-btn').click(); cy.get('.personal-error').should('have.text',required); cy.then(() => expect(posts).to.eq(0)); unchanged(d)
 }) })
 for (const invalid of ['vacío','inexistente']) {
  it(`HU14-09 adicional: endpoint rechaza ID ${invalid}`, () => { data().then((d) => {
   page(d); request('POST',endpoint(d),{ id_usuario:invalid === 'vacío' ? '' : 2147483647 }).then((r) => { expect(r.status).to.eq(422); expect(r.body.errors).to.have.property('id_usuario'); unchanged(d).then(() => { if (invalid === 'vacío') expect(r.body.errors.id_usuario).to.deep.eq([required]) }) })
  }) })
 }
})
