/*
  Warnings:

  - You are about to drop the column `archivedProductId` on the `Image` table. All the data in the column will be lost.
  - You are about to drop the column `draftProductId` on the `Image` table. All the data in the column will be lost.
  - You are about to drop the column `archivedProductId` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `draftProductId` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `archivedOrderId` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the `ArchivedOrder` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ArchivedProduct` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `DraftProduct` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "ProductStatus" AS ENUM ('ACTIVE', 'DRAFT', 'ARCHIVED');

-- DropForeignKey
ALTER TABLE "ArchivedProduct" DROP CONSTRAINT "ArchivedProduct_archivedOrderId_fkey";

-- DropForeignKey
ALTER TABLE "ArchivedProduct" DROP CONSTRAINT "ArchivedProduct_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "DraftProduct" DROP CONSTRAINT "DraftProduct_archivedOrderId_fkey";

-- DropForeignKey
ALTER TABLE "DraftProduct" DROP CONSTRAINT "DraftProduct_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "Image" DROP CONSTRAINT "Image_archivedProductId_fkey";

-- DropForeignKey
ALTER TABLE "Image" DROP CONSTRAINT "Image_draftProductId_fkey";

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_archivedProductId_fkey";

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_draftProductId_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_archivedOrderId_fkey";

-- AlterTable
ALTER TABLE "Image" DROP COLUMN "archivedProductId",
DROP COLUMN "draftProductId";

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "archivedProductId",
DROP COLUMN "draftProductId";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "archivedOrderId",
ADD COLUMN     "status" "ProductStatus" NOT NULL DEFAULT 'ACTIVE';

-- DropTable
DROP TABLE "ArchivedOrder";

-- DropTable
DROP TABLE "ArchivedProduct";

-- DropTable
DROP TABLE "DraftProduct";
