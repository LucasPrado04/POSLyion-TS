/*
  Warnings:

  - Changed the type of `estado` on the `CompraCabecera` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "EstadoCompra" AS ENUM ('PENDIENTE', 'COMPLETADA', 'CANCELADA');

-- AlterTable
ALTER TABLE "CompraCabecera" DROP COLUMN "estado",
ADD COLUMN     "estado" "EstadoCompra" NOT NULL;

-- DropEnum
DROP TYPE "CompraStatus";
