import { Module } from '@nestjs/common';
import { ComprasCabeceraModule } from './compras-cabecera/compras-cabecera.module';
import { NatsModule } from './transports/nats.module';

@Module({
  imports: [ComprasCabeceraModule, NatsModule],
})
export class AppModule {}
