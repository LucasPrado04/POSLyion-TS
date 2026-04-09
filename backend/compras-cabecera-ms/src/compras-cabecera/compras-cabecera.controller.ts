import { Controller, ParseUUIDPipe } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ComprasCabeceraService } from './compras-cabecera.service';
import { CreateComprasCabeceraDto, ComprasPaginacionDto, CambiarEstadoCompraDto } from './dto';

@Controller()
export class ComprasCabeceraController {
  constructor(private readonly comprasCabeceraService: ComprasCabeceraService) {}

  @MessagePattern({cmd: 'crear_compra_cabecera'})
  create(@Payload() createComprasCabeceraDto: CreateComprasCabeceraDto) {
    return this.comprasCabeceraService.create(createComprasCabeceraDto);
  }

  @MessagePattern({cmd: 'buscar_todas_compras_cabecera'})
  findAll(@Payload() comprasPaginacionDto: ComprasPaginacionDto) {
    return this.comprasCabeceraService.findAll(comprasPaginacionDto);
  }

  @MessagePattern({cmd: 'buscar_compras_cabecera'})
  findOne(@Payload('id', ParseUUIDPipe) id: string) {
    return this.comprasCabeceraService.findOne(id);
  }

  @MessagePattern({cmd: 'cambiar_estado_compras_cabecera'})
  changeOrderStatus(@Payload() cambiarEstadoCompraDto: CambiarEstadoCompraDto) {
    return this.comprasCabeceraService.changeStatus(cambiarEstadoCompraDto);
  }
}
