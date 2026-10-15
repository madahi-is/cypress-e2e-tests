import { csrf, qrToken, type Student } from '../../support/commands.js';
export interface Data {
  students: Student[];
  users: {
    id: number;
    id_estudiante: number | null;
    username: string;
    email: string;
    role: string;
    debe_cambiar_password: boolean;
    temporary_matches: boolean;
  }[];
  files: Record<string, string>;
  examen: number;
  ambiente: number;
  pivots: {
    id_examen_ambiente: number;
    id_examen: number;
    id_ambiente: number;
  }[];
  habilitations: unknown[];
  entries: unknown[];
}
export const data = () => cy.get<Data>('@data');
export const state = () => cy.task<Data>('database', 'state-hu15');
export const student = (d: Data, name = 'Ana') => d.students.find((s) => s.nombres === name)!;
export function panel(name = 'Ana') {
  cy.login(name === 'Ana' ? '202600901' : '202600902');
  cy.visit('/estudiante/panel');
  cy.get('.credential-card').should('be.visible');
}
export const unchanged = (d: Data) => state().should('deep.eq', d);
export function logout() {
  return csrf().then((token) => cy.request({ method: 'POST', url: '/logout', headers: { 'X-CSRF-TOKEN': token! } }));
}
export function request(method: string, url: string, body?: Cypress.RequestBody) {
  return csrf().then((token) => cy.request({ method, url, body, headers: { 'X-CSRF-TOKEN': token!, Accept: 'application/json' }, failOnStatusCode: false, followRedirect: false }));
}
let serial = 0;
export function regenerate() {
  const alias = `hu15Qr${++serial}`;
  cy.intercept('POST', '**/estudiante/qr/regenerar').as(alias);
  cy.get('.btn-regenerar').click();
  return cy.wait(`@${alias}`).then((r) => expect(r.response?.statusCode).to.be.oneOf([302, 303]));
}
export function upload(path = 'perfil.png') {
  const alias = `hu15Photo${++serial}`;
  cy.intercept('POST', '**/estudiante/foto').as(alias);
  cy.get('input[type="file"]').selectFile(`cypress/fixtures/archivos/${path}`, { force: true });
  return cy.wait(`@${alias}`).then((r) => expect(r.response?.statusCode).to.be.oneOf([302, 303]));
}
export function directPhoto(path: string, extra: Record<string, string> = {}) {
  return cy.fixture(`archivos/${path}`, 'base64').then((encoded: string) => csrf().then((token) => cy.window().then(async (win) => {
    const raw = win.atob(encoded);
    const bytes = Uint8Array.from(raw, (c) => c.charCodeAt(0));
    const body = new win.FormData();
    body.append('foto', new win.Blob([bytes], { type: path.endsWith('.txt') ? 'text/plain' : path.endsWith('.jpg') ? 'image/jpeg' : 'image/png' }), path);
    for (const [k, v] of Object.entries(extra))
      body.append(k, v);
    const r = await win.fetch('/estudiante/foto', { method: 'POST', body, headers: { 'X-CSRF-TOKEN': token!, Accept: 'application/json' } });
    const text = await r.text();
    let result: unknown;
    try {
      result = JSON.parse(text);
    }
    catch {
      result = text;
    }
    return { status: r.status, body: result };
  })));
}
export function changedQr(d: Data) {
  return state().then((after) => {
    const old = student(d), s = student(after);
    expect(s.codigo_qr).not.to.eq(old.codigo_qr);
    expect(s.codigo_qr).to.be.a('string').and('not.be.empty');
    expect({ ...after, students: after.students.map((p) => p.id_estudiante === old.id_estudiante ? { ...p, codigo_qr: old.codigo_qr } : p) }).to.deep.eq(d);
    return after;
  });
}
export function changedPhoto(d: Data) {
  return state().then((after) => {
    const old = student(d), s = student(after);
    expect(s.foto_url).to.be.a('string').and('not.be.empty');
    expect(s.foto_url !== old.foto_url || after.files[s.foto_url!.replace(/^\/storage\//, '')] !== d.files[old.foto_url!.replace(/^\/storage\//, '')], 'foto realmente actualizada').to.eq(true);
    expect(s.foto_url).not.to.match(/^blob:/);
    for (const other of d.students.filter((p) => p.id_estudiante !== old.id_estudiante && p.foto_url)) {
      const otherPath = other.foto_url!.replace(/^\/storage\//, '');
      expect(after.files[otherPath]).to.eq(d.files[otherPath]);
    }
    const path = s.foto_url!.replace(/^\/storage\//, '');
    expect(after.files).to.have.property(path);
    expect({ ...after, files: d.files, students: after.students.map((p) => p.id_estudiante === old.id_estudiante ? { ...p, foto_url: old.foto_url } : p) }).to.deep.eq(d);
    return after;
  });
}
export function image(selector: string) {
  cy.get<HTMLImageElement>(selector).should('be.visible').should(($i) => {
    expect($i[0].naturalWidth).to.be.greaterThan(0);
    const r = $i[0].getBoundingClientRect();
    expect(r.width).to.be.greaterThan(0);
    expect(r.height).to.be.greaterThan(0);
    expect(r.width).to.be.at.most($i[0].naturalWidth);
  });
}
export const fits = () => cy.document().then((doc) => expect(doc.documentElement.scrollWidth).to.be.at.most(doc.defaultView!.innerWidth));
export function validate(examen: number, term: string, status = 200, id?: number) {
  return request('POST', '/registro-ingreso/validar', { id_examen: examen, dato_estudiante: term }).then((r) => {
    expect(r.status).to.eq(status);
    if (id)
      expect(r.body.id_estudiante).to.eq(id);
    return r.body;
  });
}
export function create() {
  cy.login('admin.e2e@example.test');
  cy.visit('/estudiantes');
  cy.contains('button', 'Añadir Estudiante').click();
  for (const [id, value] of Object.entries({ nombres: 'Carla', apellidos: 'Prueba', codigo_universitario: '202600903', documento_identidad: '9900903', email: 'carla.e2e@example.test' }))
    cy.get(`#${id}`).type(value);
  cy.intercept('POST', '**/estudiantes').as('hu15Create');
  cy.contains('button', /Guardar|Registrar/).click();
  cy.wait('@hu15Create').its('response.statusCode').should('eq', 302);
}
export function changePassword() {
  cy.location('pathname').should('eq', '/cambiar-password');
  for (const [i, value] of ['9900903', 'NuevaClave!2026', 'NuevaClave!2026'].entries())
    cy.get('.form-cambiar .form-group').eq(i).find('input').type(value, { log: false });
  cy.intercept('POST', '**/cambiar-password').as('hu15Password');
  cy.contains('button', 'Guardar contraseña').click();
  cy.wait('@hu15Password').its('response.statusCode').should('eq', 302);
}
export { qrToken };
