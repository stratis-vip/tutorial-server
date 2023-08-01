/*
  Warnings:

  - Added the required column `guildId` to the `teams` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `GuildLogs` MODIFY `date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `teams` ADD COLUMN `guildId` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `Battles` (
    `id` VARCHAR(191) NOT NULL,
    `date` DATETIME(3) NOT NULL,
    `points` INTEGER NOT NULL,
    `attTeamId` VARCHAR(191) NOT NULL,
    `defTeamId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `teams` ADD CONSTRAINT `teams_guildId_fkey` FOREIGN KEY (`guildId`) REFERENCES `guilds`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Battles` ADD CONSTRAINT `Battles_attTeamId_fkey` FOREIGN KEY (`attTeamId`) REFERENCES `teams`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Battles` ADD CONSTRAINT `Battles_defTeamId_fkey` FOREIGN KEY (`defTeamId`) REFERENCES `teams`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
