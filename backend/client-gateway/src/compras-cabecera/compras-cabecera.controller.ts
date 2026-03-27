import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, ParseIntPipe } from '@nestjs/common';
import { CreateComprasCabeceraDto } from './dto/create-compras-cabecera.dto';
import { UpdateComprasCabeceraDto } from './dto/update-compras-cabecera.dto';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { COMPRAS_CABECERA_SERVICE } from 'src/configs';
import { firstValueFrom } from 'rxjs';

@Controller('compras-cabecera')
export class ComprasCabeceraController {
  constructor(
    @Inject(COMPRAS_CABECERA_SERVICE) private readonly comprasCabeceraService: ClientProxy,
  ) {}

  @Post()
  async create(@Body() createComprasCabeceraDto: CreateComprasCabeceraDto) {
    try {
      const result = await firstValueFrom(
        this.comprasCabeceraService.send(
          {cmd: 'crear_compra_cabecera'},
          createComprasCabeceraDto, 
        )
      );
      return result;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Get()
  async findAll() {
    try {
      const result = await firstValueFrom(
        this.comprasCabeceraService.send(
          {cmd: 'buscar_todas_compras_cabecera'},
          { }
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
      const result = firstValueFrom(
        this.comprasCabeceraService.send(
          {cmd: 'buscar_compras_cabecera'},
          {id},
        )
      );
      return result;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Patch(':id')
  async changeOrderStatus(@Param('id', ParseIntPipe) id: number) {
    try {
      const result = await firstValueFrom(
        this.comprasCabeceraService.send(
          {cmd: 'cambiar_estado_compras_cabecera'},
          {id},
        )
      );
      return result;
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
