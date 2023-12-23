/*
  Warnings:

  - Added the required column `courseCode` to the `Marks` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Marks" ADD COLUMN     "courseCode" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Marks" ADD CONSTRAINT "Marks_courseCode_fkey" FOREIGN KEY ("courseCode") REFERENCES "Courses"("courseCode") ON DELETE RESTRICT ON UPDATE CASCADE;
