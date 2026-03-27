import { Module } from '@nestjs/common';
import { UsuariosModule } from './usuarios/usuarios.module';
import { ProductosModule } from './productos/productos.module';
import { ComprasCabeceraModule } from './compras-cabecera/compras-cabecera.module';

@Module({
  imports: [UsuariosModule, ProductosModule, ComprasCabeceraModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
