import { Module } from '@nestjs/common';
import { ComprasCabeceraService } from './compras-cabecera.service';
import { ComprasCabeceraController } from './compras-cabecera.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [ComprasCabeceraController],
  providers: [ComprasCabeceraService, PrismaService],
})
export class ComprasCabeceraModule {}
