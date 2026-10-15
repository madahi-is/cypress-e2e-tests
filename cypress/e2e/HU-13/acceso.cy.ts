import { data,roles,login,page,select,query,unchanged,denied } from './helpers.js'
describe('HU-13 Acceso', () => {
 for (const role of roles) {
  it(`HU13-01 ${role} entra desde el menú`, () => { data().then((d) => { login(d,role); cy.get('.sidebar-nav a[href="/panel-asistencia"]').should('be.visible').click(); cy.get('.panel-title').should('have.text','PANEL DE ASISTENCIA'); unchanged(d) }) })
  it(`HU13-02 ${role} consulta URL, JSON y refresco parcial`, () => { data().then((d) => { page(d,undefined,role); select(d); query(d).then((r) => { expect(r.status).to.eq(200); expect(r.body.resumen.habilitados).to.eq(4) }); query(d,'Principal HU13',true).then((r) => { expect(r.status).to.eq(200); expect(r.body.component).to.eq('Control/PanelAsistencia'); expect(r.body.props.resumen.habilitados).to.eq(4) }); unchanged(d) }) })
 }
 it('HU13-03 estudiante no accede por menú, URL o consulta/actualización', () => { data().then((d) => { cy.login('202600901'); cy.get('a[href="/panel-asistencia"]').should('not.exist'); denied(d,403); cy.visit('/panel-asistencia',{ failOnStatusCode:false }); cy.get('.panel-title').should('not.exist'); cy.get('body').should('contain','403') }) })
 it('HU13-04 visitante no accede a URL ni consulta/actualización', () => { data().then((d) => { cy.visit('/login'); query(d).its('status').should('eq',401); query(d,'Principal HU13',true).its('status').should('be.oneOf',[302,303]); unchanged(d); cy.visit('/panel-asistencia'); cy.location('pathname').should('eq','/login') }) })
})
