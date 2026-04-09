import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreateComprasCabeceraDto } from './dto/create-compras-cabecera.dto';
import { PrismaService } from 'src/prisma.service';
import { RpcException } from '@nestjs/microservices';
import { CambiarEstadoCompraDto, ComprasPaginacionDto } from './dto';

@Injectable()
export class ComprasCabeceraService {

  private readonly logger = new Logger('Compras-Cabecera-MS');

  constructor(private prisma: PrismaService) {
    this.logger.log('Servicio de Compras-Cabecera iniciado');
  }

  create(createComprasCabeceraDto: CreateComprasCabeceraDto) {
    return {
      service: 'Microservicio de Compras',
      createComprasCabeceraDto,
    }
    // return this.prisma.compraCabecera.create({
    //   data: createComprasCabeceraDto,
    // });
  }

  async findAll(comprasPaginacionDto: ComprasPaginacionDto) {
    const {pagina, limite, estado} = comprasPaginacionDto;

    const totalCompras = await this.prisma.compraCabecera.count({
      where: {
        estado: estado || undefined,
      }
    });
    const ultimaPagina = Math.ceil(totalCompras / limite!);

    return {
      data: await this.prisma.compraCabecera.findMany({
        skip: (pagina! - 1) * limite!,
        take: limite,
        where: {
          estado: estado || undefined,
        }
      }),
      meta: {
        total: totalCompras,
        paginaActual: pagina,
        ultimaPagina
      }
    }
  }

  async findOne(id: string) {
    const compraCabecera = await this.prisma.compraCabecera.findFirst({
      where: { id },
    });

    if(!compraCabecera) {
      throw new RpcException({
        status: HttpStatus.NOT_FOUND,
        message: `Compra con el id #${id} no encontrada`,
      });
    }

    return compraCabecera;
  }

  async changeStatus(cambiarEstadoCompraDto: CambiarEstadoCompraDto) {
    const { id, estado } = cambiarEstadoCompraDto;

    const compra = await this.findOne(id);

    if(estado === compra.estado) {
      return compra;
    }

    return this.prisma.compraCabecera.update({
      where: { id },
      data: { estado },
    });
  }
}
