import { Module } from '@nestjs/common';
import { ComprasCabeceraService } from './compras-cabecera.service';
import { ComprasCabeceraController } from './compras-cabecera.controller';
import { PrismaService } from 'src/prisma.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { envs, PRODUCTO_SERVICE } from 'src/config';

@Module({
  controllers: [ComprasCabeceraController],
  providers: [ComprasCabeceraService, PrismaService],
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
export class ComprasCabeceraModule {}
