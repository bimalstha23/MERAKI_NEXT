/*
  Warnings:

  - A unique constraint covering the columns `[customer_email]` on the table `Order` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Order" ALTER COLUMN "customer_email" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Order_customer_email_key" ON "Order"("customer_email");
