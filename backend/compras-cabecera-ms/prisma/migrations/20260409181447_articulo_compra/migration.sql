-- AlterTable
ALTER TABLE "CompraCabecera" ALTER COLUMN "estado" SET DEFAULT 'PENDIENTE';

-- CreateTable
CREATE TABLE "ArticuloCompra" (
    "id" TEXT NOT NULL,
    "idProducto" INTEGER NOT NULL,
    "cantidad" INTEGER NOT NULL,
    "precio" DOUBLE PRECISION NOT NULL,
    "compraCabeceraId" TEXT,

    CONSTRAINT "ArticuloCompra_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ArticuloCompra" ADD CONSTRAINT "ArticuloCompra_compraCabeceraId_fkey" FOREIGN KEY ("compraCabeceraId") REFERENCES "CompraCabecera"("id") ON DELETE SET NULL ON UPDATE CASCADE;
