-- CreateTable
CREATE TABLE "Usuario" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "dni" TEXT NOT NULL,
    "nombreCompleto" TEXT NOT NULL,
    "correoElectronico" TEXT NOT NULL,
    "nombreUsuario" TEXT NOT NULL,
    "clave" TEXT NOT NULL,
    "estado" BOOLEAN NOT NULL,
    "createDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
