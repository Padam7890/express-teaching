-- CreateTable
CREATE TABLE "Repair" (
    "id" SERIAL NOT NULL,
    "productName" TEXT NOT NULL,
    "description" TEXT,
    "scheduledDate" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER,

    CONSTRAINT "Repair_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Repair" ADD CONSTRAINT "Repair_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
