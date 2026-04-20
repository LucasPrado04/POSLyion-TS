import { Controller } from '@nestjs/common';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { LoginUserDto, RegisterUserDto } from './dto';
import { AuthService } from './auth.service';


@Controller('usuarios')
export class AuthController {

  constructor(
    private readonly authService: AuthService
  ) { }

  @MessagePattern('auth.register.user')
  registerUser(@Payload() registerUserDto: RegisterUserDto) {
    return this.authService.registerUser(registerUserDto);
  }

  @MessagePattern('auth.login.user')
  loginUser(@Payload() loginUserDto: LoginUserDto) {
    return this.authService.loginUser(loginUserDto);
  }

  @MessagePattern('auth.verify.user')
  verifyToken(@Payload() token: string) {
    return this.authService.verifyToken(token);
  }

  // @MessagePattern({cmd: 'buscar_todos_usuarios'})
  // findAll(@Payload() paginacionDto: PaginacionDto) {
  //   return this.usuariosService.findAll(paginacionDto);
  // }

  // @MessagePattern({cmd: 'buscar_un_usuario'})
  // findOne(@Payload('id', ParseIntPipe) id: number) {
  //   return this.usuariosService.findOne(id);
  // }

  // @MessagePattern({cmd: 'actualizar_usuario'})
  // update(@Payload() updateUsuarioDto: UpdateUsuarioDto) {
  //   return this.usuariosService.update(updateUsuarioDto.id, updateUsuarioDto);
  // }

  // @MessagePattern({cmd: 'eliminar_usuario'})
  // remove(@Payload('id', ParseIntPipe) id: number) {
  //   return this.usuariosService.remove(id);
  // }
}
