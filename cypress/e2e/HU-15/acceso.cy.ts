import { data, state, student, panel, unchanged, request, logout, create, changePassword } from './helpers.js';
describe('HU-15 Credenciales y acceso', () => {
  it('HU15-01 alta administrativa crea cuenta temporal de estudiante', () => {
    data().then((d) => {
      create();
      state().then((s) => {
        const p = student(s, 'Carla');
        const u = s.users.find((u) => u.id_estudiante === p.id_estudiante)!;
        expect(u).to.include({ role: 'estudiante', username: p.codigo_universitario, debe_cambiar_password: true, temporary_matches: true });
        expect(s.students).to.have.length(d.students.length + 1);
        expect(s.users).to.have.length(d.users.length + 1);
      });
      logout();
      cy.login('202600903', '9900903');
      cy.location('pathname').should('eq', '/cambiar-password');
    });
  });
  it('HU15-11 contraseña obligatoria bloquea panel hasta cambiarla y persiste el cambio', () => {
    create();
    logout();
    cy.login('202600903', '9900903');
    cy.visit('/estudiante/panel');
    cy.location('pathname').should('eq', '/cambiar-password');
    changePassword();
    state().then((s) => expect(s.users.find((u) => u.username === '202600903')).to.include({ debe_cambiar_password: false, temporary_matches: false }));
    logout();
    cy.login('202600903', 'NuevaClave!2026');
    cy.location('pathname').should('not.eq', '/cambiar-password');
  });
  it('HU15-12 después de cambiar contraseña termina únicamente en el panel QR', () => {
    create();
    logout();
    cy.login('202600903', '9900903');
    changePassword();
    cy.location('pathname').should('eq', '/estudiante/panel');
  });
  it('HU15-02 login dirige únicamente al panel QR propio', () => {
    cy.login('202600901');
    cy.location('pathname').should('eq', '/estudiante/panel');
  });
  const forbidden = ['/admin/dashboard', '/docente/dashboard', '/control/dashboard', '/dashboard', '/mis-examenes', '/usuarios', '/estudiantes', '/examenes', '/asignaturas', '/ambientes', '/grupos', '/incidencias', '/registro-ingreso', '/panel-asistencia'];
  for (const url of forbidden)
    it(`HU15-03 acceso directo rechazado o panel permitido: ${url}`, () => {
      data().then((d) => {
        panel();
        cy.request({ url, failOnStatusCode: false }).then((r) => {
          if (r.status === 200) {
            const doc = new DOMParser().parseFromString(String(r.body), 'text/html');
            const el = doc.querySelector('[data-page]');
            const page = JSON.parse(el?.tagName === 'SCRIPT' ? el.textContent! : el?.getAttribute('data-page') || '{}');
            expect(page.component).to.eq('Estudiantes/Panel');
          }
          else
            expect(r.status).to.eq(403);
        });
        unchanged(d);
      });
    });
  it('HU15-16 no ofrece enlaces a módulos prohibidos', () => {
    panel();
    for (const url of forbidden)
      cy.get(`a[href="${url}"]`).should('not.exist');
  });
  it('HU15-04 no existe autorregistro público por UI ni petición', () => {
    data().then((d) => {
      cy.visit('/login');
      cy.get('a[href="/register"]').should('not.exist');
      request('GET', '/register').its('status').should('eq', 404);
      request('POST', '/register', { username: 'intruso', password: 'NuevaClave!2026' }).its('status').should('be.oneOf', [404, 405]);
      unchanged(d);
    });
  });
  it('HU15-17 estudiante no crea cuentas o estudiantes mediante peticiones', () => {
    data().then((d) => {
      panel();
      for (const url of ['/estudiantes', '/usuarios'])
        request('POST', url, { nombres: 'Intruso', username: 'intruso' }).its('status').should('eq', 403);
      unchanged(d);
    });
  });
});
