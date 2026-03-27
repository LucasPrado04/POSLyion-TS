import { Module } from '@nestjs/common';
import { ComprasCabeceraService } from './compras-cabecera.service';
import { ComprasCabeceraController } from './compras-cabecera.controller';

@Module({
  controllers: [ComprasCabeceraController],
  providers: [ComprasCabeceraService],
})
export class ComprasCabeceraModule {}
