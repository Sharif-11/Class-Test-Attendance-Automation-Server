/*
  Warnings:

  - The primary key for the `Marks` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Marks" DROP CONSTRAINT "Marks_pkey",
ADD CONSTRAINT "Marks_pkey" PRIMARY KEY ("semesterId", "courseCode", "studentId", "classTestId");
