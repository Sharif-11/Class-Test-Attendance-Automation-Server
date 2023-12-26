/*
  Warnings:

  - You are about to drop the `Attendance` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Attendance" DROP CONSTRAINT "Attendance_courseCode_fkey";

-- DropForeignKey
ALTER TABLE "Attendance" DROP CONSTRAINT "Attendance_semesterId_fkey";

-- DropTable
DROP TABLE "Attendance";

-- CreateTable
CREATE TABLE "Attendances" (
    "attendanceId" TEXT NOT NULL,
    "semesterId" TEXT NOT NULL,
    "courseCode" TEXT NOT NULL,
    "Date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Attendances_pkey" PRIMARY KEY ("semesterId","courseCode","Date")
);

-- CreateTable
CREATE TABLE "Student_attendances" (
    "attendanceId" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,

    CONSTRAINT "Student_attendances_pkey" PRIMARY KEY ("attendanceId","studentId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Attendances_attendanceId_key" ON "Attendances"("attendanceId");

-- AddForeignKey
ALTER TABLE "Attendances" ADD CONSTRAINT "Attendances_semesterId_fkey" FOREIGN KEY ("semesterId") REFERENCES "Semesters"("semesterId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attendances" ADD CONSTRAINT "Attendances_courseCode_fkey" FOREIGN KEY ("courseCode") REFERENCES "Courses"("courseCode") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student_attendances" ADD CONSTRAINT "Student_attendances_attendanceId_fkey" FOREIGN KEY ("attendanceId") REFERENCES "Attendances"("attendanceId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student_attendances" ADD CONSTRAINT "Student_attendances_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Students"("studentId") ON DELETE RESTRICT ON UPDATE CASCADE;
