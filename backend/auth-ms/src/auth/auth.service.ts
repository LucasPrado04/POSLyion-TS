import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { RegisterUserDto } from './dto/register-user.dto';
import { RpcException } from '@nestjs/microservices';
import { PrismaClient } from 'generated/prisma/client';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces';
import { envs } from 'src/config';

@Injectable()
export class AuthService extends PrismaClient {

  private readonly logger = new Logger('Auth-MS');
  private readonly prisma = new PrismaClient();

  constructor(
    private readonly jwtService: JwtService
  ) {
    super();
  }
  
  async signJwt(payload: JwtPayload) {
    return this.jwtService.sign(payload);
  }

  async verifyToken(token: string) {
    try {
      const {sub, iat, exp, ...user} = this.jwtService.verify(token, {
        secret: envs.jwtSecret,
      });
      return {
        user: user,
        token: await this.signJwt(user),
      }
    } catch (error) {
      console.log(error);
      throw new RpcException({
        status: HttpStatus.UNAUTHORIZED,
        message: 'Invalid token',
      })
    }
  }

  async registerUser(registerUserDto: RegisterUserDto) {
    const { name, email, password } = registerUserDto;
    try {
      const user = await this.prisma.user.findUnique({
        where: { email }
      });
      if (user) {
        throw new RpcException({
          status: HttpStatus.BAD_REQUEST,
          message: 'User already exists',
        })
      }
      const newUser = await this.prisma.user.create({
        data: {
          name,
          email,
          password: bcrypt.hashSync(password, 10),
        }
      });
      const { password: __, ...rest } = newUser
      this.logger.log("Created user", newUser);
      return {
        user: rest,
        token: await this.signJwt(rest),
      }
    } catch (error) {
      throw new RpcException({
        status: HttpStatus.BAD_REQUEST,
        message: error.message,
      });
    }
  }

  async loginUser(loginUserDto: LoginUserDto) {

    const { email, password } = loginUserDto;
    const user = await this.prisma.user.findUnique({
      where: { email }

    });

    if (!user) {
      throw new RpcException({
        status: HttpStatus.BAD_REQUEST,
        message: 'Email not valid',
      })
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      throw new RpcException({
        status: HttpStatus.BAD_REQUEST,
        message: 'Password not valid',
      });
    };

    const { password: __, ...rest } = user;

    return {
      user: rest,
      token: await this.signJwt(rest),
    }
  }

  // async findAll(paginacionDto: PaginacionDto) {
  //   const {pagina, limite} = paginacionDto

  //   const totalPaginas = await this.prisma.usuario.count({
  //     where: {
  //       estado: true,
  //     }
  //   });
  //   const ultimaPagina = Math.ceil(totalPaginas / limite!);

  //   return {

  //     data: await this.prisma.usuario.findMany({
  //       skip: (pagina! - 1) * limite!,
  //       take: limite,
  //       where: {
  //         estado: true,
  //       }
  //     }),
  //     meta: {
  //       totalPaginas,
  //       pagina,
  //       ultimaPagina,
  //     }
  //   }
  // }

  // async findOne(id: number) {
  //   const user = await this.prisma.usuario.findFirst({
  //     where: { 
  //       id,
  //       estado: true,  
  //     },
  //   });

  //   if (!user) {
  //     throw new RpcException({
  //       status: HttpStatus.NOT_FOUND,
  //       message: `Usuario con el ID #${id} no encontrado`,
  //     });
  //   }

  //   return user;
  // }

  // async update(id: number, updateUsuarioDto: UpdateUsuarioDto) {

  //   const {id: __, ...data} = updateUsuarioDto;

  //   await this.findOne(id);

  //   return this.prisma.usuario.update({
  //     where: {id},
  //     data
  //   })
  // }

  // async remove(id: number) {
  //   await this.findOne(id)

  //   const usuario = await this.prisma.usuario.update({
  //     where: {id},
  //     data: {
  //       estado: false
  //     }
  //   })

  //   return usuario;
  // }
}
