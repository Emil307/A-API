/*
  Warnings:

  - A unique constraint covering the columns `[predecessorId]` on the table `Post` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Post_predecessorId_key" ON "Post"("predecessorId");
