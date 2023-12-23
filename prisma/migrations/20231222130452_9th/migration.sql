/*
  Warnings:

  - Added the required column `semesterId` to the `Marks` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Marks" ADD COLUMN     "semesterId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Marks" ADD CONSTRAINT "Marks_semesterId_fkey" FOREIGN KEY ("semesterId") REFERENCES "Semesters"("semesterId") ON DELETE RESTRICT ON UPDATE CASCADE;
