/*
  Warnings:

  - The primary key for the `File` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `fileType` on the `File` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `File` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `File` table. All the data in the column will be lost.
  - You are about to drop the column `src` on the `File` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `File` table. All the data in the column will be lost.
  - The primary key for the `Folder` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdFolerId` on the `Folder` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `Folder` table. All the data in the column will be lost.
  - You are about to drop the column `isDeleted` on the `Folder` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Folder` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Folder` table. All the data in the column will be lost.
  - You are about to drop the `CreatedFoler` table. If the table is not empty, all the data it contains will be lost.
  - The required column `fileId` was added to the `File` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `fileName` to the `File` table without a default value. This is not possible if the table is not empty.
  - Added the required column `suffix` to the `File` table without a default value. This is not possible if the table is not empty.
  - Added the required column `url` to the `File` table without a default value. This is not possible if the table is not empty.
  - The required column `folderId` was added to the `Folder` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `folderName` to the `Folder` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "CreatedFoler" DROP CONSTRAINT "CreatedFoler_userId_fkey";

-- DropForeignKey
ALTER TABLE "File" DROP CONSTRAINT "File_folderId_fkey";

-- DropForeignKey
ALTER TABLE "File" DROP CONSTRAINT "File_userId_fkey";

-- DropForeignKey
ALTER TABLE "Folder" DROP CONSTRAINT "Folder_createdFolerId_fkey";

-- DropForeignKey
ALTER TABLE "Folder" DROP CONSTRAINT "Folder_userId_fkey";

-- AlterTable
ALTER TABLE "File" DROP CONSTRAINT "File_pkey",
DROP COLUMN "fileType",
DROP COLUMN "id",
DROP COLUMN "name",
DROP COLUMN "src",
DROP COLUMN "userId",
ADD COLUMN     "fileId" TEXT NOT NULL,
ADD COLUMN     "fileName" TEXT NOT NULL,
ADD COLUMN     "suffix" TEXT NOT NULL,
ADD COLUMN     "url" TEXT NOT NULL,
ADD CONSTRAINT "File_pkey" PRIMARY KEY ("fileId");

-- AlterTable
ALTER TABLE "Folder" DROP CONSTRAINT "Folder_pkey",
DROP COLUMN "createdFolerId",
DROP COLUMN "id",
DROP COLUMN "isDeleted",
DROP COLUMN "name",
DROP COLUMN "userId",
ADD COLUMN     "folderId" TEXT NOT NULL,
ADD COLUMN     "folderName" TEXT NOT NULL,
ADD CONSTRAINT "Folder_pkey" PRIMARY KEY ("folderId");

-- DropTable
DROP TABLE "CreatedFoler";

-- CreateTable
CREATE TABLE "UserFiles" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "UserFiles_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_folderId_fkey" FOREIGN KEY ("folderId") REFERENCES "Folder"("folderId") ON DELETE RESTRICT ON UPDATE CASCADE;
