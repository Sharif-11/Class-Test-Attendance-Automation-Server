/*
  Warnings:

  - The primary key for the `Attendances` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `Date` on the `Attendances` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Attendances" DROP CONSTRAINT "Attendances_pkey",
DROP COLUMN "Date",
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD CONSTRAINT "Attendances_pkey" PRIMARY KEY ("semesterId", "courseCode", "date");
