import { Controller, NotImplementedException, ParseIntPipe } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ComprasCabeceraService } from './compras-cabecera.service';
import { CreateComprasCabeceraDto } from './dto/create-compras-cabecera.dto';

@Controller()
export class ComprasCabeceraController {
  constructor(private readonly comprasCabeceraService: ComprasCabeceraService) {}

  @MessagePattern({cmd: 'crear_compra_cabecera'})
  create(@Payload() createComprasCabeceraDto: CreateComprasCabeceraDto) {
    return this.comprasCabeceraService.create(createComprasCabeceraDto);
  }

  @MessagePattern({cmd: 'buscar_todas_compras_cabecera'})
  findAll() {
    return this.comprasCabeceraService.findAll();
  }

  @MessagePattern({cmd: 'buscar_compras_cabecera'})
  findOne(@Payload('id', ParseIntPipe) id: number) {
    return this.comprasCabeceraService.findOne(id);
  }

  @MessagePattern({cmd: 'cambiar_estado_compras_cabecera'})
  changeOrderStatus() {
    throw new NotImplementedException();
  }
}
