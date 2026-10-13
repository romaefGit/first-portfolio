import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { API_URL, ApiResponse, Media } from '../../core/api';

export interface Usuario {
  idusuario: number;
  nombre: string;
  apellidos: string;
  email: string;
  media?: Media | null;
}

export interface Credenciales {
  email: string;
  password: string;
}

export interface Registro extends Credenciales {
  nombre: string;
  apellidos: string;
}

interface LoginResponse extends ApiResponse {
  token: string;
  usuario: Usuario;
}

interface SignupResponse extends ApiResponse {
  autenticacion: Credenciales;
}

/** Mismas claves que usaba satellizer (tokenPrefix "myApp" + tokenName "token"). */
export const TOKEN_KEY = 'myApp_token';
const USUARIO_KEY = 'usuarioLogueado';

/** Reemplaza $auth de satellizer. */
@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);

  readonly usuario = signal<Usuario | null>(readUsuario());

  get token(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  isAuthenticated(): boolean {
    const token = this.token;
    if (!token || !this.usuario()) return false;
    const exp = decodeExp(token);
    return exp === null || exp > Date.now() / 1000;
  }

  login(credenciales: Credenciales): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${API_URL}/usuarios/login`, credenciales).pipe(
      tap((res) => {
        localStorage.setItem(TOKEN_KEY, res.token);
        localStorage.setItem(USUARIO_KEY, JSON.stringify(res.usuario));
        this.usuario.set(res.usuario);
      }),
    );
  }

  signup(registro: Registro): Observable<SignupResponse> {
    return this.http.post<SignupResponse>(`${API_URL}/usuarios/signup`, registro);
  }

  logout(): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USUARIO_KEY);
    this.usuario.set(null);
  }
}

function readUsuario(): Usuario | null {
  try {
    const raw = localStorage.getItem(USUARIO_KEY);
    return raw ? (JSON.parse(raw) as Usuario) : null;
  } catch {
    return null;
  }
}

/** Lee `exp` del JWT que genera server/security/service.js (jwt-simple). */
export function decodeExp(token: string): number | null {
  try {
    const payload = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
    const exp = JSON.parse(atob(payload)).exp;
    return typeof exp === 'number' ? exp : null;
  } catch {
    return 0; // token ilegible = expirado
  }
}
