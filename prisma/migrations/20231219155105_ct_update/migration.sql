/*
  Warnings:

  - Added the required column `full_mark` to the `Class_tests` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Class_tests" ADD COLUMN     "full_mark" INTEGER NOT NULL;
