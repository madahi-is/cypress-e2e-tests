import { data, panel, student, unchanged, request, qrToken, image } from './helpers.js';
describe('HU-15 Identidad independiente del destino de login', () => {
  for (const name of ['Ana', 'Bruno']) {
    it(`HU15-13 ${name} muestra nombres, apellidos y código propios`, () => {
      data().then((d) => {
        panel(name);
        const s = student(d, name);
        cy.get('.student-name').should('contain', `${s.nombres} ${s.apellidos}`);
        cy.get('.student-code-badge').should('contain', s.codigo_universitario);
        cy.get('.credential-card').should('not.contain', student(d, name === 'Ana' ? 'Bruno' : 'Ana').codigo_universitario);
        unchanged(d);
      });
    });
    it(`HU15-14 ${name} muestra CI correcto`, () => {
      data().then((d) => {
        panel(name);
        cy.get('.credential-card').should('contain', student(d, name).documento_identidad);
        unchanged(d);
      });
    });
    it(`HU15-20 ${name} solo recibe su QR y foto aunque query indique otro perfil`, () => {
      data().then((d) => {
        panel(name);
        const me = student(d, name), other = student(d, name === 'Ana' ? 'Bruno' : 'Ana');
        cy.visit(`/estudiante/panel?id_estudiante=${other.id_estudiante}`);
        qrToken().should('eq', me.codigo_qr);
        cy.get('.student-name').should('contain', me.nombres);
        image('.avatar-img');
        cy.get('.avatar-img').should('have.attr', 'src', me.foto_url!);
        unchanged(d);
      });
    });
  }
  it('HU15-18 no tiene controles de edición de identidad', () => {
    data().then((d) => {
      panel();
      cy.get('.credential-card input:not([type="file"]), .credential-card textarea, .credential-card select').should('not.exist');
      unchanged(d);
    });
  });
  it('HU15-19 peticiones no permiten modificar datos personales propios', () => {
    data().then((d) => {
      panel();
      const s = student(d);
      const u = d.users.find((u) => u.id_estudiante === s.id_estudiante)!;
      request('PUT', `/estudiantes/${s.id_estudiante}`, { nombres: 'Alterado', apellidos: 'Alterado', documento_identidad: '1234567', codigo_universitario: '202699999' }).its('status').should('eq', 403);
      request('PUT', `/usuarios/${u.id}`, { name: 'Alterado', username: 'alterado' }).its('status').should('eq', 403);
      unchanged(d);
    });
  });
});
