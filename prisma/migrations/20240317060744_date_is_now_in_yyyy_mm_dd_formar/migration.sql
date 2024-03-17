/*
  Warnings:

  - The primary key for the `Attendances` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Attendances" DROP CONSTRAINT "Attendances_pkey",
ALTER COLUMN "date" DROP DEFAULT,
ALTER COLUMN "date" SET DATA TYPE TEXT,
ADD CONSTRAINT "Attendances_pkey" PRIMARY KEY ("semesterId", "courseCode", "date");
