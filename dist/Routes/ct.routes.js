'use strict'
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
const express_1 = __importDefault(require('express'))
const ct_controllers_1 = require('../Controllers/ct.controllers')
const ct_validators_1 = require('../Validators/ct.validators')
const multer_1 = require('../config/multer')
const verifyBatch_1 = __importDefault(require('../middlewares/verifyBatch'))
const verifyCtPermission_1 = __importDefault(
  require('../middlewares/verifyCtPermission'),
)
const verifyInstructor_1 = __importDefault(
  require('../middlewares/verifyInstructor'),
)
const verifyUser_1 = __importDefault(require('../middlewares/verifyUser'))
const ctRoutes = express_1.default.Router()
ctRoutes.post(
  '/',
  ct_validators_1.ctValidators.validateCreateCt,
  (0, verifyUser_1.default)('teacher'),
  verifyInstructor_1.default,
  ct_controllers_1.ctControllers.createCt,
)
ctRoutes.post(
  '/evaluate-ct/:classTestId',
  multer_1.multerConfig.uploadExcel.single('excelFile'),
  ct_validators_1.ctValidators.validateEvaluateCt,
  (0, verifyUser_1.default)('teacher'),
  verifyInstructor_1.default,
  ct_controllers_1.ctControllers.evaluateCt,
)
ctRoutes.get(
  '/results',
  ct_validators_1.ctValidators.validateGetAllCtResult,
  (0, verifyUser_1.default)('student'),
  verifyBatch_1.default,
  ct_controllers_1.ctControllers.getAllCtResult,
)
ctRoutes.get(
  '/teacher-ct/:courseCode',
  ct_validators_1.ctValidators.validateGetAllCt,
  (0, verifyUser_1.default)('teacher'),
  verifyInstructor_1.default,
  ct_controllers_1.ctControllers.getAllCt,
)
ctRoutes.get(
  '/final-result/:courseCode',
  ct_validators_1.ctValidators.validateCalculateFinalResult,
  (0, verifyUser_1.default)('teacher'),
  verifyInstructor_1.default,
  ct_controllers_1.ctControllers.calculateFinalResult,
)
ctRoutes.get(
  '/ct-result/:classTestId',
  ct_validators_1.ctValidators.validateGetCtResultForTeacher,
  (0, verifyUser_1.default)('teacher'),
  verifyCtPermission_1.default,
  ct_controllers_1.ctControllers.getCtResultForTeacher,
)
exports.default = ctRoutes
