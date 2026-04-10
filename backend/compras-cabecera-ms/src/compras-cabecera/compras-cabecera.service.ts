import { HttpStatus, Inject, Injectable, Logger, PreconditionFailedException } from '@nestjs/common';
import { CreateComprasCabeceraDto } from './dto/create-compras-cabecera.dto';
import { PrismaService } from 'src/prisma.service';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { CambiarEstadoCompraDto, ComprasPaginacionDto } from './dto';
import { PRODUCTO_SERVICE } from 'src/config';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ComprasCabeceraService {

  private readonly logger = new Logger('Compras-Cabecera-MS');

  constructor(
    private prisma: PrismaService,
    @Inject(PRODUCTO_SERVICE) private readonly productoClient: ClientProxy,
  ) {
    this.logger.log('Servicio de Compras-Cabecera iniciado');
  }

  async create(createComprasCabeceraDto: CreateComprasCabeceraDto) {
    try {
      // Confirmar que los productos con los IDs enviados existen
      const idProductos = createComprasCabeceraDto.items.map(item => item.idProducto)
      const productos: any[] = await firstValueFrom(this.productoClient.send(
        { cmd: 'validar_productos' },
        idProductos,
      ));

      // Calcular el monto total de la compra
      const montoTotal = createComprasCabeceraDto.items.reduce((acumulacion, articuloCompra) => {
        const precio = productos.find(
          (producto) => producto.id === articuloCompra.idProducto,
        ).precio;
        return acumulacion + (precio * articuloCompra.cantidad);
      }, 0);

      // Calcular la cantida de items de la compra
      const totalProductos = createComprasCabeceraDto.items.reduce((acumulacion, articuloCompra) => {
        return acumulacion + articuloCompra.cantidad;
      }, 0)

      // Crear una transacción de base de datos
      const compra = await this.prisma.compraCabecera.create({
        data: {
          montoTotal,
          totalProductos,
          ArticuloCompra: {
            createMany: {
              data: createComprasCabeceraDto.items.map((articuloCompra) => ({
                precio: productos.find(
                  (producto) => producto.id === articuloCompra.idProducto
                ).precio,
                idProducto: articuloCompra.idProducto,
                cantidad: articuloCompra.cantidad,
              })),
            },
          },
        },
        include: {
          ArticuloCompra: {
            select: {
              idProducto: true,
              cantidad: true,
              precio: true,
            },
          },
        },
      });

      return {
        ...compra,
        ArticuloCompra: compra.ArticuloCompra.map((articuloCompra) => ({
          ...articuloCompra,
          nombre: productos.find(
            (producto) => producto.id === articuloCompra.idProducto
          ).nombre,
        })),
      }
    } catch (error) {
      throw new RpcException({
        message: 'Algunos productos no existen en la base de datos',
        status: HttpStatus.BAD_REQUEST,
      });
    }

  }

  async findAll(comprasPaginacionDto: ComprasPaginacionDto) {
    const { pagina, limite, estado } = comprasPaginacionDto;

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
      include: {
        ArticuloCompra: {
          select: {
            idProducto: true,
            precio: true,
            cantidad: true,
          }
        }
      }
    });

    if (!compraCabecera) {
      throw new RpcException({
        status: HttpStatus.NOT_FOUND,
        message: `Compra con el id #${id} no encontrada`,
      });
    }

    const idsProductos = compraCabecera.ArticuloCompra.map(
      (articuloCompra) => articuloCompra.idProducto
    );

    const productos: any[] = await firstValueFrom(this.productoClient.send(
      { cmd: 'validar_productos' },
      idsProductos,
    ))

    return {
      ...compraCabecera,
      ArticuloCompra: compraCabecera.ArticuloCompra.map((articuloCompra) => ({
        ...articuloCompra,
        nombre: productos.find(
          (producto) => producto.id === articuloCompra.idProducto
        ).nombre,
      })),
    };
  }

  async changeStatus(cambiarEstadoCompraDto: CambiarEstadoCompraDto) {
    const { id, estado } = cambiarEstadoCompraDto;

    const compra = await this.findOne(id);

    // if (estado === compra.estado) {
    //   return compra;
    // }

    return this.prisma.compraCabecera.update({
      where: { id },
      data: { estado },
    });
  }
}
