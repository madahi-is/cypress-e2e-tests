import { data, panel, student, state, qrToken, image, regenerate, changedQr, logout, validate, request, unchanged } from './helpers.js';
describe('HU-15 QR', () => {
  it('HU15-05 imagen vigente cargada y legible junto a identidad', () => {
    data().then((d) => {
      panel();
      image('.qr-image');
      cy.get('.student-name').should('contain', 'Ana Prueba');
      cy.get('.student-code-badge').should('contain', student(d).codigo_universitario);
      qrToken().should('eq', student(d).codigo_qr);
    });
  });
  it('HU15-05 decodifica PNG real independientemente del layout', () => {
    data().then((d) => {
      panel();
      cy.get('.qr-image').invoke('attr', 'src').then((url) => cy.task('decodeQr', url).should('eq', student(d).codigo_qr));
    });
  });
  it('HU15-06 identificadores distintos para estudiantes distintos', () => {
    data().then((d) => {
      expect(student(d).codigo_qr).not.to.eq(student(d, 'Bruno').codigo_qr);
      panel();
      qrToken().should('eq', student(d).codigo_qr);
      logout();
      panel('Bruno');
      qrToken().should('eq', student(d, 'Bruno').codigo_qr);
    });
  });
  it('HU15-21 QR no es CI, código ni fórmula predecible vigente', () => {
    data().then((d) => {
      panel();
      const s = student(d);
      qrToken().then((t) => {
        expect(t).not.to.eq(`ident:v1:${s.codigo_universitario}`);
        expect(t).not.to.contain(s.codigo_universitario);
        expect(t).not.to.contain(s.documento_identidad);
      });
    });
  });
  it('HU15-07 regenerar cambia QR persistido y sobrevive a recarga', () => {
    data().then((d) => {
      panel();
      regenerate();
      changedQr(d).then((after) => {
        qrToken().should('eq', student(after).codigo_qr);
        cy.reload();
        qrToken().should('eq', student(after).codigo_qr);
        unchanged(after);
      });
    });
  });
  it('HU15-22 QR anterior no resuelve y nuevo funciona con identificación real', () => {
    data().then((d) => {
      panel();
      regenerate();
      state().then((s) => {
        const token = student(s).codigo_qr;
        logout();
        cy.login('control.e2e@example.test');
        validate(d.examen, student(d).codigo_qr, 404);
        validate(d.examen, token, 200, student(d).id_estudiante);
        unchanged(s);
      });
    });
  });
  it('HU15-23 segunda regeneración invalida ambos identificadores anteriores', () => {
    data().then((d) => {
      panel();
      regenerate();
      state().then((first) => {
        regenerate();
        state().then((second) => {
          logout();
          cy.login('control.e2e@example.test');
          validate(d.examen, student(d).codigo_qr, 404);
          validate(d.examen, student(first).codigo_qr, 404);
          validate(d.examen, student(second).codigo_qr, 200, student(d).id_estudiante);
          unchanged(second);
        });
      });
    });
  });
  it('HU15-24 payload ajeno no regenera QR de otro estudiante', () => {
    data().then((d) => {
      panel();
      request('POST', '/estudiante/qr/regenerar', { id_estudiante: student(d, 'Bruno').id_estudiante }).its('status').should('eq', 302);
      state().then((s) => expect(student(s, 'Bruno')).to.deep.eq(student(d, 'Bruno')));
      changedQr(d);
    });
  });
  it('HU15-25 visitante no regenera QR', () => {
    data().then((d) => {
      cy.visit('/login');
      request('POST', '/estudiante/qr/regenerar', {}).its('status').should('eq', 401);
      unchanged(d);
    });
  });
});
