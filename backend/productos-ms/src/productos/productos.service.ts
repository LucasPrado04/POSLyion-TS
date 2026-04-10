import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { PrismaService } from 'src/prisma.service';
import { PaginacionDto } from 'src/common';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class ProductosService {
  constructor(private prisma: PrismaService) {}

  create(createProductoDto: CreateProductoDto) {
    return this.prisma.producto.create({
      data: createProductoDto,
    })
  }

  async findAll(paginacionDto: PaginacionDto) {
    const {pagina, limite} = paginacionDto

    const totalPaginas = await this.prisma.producto.count({
      where: {
        estado: true,
      }
    });
    const ultimaPagina = Math.ceil(totalPaginas / limite!);

    return {
      data: await this.prisma.producto.findMany({
        skip: (pagina! - 1) * limite!,
        take: limite,
        where: {
          estado: true,
        }
      }),
      meta: {
        totalPaginas,
        pagina,
        ultimaPagina,
      }
    }
  }

  async findOne(id: number) {
    const producto = await this.prisma.producto.findFirst({
      where: {
        id,
        estado: true,
      }
    });

    if(!producto) {
      throw new RpcException({
        status: HttpStatus.NOT_FOUND,
        message: `Producto con el id #${id} no encontrado`
      });
    }

    return producto;
  }


  async update(id: number, updateProductoDto: UpdateProductoDto) {
    const {id: ___, ...data} = updateProductoDto;
    
    await this.findOne(id);

    return await this.prisma.producto.update({
      where: {id},
      data
    })
  }

  async remove(id: number) {
    await this.findOne(id);

    const producto = await this.prisma.producto.update({
      where: {id},
      data: {
        estado: false,
      }
    });

    return producto;
  }

  async validateProducts(ids: number[]) {
    ids = Array.from(new Set(ids)); // Eliminar ids duplicados

    const productos = await this.prisma.producto.findMany({
      where: {
        id: {
          in: ids
        }
      }
    });

    if (productos.length !== ids.length) {
      throw new RpcException({
        message: 'Algunos productos no existen en la base de datos',
        status: HttpStatus.BAD_REQUEST,
      }); 
    }

    return productos;
  }
}
