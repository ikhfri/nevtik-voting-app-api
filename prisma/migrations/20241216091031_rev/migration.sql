/*
  Warnings:

  - You are about to drop the column `mission` on the `candidate` table. All the data in the column will be lost.
  - You are about to drop the column `vision` on the `candidate` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `candidate` DROP COLUMN `mission`,
    DROP COLUMN `vision`;

-- AlterTable
ALTER TABLE `user` MODIFY `role` ENUM('ADMIN', 'USER') NOT NULL DEFAULT 'USER';
