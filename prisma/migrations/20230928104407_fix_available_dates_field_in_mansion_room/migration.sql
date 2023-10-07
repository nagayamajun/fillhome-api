/*
  Warnings:

  - You are about to drop the column `availableDates` on the `MansionRoom` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "MansionRoom" DROP COLUMN "availableDates",
ADD COLUMN     "available_dates" TEXT[];
