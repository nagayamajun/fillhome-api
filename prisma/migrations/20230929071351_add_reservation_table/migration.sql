-- CreateTable
CREATE TABLE "Reservation" (
    "id" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "stay_date" TEXT NOT NULL,
    "mansion_room_id" TEXT NOT NULL,

    CONSTRAINT "Reservation_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_mansion_room_id_fkey" FOREIGN KEY ("mansion_room_id") REFERENCES "MansionRoom"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
