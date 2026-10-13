/** Relativo para que funcione igual servido por Express o detrás del proxy de `ng serve`. */
export const API_URL = '/server/api';

/** Respuesta base que devuelven todos los controladores de /server. */
export interface ApiResponse {
  status: boolean;
  message: string;
}

export interface Media {
  idmedia: number;
  url: string;
}
