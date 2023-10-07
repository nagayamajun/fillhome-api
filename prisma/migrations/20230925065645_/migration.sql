/*
  Warnings:

  - You are about to drop the column `name` on the `MansionRoom` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[rental_house_id]` on the table `Mansion` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "MansionRoom" DROP COLUMN "name";

-- CreateIndex
CREATE UNIQUE INDEX "Mansion_rental_house_id_key" ON "Mansion"("rental_house_id");
