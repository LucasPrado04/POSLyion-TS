import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, Query, ParseIntPipe } from '@nestjs/common';
import { CreateProductoDto } from './dto-productos/create-producto.dto';
import { UpdateProductoDto } from './dto-productos/update-producto.dto';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { NATS_SERVICE } from 'src/configs';
import { firstValueFrom } from 'rxjs';
import { PaginacionDto } from 'src/common';

@Controller('productos')
export class ProductosController {
  constructor(
    @Inject (NATS_SERVICE) private readonly client: ClientProxy,
  ) {}

  @Post()
  async create(@Body() createProductoDto: CreateProductoDto) {
    try {
      const result = await firstValueFrom(
        this.client.send(
          {cmd: 'crear_producto'},
          createProductoDto,
        )
      );
      return result;
    } catch (error) {
      throw new RpcException(error);
    }
  }


  @Get()
  async findAll(@Query() paginacionDto: PaginacionDto) {
    try {
      const result = await firstValueFrom(
        this.client.send(
          {cmd: 'buscar_todos_productos'},
          paginacionDto,
        )
      );
      return result;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    try {
      const result = await firstValueFrom(
        this.client.send(
          {cmd: 'buscar_un_producto'},
          {id},
        )
      );
      return result;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number, 
    @Body() updateProductoDto: UpdateProductoDto) 
    {
    try {
      const result = await firstValueFrom(
        this.client.send(
          {cmd: 'actualizar_producto'},
          {id, ...updateProductoDto}
        )
      );
      return result;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    try {
      const result = await firstValueFrom(
        this.client.send(
          {cmd: 'eliminar_producto'},
          {id},
        )
      );
      return result;
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
