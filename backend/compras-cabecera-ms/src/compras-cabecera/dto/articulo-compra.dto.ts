import { IsNumber, IsPositive } from "class-validator";

export class ArticuloCompraDto {
    @IsNumber()
    @IsPositive()
    idProducto: number;
    @IsNumber()
    @IsPositive()
    cantidad: number;
    @IsNumber()
    @IsPositive()
    precio: number;
}