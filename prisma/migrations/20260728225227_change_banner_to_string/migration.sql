/*
  Warnings:

  - You are about to alter the column `banner` on the `article` table. The data in that column could be lost. The data in that column will be cast from `LongBlob` to `VarChar(191)`.

*/
-- AlterTable
ALTER TABLE `article` MODIFY `banner` VARCHAR(191) NULL;
