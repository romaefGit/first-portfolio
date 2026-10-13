import { Component, inject } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService, Articulo } from '../../services/api.service';
import { CrudPage } from '../../shared/crud-page';
import { CrudTabs } from '../../shared/crud-tabs';
import { ImageUpload } from '../../shared/image-upload';

@Component({
  selector: 'app-articulos',
  imports: [CrudTabs, FormsModule, ImageUpload, NgTemplateOutlet],
  templateUrl: './articulos.html',
})
export class Articulos extends CrudPage<Articulo> {
  protected readonly api = inject(ApiService).articulos;
  protected readonly idKey = 'idarticulo';
  protected readonly nombre = 'artículo';

  protected crear(form: Partial<Articulo>): void {
    this.save(this.api.create({ articulo: this.toBody(form) }), null);
  }

  protected editar(form: Articulo): void {
    const id = form.idarticulo;
    this.save(this.api.update(id, { articulo: this.toBody(form) }), id, 'Se actualizó correctamente el artículo.');
  }

  private toBody(form: Partial<Articulo>) {
    return {
      titulo: form.titulo,
      descripcion: form.descripcion,
      meta_description: form.meta_description,
      og_title: form.og_title,
    };
  }
}
