import { IsEnum, IsUUID } from "class-validator";
import { EstadoCompra } from "generated/prisma/enums";
import { ListaEstadosCompra } from "../enums/compra.enum";

export class CambiarEstadoCompraDto {
    @IsUUID()
    id: string;
    @IsEnum(ListaEstadosCompra, {
        message: `Los posibles valores para el estado de una compra son ${ListaEstadosCompra}`
    })
    estado: EstadoCompra;
}