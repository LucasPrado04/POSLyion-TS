import { Module } from '@nestjs/common';
import { UsuariosController } from './usuarios.controller';
import { NatsModule } from 'src/transports/nats.module';

@Module({
  controllers: [UsuariosController],
  providers: [],
  imports: [
    NatsModule
  ]
})
export class UsuariosModule {}
