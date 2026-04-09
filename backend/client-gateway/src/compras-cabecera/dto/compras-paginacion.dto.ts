import { PaginacionDto } from "src/common";
import { EstadoCompra, ListaEstadosCompra } from "../enums";
import { IsEnum, IsOptional } from "class-validator";

export class ComprasPaginacionDto extends PaginacionDto {
    @IsOptional()
    @IsEnum(ListaEstadosCompra, {
        message: `Los posibles valores para el estado de una compra son ${ListaEstadosCompra}`
    })
    estado: EstadoCompra
}