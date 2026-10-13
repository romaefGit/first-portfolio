import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Router, UrlTree, provideRouter } from '@angular/router';
import { authGuard } from './auth.guard';
import { authInterceptor } from './auth.interceptor';
import { AuthService, TOKEN_KEY, decodeExp } from './auth.service';

const usuario = { idusuario: 1, nombre: 'Romario', apellidos: 'Estrada', email: 'r@x.com' };

function jwt(exp: number): string {
  const b64 = (o: object) => btoa(JSON.stringify(o)).replace(/=+$/, '').replace(/\+/g, '-').replace(/\//g, '_');
  return `${b64({ typ: 'JWT', alg: 'HS256' })}.${b64({ sub: 1, exp })}.firma`;
}

const now = () => Math.floor(Date.now() / 1000);

describe('auth', () => {
  let http: HttpTestingController;
  let auth: AuthService;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({
      providers: [
        provideRouter([{ path: 'admin/login', children: [] }]),
        provideHttpClient(withInterceptors([authInterceptor])),
        provideHttpClientTesting(),
      ],
    });
    http = TestBed.inject(HttpTestingController);
    auth = TestBed.inject(AuthService);
  });

  afterEach(() => http.verify());

  it('decodeExp lee el exp del JWT y trata un token ilegible como expirado', () => {
    expect(decodeExp(jwt(123))).toBe(123);
    expect(decodeExp('basura')).toBe(0);
  });

  it('login guarda el token con la clave de satellizer y el usuario', () => {
    const token = jwt(now() + 3600);
    auth.login({ email: 'r@x.com', password: 'x' }).subscribe();
    http.expectOne('/server/api/usuarios/login').flush({ status: true, message: '', token, usuario });

    expect(localStorage.getItem(TOKEN_KEY)).toBe(token);
    expect(auth.usuario()).toEqual(usuario);
    expect(auth.isAuthenticated()).toBe(true);
  });

  it('un token expirado no cuenta como sesión', () => {
    localStorage.setItem(TOKEN_KEY, jwt(now() - 10));
    auth.usuario.set(usuario);
    expect(auth.isAuthenticated()).toBe(false);
  });

  it('el interceptor agrega Bearer solo a la API', () => {
    localStorage.setItem(TOKEN_KEY, 'abc');
    const client = TestBed.inject(HttpClient);
    client.get('/server/api/languages/').subscribe();
    client.get('/public/algo.json').subscribe();

    expect(http.expectOne('/server/api/languages/').request.headers.get('Authorization')).toBe('Bearer abc');
    expect(http.expectOne('/public/algo.json').request.headers.has('Authorization')).toBe(false);
  });

  it('un 401 cierra la sesión', () => {
    localStorage.setItem(TOKEN_KEY, jwt(now() + 3600));
    auth.usuario.set(usuario);
    TestBed.inject(HttpClient).get('/server/api/usuarios/1').subscribe({ error: () => {} });
    http.expectOne('/server/api/usuarios/1').flush({ message: 'El token ha expirado' }, { status: 401, statusText: '' });

    expect(localStorage.getItem(TOKEN_KEY)).toBeNull();
    expect(auth.usuario()).toBeNull();
  });

  it('authGuard deja pasar con sesión y si no manda a /admin/login', () => {
    const run = () => TestBed.runInInjectionContext(() => authGuard({} as never, {} as never));
    const router = TestBed.inject(Router);

    const sinSesion = run() as UrlTree;
    expect(router.serializeUrl(sinSesion)).toBe('/admin/login');

    localStorage.setItem(TOKEN_KEY, jwt(now() + 3600));
    auth.usuario.set(usuario);
    expect(run()).toBe(true);
  });
});
