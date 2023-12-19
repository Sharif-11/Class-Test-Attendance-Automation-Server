/*
  Warnings:

  - The primary key for the `Semester_courses` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `courseId` on the `Semester_courses` table. All the data in the column will be lost.
  - Added the required column `courseCode` to the `Semester_courses` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Semester_courses" DROP CONSTRAINT "Semester_courses_courseId_fkey";

-- AlterTable
ALTER TABLE "Semester_courses" DROP CONSTRAINT "Semester_courses_pkey",
DROP COLUMN "courseId",
ADD COLUMN     "courseCode" TEXT NOT NULL,
ADD CONSTRAINT "Semester_courses_pkey" PRIMARY KEY ("semesterId", "courseCode", "teacherId");

-- AddForeignKey
ALTER TABLE "Semester_courses" ADD CONSTRAINT "Semester_courses_courseCode_fkey" FOREIGN KEY ("courseCode") REFERENCES "Courses"("courseCode") ON DELETE RESTRICT ON UPDATE CASCADE;
