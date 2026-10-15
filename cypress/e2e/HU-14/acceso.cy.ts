import { actors,data,login,exam,url,endpoint,user,page,request,directAssign,state,unchanged } from './helpers.js'
describe('HU-14 Acceso y ubicación', () => {
 for (const actor of actors) {
  it(`HU14-01 ${actor} abre personal desde el detalle del examen compartido`, () => { data().then((d) => {
   login(d,actor); cy.visit('/examenes'); const alias = `hu14Detail${actor.replaceAll('.','')}`; cy.intercept('GET',`**${url(d)}`).as(alias)
   cy.contains('.row-examen .col-asignatura',exam(d).title).closest('tr').dblclick(); cy.wait(`@${alias}`).its('response.statusCode').should('eq',200)
   cy.location('pathname').should('eq',url(d)); cy.get('.personal-titulo').should('have.text','Personal de control asignado'); unchanged(d)
  }) })
 }
 it('HU14-02 sección de personal separada de las habilitaciones', () => { data().then((d) => { page(d); cy.get('.data-table').should('be.visible').and('contain','202600901'); cy.get('.personal-titulo').should('have.text','Personal de control asignado'); cy.get('.data-table .personal-seccion, .personal-seccion .data-table').should('not.exist'); unchanged(d) }) })
 for (const role of ['control','estudiante','visitante']) {
  it(`HU14-03 ${role} no asigna ni quita por interfaz o endpoint`, () => { data().then((d) => {
   page(d); directAssign(d,user(d))
   state().then((before) => {
    if (role === 'visitante') { cy.clearCookies(); cy.visit('/login') }
    else cy.login(role === 'control' ? user(d).email : '202600901')
    cy.get('.personal-select, .personal-quitar').should('not.exist')
    for (const [method,target,body] of [['POST',endpoint(d),{ id_usuario:user(d,'control2.hu14').id }],['DELETE',`${endpoint(d)}/${user(d).id}`,undefined]] as const) request(method,target,body).its('status').should('eq',role === 'visitante' ? 401 : 403)
    request('GET',url(d)).its('status').should('eq',role === 'visitante' ? 401 : 403); unchanged(before)
    cy.visit(url(d),{ failOnStatusCode:false }); cy.get('.personal-seccion').should('not.exist')
    if (role === 'visitante') cy.location('pathname').should('eq','/login')
    else cy.get('body').should('contain','403')
   })
  }) })
 }
})
