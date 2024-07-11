"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cloudinary_1 = __importDefault(require("cloudinary"));
const index_1 = __importDefault(require("./index"));
cloudinary_1.default.v2.config({
    cloud_name: index_1.default.cloudinaryName,
    api_key: index_1.default.cloudinaryKey,
    api_secret: index_1.default.cloudinarySecret,
});
exports.default = cloudinary_1.default;
