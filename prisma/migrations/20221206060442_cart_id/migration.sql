/*
  Warnings:

  - You are about to drop the column `checkoutId` on the `Cart` table. All the data in the column will be lost.
  - Added the required column `shopifyId` to the `Cart` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Cart" DROP COLUMN "checkoutId",
ADD COLUMN     "shopifyId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "LineItem" (
    "id" TEXT NOT NULL,
    "cartId" TEXT NOT NULL,
    "variantId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "LineItem_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "LineItem" ADD CONSTRAINT "LineItem_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "Cart"("id") ON DELETE CASCADE ON UPDATE CASCADE;
