import { ArrayMinSize, IsArray, ValidateNested } from "class-validator"
import { ArticuloCompraDto } from './articulo-compra.dto';
import { Type } from "class-transformer";

export class CreateComprasCabeceraDto {
    @IsArray()
    @ArrayMinSize(1)
    @ValidateNested({ each: true })
    @Type(() => ArticuloCompraDto)
    items: ArticuloCompraDto[];
}
