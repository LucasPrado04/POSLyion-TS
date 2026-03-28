import { Injectable, Logger } from '@nestjs/common';
import { CreateComprasCabeceraDto } from './dto/create-compras-cabecera.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ComprasCabeceraService {

  private readonly logger = new Logger('Compras-Cabecera-MS');

  constructor(private prisma: PrismaService) {
    this.logger.log('Servicio de Compras-Cabecera iniciado');
  }

  create(createComprasCabeceraDto: CreateComprasCabeceraDto) {
    return createComprasCabeceraDto;
  }

  findAll() {
    return `This action returns all comprasCabecera`;
  }

  findOne(id: number) {
    return `This action returns a #${id} comprasCabecera`;
  }
}
