"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.multerConfig = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const ext = path_1.default.extname(file.originalname);
        cb(null, `${Date.now()}${ext}`);
    },
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    }
    else {
        cb(new Error('Only images are allowed!'), false);
    }
};
const excelFileFilter = (req, file, cb) => {
    // Check if the file has the correct MIME type for Excel files
    if (file.mimetype === 'application/vnd.ms-excel' ||
        file.mimetype ===
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
        cb(null, true); // Accept the file
    }
    else {
        cb(new Error('Invalid file type. Only Excel files are allowed.'), false);
    }
};
const uploadImage = (0, multer_1.default)({
    storage,
    fileFilter,
    limits: {
        fileSize: 1024 * 1024, // 1 MB limit
    },
});
const excelStorage = multer_1.default.memoryStorage();
const uploadExcel = (0, multer_1.default)({
    storage: excelStorage,
    fileFilter: excelFileFilter,
    limits: {
        fileSize: 1024 * 1024,
    },
});
exports.multerConfig = { uploadImage, uploadExcel };
