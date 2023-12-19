/*
  Warnings:

  - Added the required column `marks` to the `Marks` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Marks" ADD COLUMN     "marks" DOUBLE PRECISION NOT NULL;
