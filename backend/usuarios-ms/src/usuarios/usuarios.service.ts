import { HttpStatus, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { PrismaService } from 'src/prisma.service';
import { PaginacionDto } from 'src/common';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class UsuariosService {
  private readonly logger = new Logger('Usuarios-MS');

  constructor(private prisma: PrismaService) { }

  create(createUsuarioDto: CreateUsuarioDto) {
    return this.prisma.usuario.create({
      data: createUsuarioDto,
    }) 
  }

  async findAll(paginacionDto: PaginacionDto) {
    const {pagina, limite} = paginacionDto

    const totalPaginas = await this.prisma.usuario.count({
      where: {
        estado: true,
      }
    });
    const ultimaPagina = Math.ceil(totalPaginas / limite!);

    return {

      data: await this.prisma.usuario.findMany({
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
    const user = await this.prisma.usuario.findFirst({
      where: { 
        id,
        estado: true,  
      },
    });

    if (!user) {
      throw new RpcException({
        status: HttpStatus.NOT_FOUND,
        message: `Usuario con el ID #${id} no encontrado`,
      });
    }

    return user;
  }

  async update(id: number, updateUsuarioDto: UpdateUsuarioDto) {

    const {id: __, ...data} = updateUsuarioDto;

    await this.findOne(id);

    return this.prisma.usuario.update({
      where: {id},
      data
    })
  }

  async remove(id: number) {
    await this.findOne(id)

    const usuario = await this.prisma.usuario.update({
      where: {id},
      data: {
        estado: false
      }
    })

    return usuario;
  }
}
