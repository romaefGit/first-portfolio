import { Component, OnInit, inject, signal } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService, Empresa, Language } from '../../services/api.service';
import { CrudPage } from '../../shared/crud-page';
import { CrudTabs } from '../../shared/crud-tabs';
import { ImageUpload } from '../../shared/image-upload';
import { MultiSelect } from '../../shared/multi-select';

@Component({
  selector: 'app-empresas',
  imports: [CrudTabs, FormsModule, ImageUpload, MultiSelect, NgTemplateOutlet],
  templateUrl: './empresas.html',
})
export class Empresas extends CrudPage<Empresa> implements OnInit {
  private readonly apiService = inject(ApiService);
  protected readonly api = this.apiService.empresas;
  protected readonly idKey = 'idempresa';
  protected readonly nombre = 'empresa';

  /** Sugerencias del selector (GET /languages/nombre). */
  protected readonly languages = signal<Language[]>([]);
  /** Lenguajes escogidos en el formulario activo (crear o editar). */
  protected readonly seleccionados = signal<Language[]>([]);
  /** Lenguajes que tenía la empresa al abrir "Editar". */
  private originales: Language[] = [];

  override ngOnInit(): void {
    super.ngOnInit();
    this.apiService.languagesBy('nombre').subscribe({
      next: (languages) => this.languages.set(languages),
      error: (err) => this.messages.error(err),
    });
  }

  protected override setTab(tab: 1 | 2 | 3): void {
    if (tab !== 3) {
      this.seleccionados.set([]);
      this.originales = [];
    }
    super.setTab(tab);
  }

  protected override openEdit(empresa: Empresa): void {
    super.openEdit(empresa);
    this.seleccionados.set([]);
    this.apiService.empresaLanguages(empresa.idempresa).subscribe({
      next: (languages) => {
        this.originales = languages;
        this.seleccionados.set([...languages]);
      },
      error: (err) => this.messages.error(err),
    });
  }

  protected crear(form: Partial<Empresa>): void {
    // el servidor no responde si la lista llega vacía (createLanguagesEmpresas)
    if (!this.seleccionados().length) {
      this.messages.alert({ type: 'warning', title: 'Mensaje', message: 'Debe seleccionar al menos un lenguaje' });
      return;
    }
    this.save(this.api.create({ empresa: this.toBody(form), languages: this.seleccionados() }), null);
  }

  protected editar(form: Empresa): void {
    if (!this.seleccionados().length) {
      this.messages.alert({ type: 'warning', title: 'Mensaje', message: 'Debe seleccionar al menos un lenguaje' });
      return;
    }
    const id = form.idempresa;
    const body = { empresa: this.toBody(form), theLanguagesWereEdited: this.languageChanges() };
    this.save(this.api.update(id, body), id, 'Se actualizó correctamente la empresa.');
  }

  /** Formato que espera editEmpresa en el servidor. */
  private languageChanges() {
    const ids = (list: Language[]) => new Set(list.map((l) => l.idlanguage));
    const antes = ids(this.originales);
    const ahora = ids(this.seleccionados());
    const nuevos = this.seleccionados().filter((l) => !antes.has(l.idlanguage));
    const eliminados = this.originales.filter((l) => !ahora.has(l.idlanguage));
    return { status: nuevos.length > 0 || eliminados.length > 0, nuevos, eliminados };
  }

  private toBody(form: Partial<Empresa>) {
    return {
      nombre: form.nombre,
      selector: form.selector,
      propiedades: form.propiedades,
      descripcion: form.descripcion,
    };
  }
}
