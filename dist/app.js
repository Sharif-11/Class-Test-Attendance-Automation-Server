"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const global_routes_1 = __importDefault(require("./Routes/global.routes"));
const utils_services_1 = require("./Services/utils.services");
const globalErrorHandler_1 = __importDefault(require("./middlewares/globalErrorHandler"));
const swagger_json_1 = __importDefault(require("./swagger.json"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
const corsOptions = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    origin: function (origin, callback) {
        callback(null, true);
    },
    credentials: true, // Allow credentials
};
// Use CORS middleware
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.static('public'));
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_json_1.default));
app.use('/api/v1', global_routes_1.default);
app.get('/', (req, res) => res.send('welcome'));
app.delete('/nullify', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log({ a: 1 });
    yield (0, utils_services_1.nullifyTables)();
    res.end();
}));
app.get('*', (req, res) => res.status(400).json({ message: 'no route found' }));
app.use(globalErrorHandler_1.default);
exports.default = app;
