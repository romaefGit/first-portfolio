import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { API_URL, ApiResponse, Media } from '../../core/api';
import { Usuario } from '../auth/auth.service';

export interface Language {
  idlanguage: number;
  nombre: string;
  porcentaje: string | number;
  selector: string;
  descripcion: string;
  tipo: string;
  media?: Media | null;
}

export interface Empresa {
  idempresa: number;
  nombre: string;
  selector: string;
  descripcion: string;
  propiedades: string;
  media?: Media | null;
}

export interface Articulo {
  idarticulo: number;
  titulo: string;
  descripcion: string;
  meta_description: string;
  og_title: string;
  media?: Media | null;
}

export interface SaveResponse extends ApiResponse {
  [id: string]: unknown;
}

export interface UploadResponse extends ApiResponse {
  media?: Media;
}

/** Operaciones comunes a /languages, /empresas y /articulos. */
export interface CrudApi<T> {
  /** Carpeta pública de las imágenes (/languages-img, ...). */
  readonly imgBase: string;
  list(): Observable<T[]>;
  create(body: object): Observable<SaveResponse>;
  update(id: number, body: object): Observable<SaveResponse>;
  remove(id: number, media?: Media | null): Observable<ApiResponse>;
  uploadImage(id: number, file: File): Observable<UploadResponse>;
}

@Injectable({ providedIn: 'root' })
export class ApiService {
  private readonly http = inject(HttpClient);

  readonly languages = this.crud<Language>({ resource: 'languages', listPath: '/', listKey: 'languages', media: 'language' });
  readonly empresas = this.crud<Empresa>({ resource: 'empresas', listPath: '/all', listKey: 'empresas', media: 'empresa' });
  readonly articulos = this.crud<Articulo>({ resource: 'articulos', listPath: '/', listKey: 'Articulos', media: 'articulo' });

  /** GET /languages/:by — lista ordenada (la usa empresas para el selector). */
  languagesBy(by: string): Observable<Language[]> {
    return this.http.get<{ languages: Language[] }>(`${API_URL}/languages/${by}`).pipe(map((r) => r.languages ?? []));
  }

  empresaLanguages(idempresa: number): Observable<Language[]> {
    return this.http
      .get<{ languages: Language[] }>(`${API_URL}/empresas/${idempresa}/languages`)
      .pipe(map((r) => r.languages ?? []));
  }

  getUsuario(id: number): Observable<Usuario> {
    return this.http.get<{ usuario: Usuario }>(`${API_URL}/usuarios/${id}`).pipe(map((r) => r.usuario));
  }

  updateUsuario(id: number, usuario: object): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${API_URL}/usuarios/${id}`, { usuario });
  }

  updatePassword(id: number, usuario: object): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${API_URL}/usuarios/password/${id}`, { usuario });
  }

  uploadUserImage(id: number, file: File): Observable<UploadResponse> {
    return this.upload(`${API_URL}/medias/upload-img-user/${id}`, file);
  }

  deleteUserImage(idusuario: number, media: Media): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${API_URL}/medias/delete-img-user`, { media, idusuario });
  }

  private upload(url: string, file: File): Observable<UploadResponse> {
    const body = new FormData();
    body.append('file', file); // multer .single('file')
    return this.http.post<UploadResponse>(url, body);
  }

  private crud<T>(cfg: { resource: string; listPath: string; listKey: string; media: string }): CrudApi<T> {
    const base = `${API_URL}/${cfg.resource}`;
    return {
      imgBase: `/${cfg.resource}-img`,
      list: () => this.http.get<Record<string, T[]>>(base + cfg.listPath).pipe(map((r) => r[cfg.listKey] ?? [])),
      create: (body) => this.http.post<SaveResponse>(`${base}/`, body),
      update: (id, body) => this.http.put<SaveResponse>(`${base}/${id}`, body),
      remove: (id, media) =>
        this.http.delete<ApiResponse>(media ? `${base}/${id}/${media.idmedia}/${encodeURIComponent(media.url)}` : `${base}/${id}`),
      uploadImage: (id, file) => this.upload(`${API_URL}/medias/upload-img-${cfg.media}/${id}`, file),
    };
  }
}
