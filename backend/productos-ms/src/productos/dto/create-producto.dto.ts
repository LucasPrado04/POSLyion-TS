import { Type } from "class-transformer";
import { IsNumber, IsPositive, IsString, MinLength } from "class-validator";

export class CreateProductoDto {
    @IsString()
    @MinLength(1, {
        message: 'El nombre del producto debe tener al menos 1 caracter',
    })
    public nombre: string;
    @IsPositive()
    @IsNumber()
    @Type(() => Number)
    public precio: number;
}
