import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('productos')
export class AppController {
  constructor(private readonly appService: AppService) {}

  public datosProductos:any[]=[
    {
      id:1,
      nombre:'Teclado',
      descripcion:'Mecanico rgb',
      url: 'https://http2.mlstatic.com/D_NQ_NP_2X_653274-MPE46957162083_082021-F.webp'
    }
  ];
 

  // Permite crear al producto
  @Post('create')
  Create(@Body() productoCreate: any): any {
  
    let ultimoId = 1;
    let cantProductos = this.datosProductos.length;
    if(cantProductos>0){
      ultimoId = this.datosProductos[cantProductos-1].id +1;
    }
    productoCreate.id = ultimoId;
    this.datosProductos.push(productoCreate);

    return productoCreate;
  }

  // Actualizar producto.
  @Put('update')
  Update(@Body() productoUpdate: any): any {

    // Recorremos los productos que tenemos en cache.
    this.datosProductos.forEach(producto => {
        // Buscamos el producto con el mismo id para editarlo.
      if(producto.id== productoUpdate.id){
        producto.nombre = productoUpdate.nombre;
        producto.descripcion = productoUpdate.descripcion;
        producto.imgUrl = productoUpdate.imgUrl;
      }
    });

    return productoUpdate;
  }

  
  // Obtener todos los productos
  @Get()
  Gets():any[] {
    let Productos = this.datosProductos;
    return Productos;
  }

  
  // Obtener todos los productos
  @Delete(':id/delete')
  Delete(@Param('id') id):any[] {
    let Productos = this.datosProductos.filter(producto => producto.id != id);

    this.datosProductos = Productos;
    return Productos;
  }
}
