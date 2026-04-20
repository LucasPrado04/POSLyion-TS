import { Body, Controller, Delete, Get, HttpStatus, Inject, Param, ParseIntPipe, ParseUUIDPipe, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { NATS_SERVICE } from 'src/configs';
import { LoginUserDto, RegisterUserDto } from './dto';
import { catchError } from 'rxjs';
import { AuthGuard } from './guards';
import { Token, User } from './decorators';
import { CurrentUser } from './interfaces';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(NATS_SERVICE) private readonly client: ClientProxy,
  ) { }

  @Post('register')
  async registerUser(@Body() registerUserDto: RegisterUserDto) {
    return this.client.send(
      'auth.register.user',
      registerUserDto
    ).pipe(catchError(error => {
      throw new RpcException(error);
    }));
  }

  @Post('login/')
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.client.send(
      'auth.login.user',
      loginUserDto
    ).pipe(catchError(error => {
      throw new RpcException(error);
    }))
  }

  @UseGuards(AuthGuard)
  @Get('verify')
  async verifyToken(
    @User() user: CurrentUser,
    @Token() token: string,
  ) {

    return {
      user,
      token
    }

    // return this.client.send(
    //   'auth.verify.user',
    //   {}
    // )
  }

  // @Get()
  // async findAllUsuarios(@Query() paginacionDto: PaginacionDto) {
  //   try {
  //     const result = await firstValueFrom(
  //       this.client.send({cmd: 'buscar_todos_usuarios'}, paginacionDto)
  //     );
  //     return result;
  //   } catch (error) {
  //     throw new RpcException(error);
  //   }
  // }

  // @Get(':id')
  // async findOneUsuario(@Param('id') id: string) {
  //   try {
  //     const result = await firstValueFrom(
  //       this.client.send(
  //         {cmd: 'buscar_un_usuario'},
  //         {id}
  //       )
  //     );
  //     return result;
  //   } catch (error) {
  //     throw new RpcException(error);
  //   }
  // }

  // @Patch(':id')
  // async updateUsuario(
  //   @Param('id', ParseIntPipe) id: number,
  //   @Body() updateUsuarioDto: UpdateUsuarioDto) {
  //   try {
  //     const result = await firstValueFrom(
  //       this.client.send(
  //         {cmd: 'actualizar_usuario'},
  //         {
  //           id,
  //           ...updateUsuarioDto,
  //         }
  //       )
  //     );
  //     return result;
  //   } catch (error) {
  //     throw new RpcException(error);
  //   }
  // }

  // @Delete(':id')
  // async deleteUsuario(@Param('id') id: string) {
  //   try {
  //     const result = await firstValueFrom(
  //       this.client.send(
  //         {cmd: 'eliminar_usuario'},
  //         {id},
  //       )
  //     );
  //     return result;
  //   } catch (error) {
  //     throw new RpcException(error);
  //   }
  // }
}
