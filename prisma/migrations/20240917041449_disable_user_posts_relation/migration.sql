/*
  Warnings:

  - You are about to drop the column `ownerId` on the `Post` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_ownerId_fkey";

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "ownerId";
