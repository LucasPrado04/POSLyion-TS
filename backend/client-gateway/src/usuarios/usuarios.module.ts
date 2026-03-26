import { Module } from '@nestjs/common';
import { UsuariosController } from './usuarios.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { envs, USUARIO_SERVICE } from 'src/configs';

@Module({
  controllers: [UsuariosController],
  providers: [],
  imports: [
    ClientsModule.register([
      {
        name: USUARIO_SERVICE, 
        transport: Transport.TCP,
        options: {
          host: envs.microservicioUsuarioHost,
          port: envs.microservicioUsuarioPort,
        }
      },
    ])
  ]
})
export class UsuariosModule {}
