import { Component, inject } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService, Language } from '../../services/api.service';
import { CrudPage } from '../../shared/crud-page';
import { CrudTabs } from '../../shared/crud-tabs';
import { ImageUpload } from '../../shared/image-upload';

const TIPOS = [
  { id: 1, nombre: 'Front' },
  { id: 2, nombre: 'Midle' },
  { id: 3, nombre: 'Back' },
] as const;

type LanguageForm = Partial<Language> & { tipoId?: number };

@Component({
  selector: 'app-languages',
  imports: [CrudTabs, FormsModule, ImageUpload, NgTemplateOutlet],
  templateUrl: './languages.html',
})
export class Languages extends CrudPage<Language> {
  protected readonly api = inject(ApiService).languages;
  protected readonly idKey = 'idlanguage';
  protected readonly nombre = 'lenguaje';
  protected readonly tipos = TIPOS;

  protected override openEdit(language: Language): void {
    super.openEdit(language);
    const form = this.editando() as LanguageForm;
    form.porcentaje = parseInt(String(form.porcentaje), 10);
    form.tipoId = TIPOS.find((t) => t.nombre === language.tipo)?.id;
  }

  protected crear(form: LanguageForm): void {
    this.save(this.api.create({ language: this.toBody(form) }), null);
  }

  protected editar(form: LanguageForm): void {
    const id = this.idOf(form as Language);
    this.save(this.api.update(id, { language: this.toBody(form) }), id, 'Se actualizó correctamente el lenguaje.');
  }

  /** El servidor guarda `tipo.nombre`. */
  private toBody(form: LanguageForm) {
    return {
      nombre: form.nombre,
      porcentaje: form.porcentaje,
      tipo: TIPOS.find((t) => t.id === Number(form.tipoId)),
      selector: form.selector,
      descripcion: form.descripcion,
    };
  }
}
