-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Usuario" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "dni" TEXT,
    "nombreCompleto" TEXT,
    "correoElectronico" TEXT,
    "nombreUsuario" TEXT NOT NULL,
    "clave" TEXT NOT NULL,
    "estado" BOOLEAN NOT NULL DEFAULT true,
    "createDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Usuario" ("clave", "correoElectronico", "createDate", "dni", "estado", "id", "nombreCompleto", "nombreUsuario", "updatedAt") SELECT "clave", "correoElectronico", "createDate", "dni", coalesce("estado", true) AS "estado", "id", "nombreCompleto", "nombreUsuario", "updatedAt" FROM "Usuario";
DROP TABLE "Usuario";
ALTER TABLE "new_Usuario" RENAME TO "Usuario";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
