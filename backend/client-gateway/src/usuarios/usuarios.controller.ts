import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { PaginacionDto } from 'src/common';
import { USUARIO_SERVICE } from 'src/configs';
import { CreateUsuarioDto } from './dto-usuarios/create-usuario-dto';
import { UpdateUsuarioDto } from './dto-usuarios/update-usuario-dto';

@Controller('usuarios')
export class UsuariosController {
  constructor(
    @Inject(USUARIO_SERVICE) private readonly usuarioClient: ClientProxy,
  ) {}

  @Post()
  async createUsuario(@Body() createUsuarioDto: CreateUsuarioDto) {
    try {
      const result = await firstValueFrom(
        this.usuarioClient.send(
          {cmd: 'crear_usuario'},
          createUsuarioDto,
        )
      );
      return result;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Get()
  async findAllUsuarios(@Query() paginacionDto: PaginacionDto) {
    try {
      const result = await firstValueFrom(
        this.usuarioClient.send({cmd: 'buscar_todos_usuarios'}, paginacionDto)
      );
      return result;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Get(':id')
  async findOneUsuario(@Param('id') id: string) {
    try {
      const result = await firstValueFrom(
        this.usuarioClient.send(
          {cmd: 'buscar_un_usuario'},
          {id}
        )
      );
      return result;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Patch(':id')
  async updateUsuario(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUsuarioDto: UpdateUsuarioDto) {
    try {
      const result = await firstValueFrom(
        this.usuarioClient.send(
          {cmd: 'actualizar_usuario'},
          {
            id,
            ...updateUsuarioDto,
          }
        )
      );
      return result;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Delete(':id')
  async deleteUsuario(@Param('id') id: string) {
    try {
      const result = await firstValueFrom(
        this.usuarioClient.send(
          {cmd: 'eliminar_usuario'},
          {id},
        )
      );
      return result;
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
