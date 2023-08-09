/*
  Warnings:

  - You are about to drop the column `deletedAt` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `deletedAt` on the `Image` table. All the data in the column will be lost.
  - You are about to drop the column `deletedAt` on the `Order` table. All the data in the column will be lost.
  - The `status` column on the `Order` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `deletedAt` on the `Product` table. All the data in the column will be lost.
  - The `status` column on the `Product` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `deletedAt` on the `User` table. All the data in the column will be lost.
  - The `role` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `_OrderToProduct` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('MANAGER', 'ADMIN', 'USER');

-- CreateEnum
CREATE TYPE "ProductState" AS ENUM ('ACTIVE', 'DRAFT', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "OrderState" AS ENUM ('PENDING', 'DELIVERED', 'CANCELLED', 'PACKED', 'SHIPPED');

-- DropForeignKey
ALTER TABLE "_OrderToProduct" DROP CONSTRAINT "_OrderToProduct_A_fkey";

-- DropForeignKey
ALTER TABLE "_OrderToProduct" DROP CONSTRAINT "_OrderToProduct_B_fkey";

-- AlterTable
ALTER TABLE "Category" DROP COLUMN "deletedAt";

-- AlterTable
ALTER TABLE "Image" DROP COLUMN "deletedAt";

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "deletedAt",
ADD COLUMN     "state" "OrderState" NOT NULL DEFAULT 'PENDING',
ALTER COLUMN "profit" SET DEFAULT 0,
DROP COLUMN "status",
ADD COLUMN     "status" "OrderState" NOT NULL DEFAULT 'PENDING',
ALTER COLUMN "discount" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "deletedAt",
DROP COLUMN "status",
ADD COLUMN     "status" "ProductState" NOT NULL DEFAULT 'ACTIVE';

-- AlterTable
ALTER TABLE "User" DROP COLUMN "deletedAt",
DROP COLUMN "role",
ADD COLUMN     "role" "UserRole" NOT NULL DEFAULT 'USER';

-- DropTable
DROP TABLE "_OrderToProduct";

-- DropEnum
DROP TYPE "ProductStatus";

-- DropEnum
DROP TYPE "Role";

-- CreateTable
CREATE TABLE "orderProduct" (
    "id" SERIAL NOT NULL,
    "quantity" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "orderId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,

    CONSTRAINT "orderProduct_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "orderProduct" ADD CONSTRAINT "orderProduct_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orderProduct" ADD CONSTRAINT "orderProduct_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
