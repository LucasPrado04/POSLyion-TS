import { Module } from '@nestjs/common';
import { ComprasCabeceraModule } from './compras-cabecera/compras-cabecera.module';

@Module({
  imports: [ComprasCabeceraModule],
})
export class AppModule {}
