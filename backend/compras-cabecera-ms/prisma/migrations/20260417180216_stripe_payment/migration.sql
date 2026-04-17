-- AlterEnum
ALTER TYPE "EstadoCompra" ADD VALUE 'PAGADO';

-- AlterTable
ALTER TABLE "CompraCabecera" ADD COLUMN     "stripeChargeId" TEXT;

-- CreateTable
CREATE TABLE "ReciboPago" (
    "id" TEXT NOT NULL,
    "compraCabeceraId" TEXT NOT NULL,
    "urlRecibo" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ReciboPago_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ReciboPago_compraCabeceraId_key" ON "ReciboPago"("compraCabeceraId");

-- AddForeignKey
ALTER TABLE "ReciboPago" ADD CONSTRAINT "ReciboPago_compraCabeceraId_fkey" FOREIGN KEY ("compraCabeceraId") REFERENCES "CompraCabecera"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
