import { PartialType } from '@nestjs/mapped-types';
import { CreateComprasCabeceraDto } from './create-compras-cabecera.dto';

export class UpdateComprasCabeceraDto extends PartialType(CreateComprasCabeceraDto) {
  id: number;
}
