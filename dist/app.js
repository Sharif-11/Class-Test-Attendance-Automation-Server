'use strict'
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
const cookie_parser_1 = __importDefault(require('cookie-parser'))
const cors_1 = __importDefault(require('cors'))
const express_1 = __importDefault(require('express'))
const swagger_ui_express_1 = __importDefault(require('swagger-ui-express'))
const global_routes_1 = __importDefault(require('./Routes/global.routes'))
const globalErrorHandler_1 = __importDefault(
  require('./middlewares/globalErrorHandler'),
)
const swagger_json_1 = __importDefault(require('./swagger.json'))
const app = (0, express_1.default)()
app.use((0, cors_1.default)())
app.use(express_1.default.json())
app.use(express_1.default.urlencoded({ extended: true }))
app.use((0, cookie_parser_1.default)())
app.use(express_1.default.static('public'))
app.use(
  '/api-docs',
  swagger_ui_express_1.default.serve,
  swagger_ui_express_1.default.setup(swagger_json_1.default),
)
app.use('/api/v1', global_routes_1.default)
app.get('/', (req, res) => res.send('welcome'))
app.get('*', (req, res) => res.status(400).json({ message: 'no route found' }))
app.use(globalErrorHandler_1.default)
exports.default = app
