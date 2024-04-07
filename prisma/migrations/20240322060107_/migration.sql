/*
  Warnings:

  - You are about to drop the column `ownerId` on the `Share` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Share" DROP CONSTRAINT "Share_ownerId_fkey";

-- AlterTable
ALTER TABLE "Share" DROP COLUMN "ownerId";
