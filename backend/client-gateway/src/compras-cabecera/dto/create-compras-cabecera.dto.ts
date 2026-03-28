import { IsBoolean, IsEnum, IsNumber, IsOptional, IsPositive } from "class-validator"
import { EstadoCompra, ListaEstadosCompra } from "../enums";

export class CreateComprasCabeceraDto {
    @IsNumber()
    @IsPositive()
    montoTotal: number;
    @IsNumber()
    @IsPositive()
    totalProductos: number;
    @IsEnum(ListaEstadosCompra, {
        message: `Los posibles valores para el estado de una compra son ${ListaEstadosCompra}`
    })
    @IsOptional()
    estado: EstadoCompra = EstadoCompra.PENDIENTE;
    @IsOptional()
    @IsBoolean()
    pagadoEl: boolean = false;
}
