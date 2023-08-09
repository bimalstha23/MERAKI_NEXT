-- AlterTable
ALTER TABLE "Image" ADD COLUMN     "archivedProductId" INTEGER,
ADD COLUMN     "draftProductId" INTEGER;

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "archivedProductId" INTEGER,
ADD COLUMN     "draftProductId" INTEGER;

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "archivedOrderId" INTEGER;

-- CreateTable
CREATE TABLE "ArchivedOrder" (
    "id" SERIAL NOT NULL,
    "customer_name" TEXT NOT NULL,
    "customer_phone" TEXT NOT NULL,
    "customer_email" TEXT NOT NULL,
    "customer_address" TEXT NOT NULL,
    "total_amount" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "ArchivedOrder_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ArchivedProduct" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "selling_price" DOUBLE PRECISION NOT NULL,
    "cost_price" DOUBLE PRECISION NOT NULL,
    "quantity" INTEGER NOT NULL,
    "discount" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "categoryId" INTEGER NOT NULL,
    "archivedOrderId" INTEGER,

    CONSTRAINT "ArchivedProduct_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DraftProduct" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "selling_price" DOUBLE PRECISION NOT NULL,
    "cost_price" DOUBLE PRECISION NOT NULL,
    "quantity" INTEGER NOT NULL,
    "discount" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "categoryId" INTEGER NOT NULL,
    "archivedOrderId" INTEGER,

    CONSTRAINT "DraftProduct_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_archivedOrderId_fkey" FOREIGN KEY ("archivedOrderId") REFERENCES "ArchivedOrder"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_archivedProductId_fkey" FOREIGN KEY ("archivedProductId") REFERENCES "ArchivedProduct"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_draftProductId_fkey" FOREIGN KEY ("draftProductId") REFERENCES "DraftProduct"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_archivedProductId_fkey" FOREIGN KEY ("archivedProductId") REFERENCES "ArchivedProduct"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_draftProductId_fkey" FOREIGN KEY ("draftProductId") REFERENCES "DraftProduct"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArchivedProduct" ADD CONSTRAINT "ArchivedProduct_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArchivedProduct" ADD CONSTRAINT "ArchivedProduct_archivedOrderId_fkey" FOREIGN KEY ("archivedOrderId") REFERENCES "ArchivedOrder"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DraftProduct" ADD CONSTRAINT "DraftProduct_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DraftProduct" ADD CONSTRAINT "DraftProduct_archivedOrderId_fkey" FOREIGN KEY ("archivedOrderId") REFERENCES "ArchivedOrder"("id") ON DELETE SET NULL ON UPDATE CASCADE;
