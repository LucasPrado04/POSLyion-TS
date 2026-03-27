import { Injectable } from '@nestjs/common';
import { CreateComprasCabeceraDto } from './dto/create-compras-cabecera.dto';

@Injectable()
export class ComprasCabeceraService {
  create(createComprasCabeceraDto: CreateComprasCabeceraDto) {
    return 'This action adds a new comprasCabecera';
  }

  findAll() {
    return `This action returns all comprasCabecera`;
  }

  findOne(id: number) {
    return `This action returns a #${id} comprasCabecera`;
  }
}
