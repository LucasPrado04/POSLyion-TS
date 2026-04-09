import { IsEnum, IsOptional } from "class-validator";
import { EstadoCompra, ListaEstadosCompra } from "../enums";

export class EstadoDto {
    @IsOptional()
    @IsEnum(ListaEstadosCompra, {
        message: `Los posibles valores para el estado de una compra son ${ListaEstadosCompra}`
    })
    estado: EstadoCompra;
}