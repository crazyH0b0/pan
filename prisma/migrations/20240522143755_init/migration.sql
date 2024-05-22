-- DropIndex
DROP INDEX "User_password_key";

-- CreateTable
CREATE TABLE "Settings" (
    "id" TEXT NOT NULL,
    "panId" TEXT NOT NULL,
    "capacity" INTEGER NOT NULL,

    CONSTRAINT "Settings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Settings_panId_key" ON "Settings"("panId");

-- AddForeignKey
ALTER TABLE "Settings" ADD CONSTRAINT "Settings_panId_fkey" FOREIGN KEY ("panId") REFERENCES "Pan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
