import { Controller, Get, Post, Body, Patch, Param, Inject, ParseUUIDPipe, Query } from '@nestjs/common';
import { CreateComprasCabeceraDto } from './dto/create-compras-cabecera.dto';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { COMPRAS_CABECERA_SERVICE } from 'src/configs';
import { firstValueFrom } from 'rxjs';
import { ComprasPaginacionDto, EstadoDto } from './dto';
import { PaginacionDto } from '../common/dto/paginacion.dto';

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
  async findAll(@Query() comprasPaginacionDto: ComprasPaginacionDto) {
    try {
      const result = await firstValueFrom(
        this.comprasCabeceraService.send(
          {cmd: 'buscar_todas_compras_cabecera'},
          comprasPaginacionDto,
        )
      );
      return result;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Get(':estado')
  async findAllByStatus(
    @Param() estadoDto: EstadoDto,
    @Query() paginacionDto: PaginacionDto,
  ) {
    try {
      const result = await firstValueFrom(
        this.comprasCabeceraService.send(
          {cmd: 'buscar_todas_compras_cabecera'},
          {
            ...paginacionDto,
            estado: estadoDto.estado,
          },
        )
      );
      return result;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Get('id/:id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    try {
      const result = await firstValueFrom(
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
  async changeOrderStatus(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() estadoDto: EstadoDto,
  ) {
    try {
      const result = await firstValueFrom(
        this.comprasCabeceraService.send(
          {cmd: 'cambiar_estado_compras_cabecera'},
          {id, estado: estadoDto.estado},
        )
      );
      return result;
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
