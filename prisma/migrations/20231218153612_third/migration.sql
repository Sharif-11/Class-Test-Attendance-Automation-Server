/*
  Warnings:

  - Added the required column `profileImage` to the `Students` table without a default value. This is not possible if the table is not empty.
  - Added the required column `profileImage` to the `Teachers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Students" ADD COLUMN     "profileImage" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Teachers" ADD COLUMN     "profileImage" TEXT NOT NULL;
