/*
  Warnings:

  - You are about to drop the column `state` on the `Order` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "state",
ADD COLUMN     "adminMint" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "customer_address_landmark" TEXT;
