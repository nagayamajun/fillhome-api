-- CreateTable
CREATE TABLE "Owner" (
    "id" TEXT NOT NULL,
    "firebase_uid" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,

    CONSTRAINT "Owner_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Owner_firebase_uid_key" ON "Owner"("firebase_uid");

-- CreateIndex
CREATE UNIQUE INDEX "Owner_email_key" ON "Owner"("email");
