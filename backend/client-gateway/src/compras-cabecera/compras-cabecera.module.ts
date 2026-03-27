import { Module } from '@nestjs/common';
import { ComprasCabeceraController } from './compras-cabecera.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { COMPRAS_CABECERA_SERVICE, envs } from 'src/configs';

@Module({
  controllers: [ComprasCabeceraController],
  providers: [],
  imports: [
    ClientsModule.register([
      {
        name: COMPRAS_CABECERA_SERVICE,
        transport: Transport.TCP,
        options: {
          host: envs.microservicioComprasCabeceraHost,
          port: envs.microservicioComprasCabeceraPort,
        }
      }
    ])
  ]
})
export class ComprasCabeceraModule {}
