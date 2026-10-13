import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Empresas } from './empresas';

const js = { idlanguage: 1, nombre: 'JavaScript' };
const node = { idlanguage: 2, nombre: 'NodeJs' };
const php = { idlanguage: 3, nombre: 'PHP' };

describe('Empresas', () => {
  it('al editar envía solo los lenguajes agregados y quitados', async () => {
    TestBed.configureTestingModule({ providers: [provideHttpClient(), provideHttpClientTesting()] });
    const http = TestBed.inject(HttpTestingController);
    const fixture = TestBed.createComponent(Empresas);
    const page = fixture.componentInstance as unknown as Record<string, any>;
    fixture.detectChanges();
    http.expectOne('/server/api/empresas/all').flush({ empresas: [] });
    http.expectOne('/server/api/languages/nombre').flush({ languages: [js, node, php] });

    const empresa = { idempresa: 7, nombre: 'Grimorum', selector: 'g', descripcion: 'd', propiedades: 'p' };
    page['openEdit'](empresa);
    http.expectOne('/server/api/empresas/7/languages').flush({ languages: [js, node] });

    page['seleccionados'].set([js, php]); // quita NodeJs, agrega PHP
    page['editar'](page['editando']());

    const req = http.expectOne('/server/api/empresas/7');
    expect(req.request.method).toBe('PUT');
    expect(req.request.body.theLanguagesWereEdited).toEqual({ status: true, nuevos: [php], eliminados: [node] });
    req.flush({ status: true, message: 'ok' });
    http.expectOne('/server/api/empresas/all').flush({ empresas: [] });
    http.verify();
  });
});
