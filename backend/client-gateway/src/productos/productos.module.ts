import { Module } from '@nestjs/common';
import { ProductosController } from './productos.controller';
import { NatsModule } from 'src/transports/nats.module';

@Module({
  controllers: [ProductosController],
  providers: [],
  imports: [
    NatsModule,
  ]
})
export class ProductosModule {}
