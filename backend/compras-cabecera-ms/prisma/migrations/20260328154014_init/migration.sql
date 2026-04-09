-- CreateEnum
CREATE TYPE "CompraStatus" AS ENUM ('PENDIENTE', 'COMPLETADA', 'CANCELADA');

-- CreateTable
CREATE TABLE "CompraCabecera" (
    "id" TEXT NOT NULL,
    "montoTotal" DOUBLE PRECISION NOT NULL,
    "totalProductos" INTEGER NOT NULL,
    "estado" "CompraStatus" NOT NULL,
    "pagado" BOOLEAN NOT NULL DEFAULT false,
    "pagadoEl" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CompraCabecera_pkey" PRIMARY KEY ("id")
);
