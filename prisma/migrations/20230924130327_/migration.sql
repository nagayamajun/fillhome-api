-- CreateEnum
CREATE TYPE "StructureType" AS ENUM ('WOODEN_CONSTRUCTION', 'STEEL_FRAME_AND_REINFORCED_STEEL_CONSTRUCTION', 'REINFORCED_CONCRETE_CONSTRUCTION');

-- CreateTable
CREATE TABLE "Photo" (
    "id" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "rental_house_id" TEXT,
    "mansion_room_id" TEXT,

    CONSTRAINT "Photo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RentalHouse" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "nearest_station" TEXT NOT NULL,
    "max_floor_number" INTEGER NOT NULL,
    "building_age" INTEGER NOT NULL,
    "structure_type" "StructureType" NOT NULL,
    "owner_id" TEXT NOT NULL,

    CONSTRAINT "RentalHouse_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Mansion" (
    "id" TEXT NOT NULL,
    "rental_house_id" TEXT NOT NULL,

    CONSTRAINT "Mansion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MansionRoom" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "layout" TEXT NOT NULL,
    "thanks_money" INTEGER NOT NULL,
    "security_deposit" INTEGER NOT NULL,
    "floor_number" INTEGER NOT NULL,
    "rent" INTEGER NOT NULL,
    "maintenance_fee" INTEGER NOT NULL,
    "contract_duration" TEXT NOT NULL,
    "availableDates" TEXT[],
    "reserve_url" TEXT,
    "mansion_id" TEXT NOT NULL,

    CONSTRAINT "MansionRoom_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Photo" ADD CONSTRAINT "Photo_rental_house_id_fkey" FOREIGN KEY ("rental_house_id") REFERENCES "RentalHouse"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Photo" ADD CONSTRAINT "Photo_mansion_room_id_fkey" FOREIGN KEY ("mansion_room_id") REFERENCES "MansionRoom"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RentalHouse" ADD CONSTRAINT "RentalHouse_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "Owner"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Mansion" ADD CONSTRAINT "Mansion_rental_house_id_fkey" FOREIGN KEY ("rental_house_id") REFERENCES "RentalHouse"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MansionRoom" ADD CONSTRAINT "MansionRoom_mansion_id_fkey" FOREIGN KEY ("mansion_id") REFERENCES "Mansion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
