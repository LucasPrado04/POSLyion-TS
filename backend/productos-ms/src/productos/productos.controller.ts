import { Controller, ParseIntPipe } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ProductosService } from './productos.service';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { PaginacionDto } from 'src/common';

@Controller('productos')
export class ProductosController {
  constructor(private readonly productosService: ProductosService) {}

  @MessagePattern({cmd: 'crear_producto'})
  create(@Payload() createProductoDto: CreateProductoDto) {
    return this.productosService.create(createProductoDto);
  }

  @MessagePattern({cmd: 'buscar_todos_productos'})
  findAll(@Payload() paginacionDto: PaginacionDto) {
    return this.productosService.findAll(paginacionDto);
  }

  @MessagePattern({cmd: 'buscar_un_producto'})
  findOne(@Payload('id', ParseIntPipe) id: number) {
    return this.productosService.findOne(id);
  }

  @MessagePattern({cmd: 'actualizar_producto'})
  update(@Payload() updateProductoDto: UpdateProductoDto) {
    return this.productosService.update(updateProductoDto.id, updateProductoDto);
  }

  @MessagePattern({cmd: 'eliminar_producto'})
  remove(@Payload('id', ParseIntPipe) id: number) {
    return this.productosService.remove(id);
  }

  @MessagePattern({cmd: 'validar_productos'})
  validateProducts(@Payload() ids: number[]) {
    return this.productosService.validateProducts(ids);
  }
}
