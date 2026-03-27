import { Module } from '@nestjs/common';
import { ProductosController } from './productos.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { envs, PRODUCTO_SERVICE } from 'src/configs';

@Module({
  controllers: [ProductosController],
  providers: [],
  imports: [
    ClientsModule.register([
      {
        name: PRODUCTO_SERVICE,
        transport: Transport.TCP,
        options: {
          host: envs.microservicioProductoHost,
          port: envs.microservicioProductoPort,
        }
      }
    ])
  ]
})
export class ProductosModule {}
