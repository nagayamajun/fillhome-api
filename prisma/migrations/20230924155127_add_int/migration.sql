/*
  Warnings:

  - Changed the type of `structure_type` on the `RentalHouse` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "RentalHouse" DROP COLUMN "structure_type",
ADD COLUMN     "structure_type" INTEGER NOT NULL;
