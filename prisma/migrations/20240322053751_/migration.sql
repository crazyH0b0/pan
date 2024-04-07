/*
  Warnings:

  - You are about to drop the column `userId` on the `File` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[username]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `panId` to the `File` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "User_userId_key";

-- AlterTable
ALTER TABLE "File" DROP COLUMN "userId",
ADD COLUMN     "panId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "userId";

-- CreateTable
CREATE TABLE "Pan" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Pan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Share" (
    "shareId" TEXT NOT NULL,
    "fileId" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,
    "sharedWith" TEXT,
    "shareLink" TEXT NOT NULL,
    "expiry" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Share_pkey" PRIMARY KEY ("shareId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Pan_userId_key" ON "Pan"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Share_shareLink_key" ON "Share"("shareLink");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- AddForeignKey
ALTER TABLE "Pan" ADD CONSTRAINT "Pan_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_panId_fkey" FOREIGN KEY ("panId") REFERENCES "Pan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Share" ADD CONSTRAINT "Share_fileId_fkey" FOREIGN KEY ("fileId") REFERENCES "File"("fileId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Share" ADD CONSTRAINT "Share_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
