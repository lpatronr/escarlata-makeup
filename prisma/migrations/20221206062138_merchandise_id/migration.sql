/*
  Warnings:

  - You are about to drop the column `variantId` on the `LineItem` table. All the data in the column will be lost.
  - Added the required column `merchandiseId` to the `LineItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "LineItem" DROP COLUMN "variantId",
ADD COLUMN     "merchandiseId" TEXT NOT NULL;
