/*
  Warnings:

  - Added the required column `session` to the `Semesters` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Semesters" ADD COLUMN     "session" TEXT NOT NULL;
