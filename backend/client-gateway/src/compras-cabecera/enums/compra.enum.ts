export enum EstadoCompra {
    PENDIENTE = 'PENDIENTE',
    COMPLETADA = 'COMPLETADA',
    CANCELADA = 'CANCELADA',
    PAGADO = 'PAGADO',
}

export const ListaEstadosCompra = [
    EstadoCompra.PENDIENTE,
    EstadoCompra.COMPLETADA,
    EstadoCompra.CANCELADA,
    EstadoCompra.PAGADO,
]