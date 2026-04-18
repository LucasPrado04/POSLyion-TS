import { EstadoCompra } from "generated/prisma/enums";

export const ListaEstadosCompra = [
    EstadoCompra.PENDIENTE,
    EstadoCompra.COMPLETADA,
    EstadoCompra.CANCELADA,
    EstadoCompra.PAGADO,
]