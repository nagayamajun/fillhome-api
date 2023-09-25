/*
  Warnings:

  - Added the required column `stay_fee` to the `MansionRoom` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "MansionRoom" ADD COLUMN     "stay_fee" INTEGER NOT NULL;
