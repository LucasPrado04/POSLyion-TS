import { EstadoCompra } from "generated/prisma/client";

export interface CompraConProductos {
    ArticuloCompra: {
        nombre: any;
        idProducto: number;
        cantidad: number;
        precio: number;
    }[];
    id: string;
    montoTotal: number;
    totalProductos: number;
    estado: EstadoCompra | null;
    pagado: boolean;
    pagadoEl: Date | null;
    createdAt: Date;
    updatedAt: Date;
}