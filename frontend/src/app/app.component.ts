import { Component } from '@angular/core';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {


  public title = 'Playgrouplatam Full Stack';
  public listProductos: any[] = <any>[];
  public productoForm = {
    id: 0,
    nombre: '',
    descripcion: '',
    url: ''
  }
  public isConectionServer = false;


  constructor(
    private _productoService: AppService,
  ) { }



  private async RegistrarNuevoProducto(): Promise<boolean> {

    return await Promise.resolve(true).then(
      result => {

        if (!this.productoForm.nombre) { alert('Ingrese un nombre'); throw '' }

        if (this.isConectionServer) {

          return this._productoService.Create(this.productoForm).pipe().toPromise()
        } else {

          let ultimoId = 1;
          let cantProductos = this.listProductos.length;
          if (cantProductos > 0) {
            ultimoId = this.listProductos[cantProductos - 1].id + 1;
          }
          this.productoForm.id = ultimoId;
          this.listProductos.push(this.productoForm);


          this.listProductos.push()
          return this.productoForm;
        }
      }
    ).then(
      result => {

        return true;
      }
    )
  }



  private async ActualizarUnProducto(): Promise<boolean> {

    return await Promise.resolve(true).then(
      result => {

        if (!this.productoForm.nombre) { alert('Ingrese un nombre'); throw '' }

        if (this.isConectionServer) {
          return this._productoService.Update(this.productoForm).pipe().toPromise()
        } else {
          // Recorremos los productos que tenemos en cache.
          this.listProductos.forEach(producto => {
            // Buscamos el producto con el mismo id para editarlo.
            if (producto.id == this.productoForm.id) {
              producto.nombre = this.productoForm.nombre;
              producto.descripcion = this.productoForm.descripcion;
              producto.url = this.productoForm.url;
            }
          });

          return this.productoForm;
        }
      }
    ).then(
      result => {

        return true;
      }
    )
  }

  public async ClickSave() {

    return await Promise.resolve(true).then(
      result => {
        if (!this.productoForm.id) {
          return this.RegistrarNuevoProducto();
        } else {
          return this.ActualizarUnProducto();
        }
      }
    ).then(
      result => {

        if (!result) {
          console.error('No se registraron correctamente los datos.')
        }

        return this.ObtenerListaDeProductos();
      }
    ).then(
      result => {

        if (!result) {
          console.error('No se pudo conectar al servidor para obtener la lista producto.')
        };

        if (!this.productoForm.id) {

          alert('Se registro los datos correctamente.')

        } else {

          alert('Se actualizaron los datos correctamente.')

        }

        this.RefreshForm();

        return true;
      }
    )


  }


  public async ClickEditar(productoId: number) {

    return await Promise.resolve(true).then(
      result => {

        let buscarUser = this.listProductos.find(producto => producto.id == productoId);
        if (!buscarUser) { alert('No se encontro el producto que busca.') }
        else {

          this.productoForm = JSON.parse(JSON.stringify(buscarUser));
        }
        return true;
      }
    )
  }


  public async ClickCancel() {

    return await Promise.resolve(true).then(
      result => {


        this.RefreshForm();

        return true;
      }
    )
  }

  public RefreshForm() {
    this.productoForm = {
      id: 0,
      nombre: '',
      descripcion: '',
      url: ''
    };
  }

  public async ClickDelete(productoId: number) {
    if (confirm('Esta seguro que desea eliminar el siguiente registro?')) {
      await this.EliminarProducto(productoId);
    } else {

    }
  }

  public async EliminarProducto(productoId: number) {

    return await Promise.resolve(true).then(
      result => {

        if (this.isConectionServer) {
          return this._productoService.Delete(productoId).pipe().toPromise()
        } else {
          let productos = this.listProductos.filter(producto => producto.id != productoId);

          return productos;
        }
      }
    ).then(
      result => {

        this.listProductos = result;

        this.RefreshForm()
        return true;
      }
    )
  }


  public async ObtenerListaDeProductos(): Promise<boolean> {

    return await Promise.resolve(true).then(
      result => {

        if (this.isConectionServer) {

          return this._productoService.Get().pipe().toPromise()
        }
        else {
          return this.listProductos;
        }
      }
    ).then(
      result => {
        this.listProductos = result;
        return true;
      }
    )
  }

}
