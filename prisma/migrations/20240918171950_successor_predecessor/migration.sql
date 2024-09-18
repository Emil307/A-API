/*
  Warnings:

  - You are about to drop the column `replyPostId` on the `Post` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "replyPostId",
ADD COLUMN     "predecessorId" INTEGER;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_predecessorId_fkey" FOREIGN KEY ("predecessorId") REFERENCES "Post"("id") ON DELETE SET NULL ON UPDATE CASCADE;
