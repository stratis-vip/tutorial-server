/*
  Warnings:

  - Added the required column `league` to the `guilds` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `teams` DROP FOREIGN KEY `teams_petId_fkey`;

-- AlterTable
ALTER TABLE `guilds` ADD COLUMN `league` ENUM('GOLD', 'SILVER', 'BRONZE', 'QUALIFYING') NOT NULL;

-- AlterTable
ALTER TABLE `teams` MODIFY `petId` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `GuildLogs` (
    `id` VARCHAR(191) NOT NULL,
    `guildId` INTEGER NOT NULL,
    `change` ENUM('NAME', 'PROMOTION') NOT NULL,
    `log` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PlayerLogs` (
    `id` VARCHAR(191) NOT NULL,
    `playerId` INTEGER NOT NULL,
    `change` ENUM('NAME', 'GUILD') NOT NULL,
    `log` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `teams` ADD CONSTRAINT `teams_petId_fkey` FOREIGN KEY (`petId`) REFERENCES `Pet`(`smallName`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `GuildLogs` ADD CONSTRAINT `GuildLogs_guildId_fkey` FOREIGN KEY (`guildId`) REFERENCES `guilds`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PlayerLogs` ADD CONSTRAINT `PlayerLogs_playerId_fkey` FOREIGN KEY (`playerId`) REFERENCES `players`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
