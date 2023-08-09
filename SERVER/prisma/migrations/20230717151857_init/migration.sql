/*
  Warnings:

  - You are about to drop the column `customer_email` on the `Order` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Order_customer_email_key";

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "customer_email";
