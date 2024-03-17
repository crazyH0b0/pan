/*
  Warnings:

  - You are about to drop the column `fileName` on the `File` table. All the data in the column will be lost.
  - You are about to drop the column `folderId` on the `File` table. All the data in the column will be lost.
  - You are about to drop the `Folder` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserFiles` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `name` to the `File` table without a default value. This is not possible if the table is not empty.
  - Added the required column `parentId` to the `File` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `File` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `File` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "File" DROP CONSTRAINT "File_folderId_fkey";

-- AlterTable
ALTER TABLE "File" DROP COLUMN "fileName",
DROP COLUMN "folderId",
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "parentId" TEXT NOT NULL,
ADD COLUMN     "type" TEXT NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL,
ALTER COLUMN "isDeleted" DROP NOT NULL,
ALTER COLUMN "suffix" DROP NOT NULL,
ALTER COLUMN "url" DROP NOT NULL;

-- DropTable
DROP TABLE "Folder";

-- DropTable
DROP TABLE "UserFiles";
