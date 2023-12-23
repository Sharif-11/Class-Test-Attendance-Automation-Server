/*
  Warnings:

  - The primary key for the `Marks` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[classTestId]` on the table `Marks` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Marks" DROP CONSTRAINT "Marks_pkey",
ADD CONSTRAINT "Marks_pkey" PRIMARY KEY ("semesterId", "courseCode", "studentId");

-- CreateIndex
CREATE UNIQUE INDEX "Marks_classTestId_key" ON "Marks"("classTestId");
