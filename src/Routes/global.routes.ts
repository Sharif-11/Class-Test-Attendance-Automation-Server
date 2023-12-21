import express from 'express'
import courseRoutes from './course.routes'
import semesterRoutes from './semester.routes'
import studentRoutes from './student.routes'
import teacherRoutes from './teacher.routes'
const globalRoutes = express.Router()
const moduleRoutes = [
  {
    path: '/teacher',
    route: teacherRoutes,
  },
  {
    path: '/student',
    route: studentRoutes,
  },
  {
    path: '/courses',
    route: courseRoutes,
  },
  {
    path: '/semesters',
    route: semesterRoutes,
  },
]
moduleRoutes.forEach(route => globalRoutes.use(route.path, route.route))
export default globalRoutes
