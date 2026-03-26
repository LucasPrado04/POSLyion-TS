import { Controller, ParseIntPipe } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { PaginacionDto } from 'src/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @MessagePattern({cmd: 'crear_usuario'})
  create(@Payload() createUsuarioDto: CreateUsuarioDto) {
    return this.usuariosService.create(createUsuarioDto);
  }

  @MessagePattern({cmd: 'buscar_todos_usuarios'})
  findAll(@Payload() paginacionDto: PaginacionDto) {
    return this.usuariosService.findAll(paginacionDto);
  }

  @MessagePattern({cmd: 'buscar_un_usuario'})
  findOne(@Payload('id', ParseIntPipe) id: number) {
    return this.usuariosService.findOne(id);
  }

  @MessagePattern({cmd: 'actualizar_usuario'})
  update(@Payload() updateUsuarioDto: UpdateUsuarioDto) {
    return this.usuariosService.update(updateUsuarioDto.id, updateUsuarioDto);
  }

  @MessagePattern({cmd: 'eliminar_usuario'})
  remove(@Payload('id', ParseIntPipe) id: number) {
    return this.usuariosService.remove(id);
  }
}
