/*
  Warnings:

  - The primary key for the `Pet` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Pet` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `teams` DROP FOREIGN KEY `teams_petId_fkey`;

-- AlterTable
ALTER TABLE `Pet` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD PRIMARY KEY (`smallName`);

-- AddForeignKey
ALTER TABLE `teams` ADD CONSTRAINT `teams_petId_fkey` FOREIGN KEY (`petId`) REFERENCES `Pet`(`smallName`) ON DELETE RESTRICT ON UPDATE CASCADE;
