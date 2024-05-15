-- DropForeignKey
ALTER TABLE "File" DROP CONSTRAINT "File_panId_fkey";

-- DropForeignKey
ALTER TABLE "Pan" DROP CONSTRAINT "Pan_userId_fkey";

-- DropForeignKey
ALTER TABLE "Share" DROP CONSTRAINT "Share_fileId_fkey";

-- AddForeignKey
ALTER TABLE "Pan" ADD CONSTRAINT "Pan_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_panId_fkey" FOREIGN KEY ("panId") REFERENCES "Pan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Share" ADD CONSTRAINT "Share_fileId_fkey" FOREIGN KEY ("fileId") REFERENCES "File"("fileId") ON DELETE CASCADE ON UPDATE CASCADE;
