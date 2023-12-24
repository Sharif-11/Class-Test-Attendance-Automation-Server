/*
  Warnings:

  - The primary key for the `Class_tests` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Class_tests" DROP CONSTRAINT "Class_tests_pkey",
ADD CONSTRAINT "Class_tests_pkey" PRIMARY KEY ("semesterId", "courseCode", "classTestId");
