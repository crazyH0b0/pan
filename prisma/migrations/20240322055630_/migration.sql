/*
  Warnings:

  - A unique constraint covering the columns `[fileId]` on the table `Share` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Share_fileId_key" ON "Share"("fileId");
