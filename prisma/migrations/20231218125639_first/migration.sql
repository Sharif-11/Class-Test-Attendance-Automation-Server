-- CreateEnum
CREATE TYPE "Role" AS ENUM ('student', 'teacher');

-- CreateTable
CREATE TABLE "Students" (
    "studentId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "batch" TEXT NOT NULL,
    "session" TEXT NOT NULL,
    "department" TEXT NOT NULL,
    "role" "Role" NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Students_pkey" PRIMARY KEY ("studentId")
);

-- CreateTable
CREATE TABLE "Teachers" (
    "teacherId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "designation" TEXT NOT NULL,
    "specialization" TEXT,
    "role" "Role" NOT NULL,
    "password" TEXT NOT NULL,
    "deptHead" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Teachers_pkey" PRIMARY KEY ("teacherId")
);

-- CreateTable
CREATE TABLE "Courses" (
    "courseCode" TEXT NOT NULL,
    "courseTitle" TEXT NOT NULL,
    "credit" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Courses_pkey" PRIMARY KEY ("courseCode")
);

-- CreateTable
CREATE TABLE "Semesters" (
    "semesterTitle" TEXT NOT NULL,
    "batch" TEXT NOT NULL,
    "semesterId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Semesters_pkey" PRIMARY KEY ("semesterId")
);

-- CreateTable
CREATE TABLE "Semester_courses" (
    "semesterId" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "teacherId" TEXT NOT NULL,

    CONSTRAINT "Semester_courses_pkey" PRIMARY KEY ("semesterId","courseId","teacherId")
);

-- CreateTable
CREATE TABLE "Class_tests" (
    "semesterId" TEXT NOT NULL,
    "courseCode" TEXT NOT NULL,
    "classTestId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Class_tests_pkey" PRIMARY KEY ("semesterId","courseCode")
);

-- CreateTable
CREATE TABLE "Marks" (
    "classTestId" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Marks_pkey" PRIMARY KEY ("classTestId","studentId")
);

-- CreateTable
CREATE TABLE "Attendance" (
    "semesterId" TEXT NOT NULL,
    "courseCode" TEXT NOT NULL,
    "Date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "studentList" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Attendance_pkey" PRIMARY KEY ("semesterId","courseCode")
);

-- CreateIndex
CREATE UNIQUE INDEX "Class_tests_classTestId_key" ON "Class_tests"("classTestId");

-- AddForeignKey
ALTER TABLE "Semester_courses" ADD CONSTRAINT "Semester_courses_semesterId_fkey" FOREIGN KEY ("semesterId") REFERENCES "Semesters"("semesterId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Semester_courses" ADD CONSTRAINT "Semester_courses_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Courses"("courseCode") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Semester_courses" ADD CONSTRAINT "Semester_courses_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "Teachers"("teacherId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Class_tests" ADD CONSTRAINT "Class_tests_semesterId_fkey" FOREIGN KEY ("semesterId") REFERENCES "Semesters"("semesterId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Class_tests" ADD CONSTRAINT "Class_tests_courseCode_fkey" FOREIGN KEY ("courseCode") REFERENCES "Courses"("courseCode") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Marks" ADD CONSTRAINT "Marks_classTestId_fkey" FOREIGN KEY ("classTestId") REFERENCES "Class_tests"("classTestId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Marks" ADD CONSTRAINT "Marks_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Students"("studentId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attendance" ADD CONSTRAINT "Attendance_semesterId_fkey" FOREIGN KEY ("semesterId") REFERENCES "Semesters"("semesterId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attendance" ADD CONSTRAINT "Attendance_courseCode_fkey" FOREIGN KEY ("courseCode") REFERENCES "Courses"("courseCode") ON DELETE RESTRICT ON UPDATE CASCADE;
