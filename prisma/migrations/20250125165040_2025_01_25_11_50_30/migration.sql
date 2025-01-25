/*
  Warnings:

  - You are about to drop the column `metaDescription` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `metaTitle` on the `Post` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `Profile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Post` DROP COLUMN `metaDescription`,
    DROP COLUMN `metaTitle`;

-- AlterTable
ALTER TABLE `Profile` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;
