/*
  Warnings:

  - Added the required column `mission` to the `Candidate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `vision` to the `Candidate` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `candidate` ADD COLUMN `mission` VARCHAR(191) NOT NULL,
    ADD COLUMN `vision` VARCHAR(191) NOT NULL;
