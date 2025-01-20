/*
  Warnings:

  - You are about to drop the column `access_token` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `expires_at` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `id_token` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `refresh_token` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `refresh_token_expires_in` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `session_state` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `token_type` on the `Account` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Account` DROP COLUMN `access_token`,
    DROP COLUMN `expires_at`,
    DROP COLUMN `id_token`,
    DROP COLUMN `refresh_token`,
    DROP COLUMN `refresh_token_expires_in`,
    DROP COLUMN `session_state`,
    DROP COLUMN `token_type`,
    ADD COLUMN `accessToken` TEXT NULL,
    ADD COLUMN `expiresAt` INTEGER NULL,
    ADD COLUMN `idToken` TEXT NULL,
    ADD COLUMN `refreshToken` TEXT NULL,
    ADD COLUMN `refreshTokenExpiresIn` INTEGER NULL,
    ADD COLUMN `sessionState` VARCHAR(191) NULL,
    ADD COLUMN `tokenType` VARCHAR(191) NULL;
