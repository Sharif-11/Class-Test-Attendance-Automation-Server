/*
  Warnings:

  - Added the required column `department` to the `Teachers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Teachers" ADD COLUMN     "department" TEXT NOT NULL;
