import { PaginacionDto } from "src/common";
import { IsEnum, IsOptional } from "class-validator";
import { ListaEstadosCompra } from "../enums/compra.enum";
import { EstadoCompra } from "generated/prisma/enums";

export class ComprasPaginacionDto extends PaginacionDto {
    @IsOptional()
    @IsEnum(ListaEstadosCompra, {
        message: `Los posibles valores para el estado de una compra son ${ListaEstadosCompra}`
    })
    estado: EstadoCompra
}