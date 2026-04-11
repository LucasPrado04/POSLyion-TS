import { Module } from '@nestjs/common';
import { ComprasCabeceraController } from './compras-cabecera.controller';
import { NatsModule } from 'src/transports/nats.module';

@Module({
  controllers: [ComprasCabeceraController],
  providers: [],
  imports: [
    NatsModule
  ]
})
export class ComprasCabeceraModule { }
