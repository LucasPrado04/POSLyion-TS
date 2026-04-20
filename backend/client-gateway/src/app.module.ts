import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ProductosModule } from './productos/productos.module';
import { ComprasCabeceraModule } from './compras-cabecera/compras-cabecera.module';
import { NatsModule } from './transports/nats.module';

@Module({
  imports: [AuthModule, ProductosModule, ComprasCabeceraModule, NatsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
