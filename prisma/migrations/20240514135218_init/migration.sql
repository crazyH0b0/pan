-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "isDisabled" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pan" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Pan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "File" (
    "fileId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "panId" TEXT NOT NULL,
    "url" TEXT,
    "suffix" TEXT,
    "parentId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "isDeleted" BOOLEAN DEFAULT false,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "size" INTEGER NOT NULL,

    CONSTRAINT "File_pkey" PRIMARY KEY ("fileId")
);

-- CreateTable
CREATE TABLE "Share" (
    "shareId" TEXT NOT NULL,
    "fileId" TEXT NOT NULL,
    "sharedWith" TEXT,
    "shareLink" TEXT NOT NULL,
    "expiry" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Share_pkey" PRIMARY KEY ("shareId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_password_key" ON "User"("password");

-- CreateIndex
CREATE UNIQUE INDEX "Pan_userId_key" ON "Pan"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Share_fileId_key" ON "Share"("fileId");

-- CreateIndex
CREATE UNIQUE INDEX "Share_shareLink_key" ON "Share"("shareLink");

-- AddForeignKey
ALTER TABLE "Pan" ADD CONSTRAINT "Pan_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_panId_fkey" FOREIGN KEY ("panId") REFERENCES "Pan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Share" ADD CONSTRAINT "Share_fileId_fkey" FOREIGN KEY ("fileId") REFERENCES "File"("fileId") ON DELETE RESTRICT ON UPDATE CASCADE;
