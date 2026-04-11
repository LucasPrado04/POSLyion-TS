import { Module } from '@nestjs/common';
import { ComprasCabeceraService } from './compras-cabecera.service';
import { ComprasCabeceraController } from './compras-cabecera.controller';
import { PrismaService } from 'src/prisma.service';
import { NatsModule } from 'src/transports/nats.module';

@Module({
  controllers: [ComprasCabeceraController],
  providers: [ComprasCabeceraService, PrismaService],
  imports: [
    NatsModule,
  ]
})
export class ComprasCabeceraModule {}
