"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyDate = exports.generateToken = exports.comparePasswords = exports.hashPassword = exports.createSemesterId = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const utils_1 = require("../Shared/utils");
const config_1 = __importDefault(require("../config"));
const createSemesterId = (semesterTitle, batch) => {
    if (utils_1.semesterTitles[semesterTitle]) {
        return batch + utils_1.semesterTitles[semesterTitle];
    }
    else {
        throw new Error('Invalid semester title or batch');
    }
};
exports.createSemesterId = createSemesterId;
const hashPassword = (password) => {
    const hashedPassword = bcrypt_1.default.hashSync(password, Number(config_1.default.saltRounds));
    return hashedPassword;
};
exports.hashPassword = hashPassword;
const comparePasswords = (password, hashedPassword) => {
    const match = bcrypt_1.default.compareSync(password, hashedPassword);
    return match;
};
exports.comparePasswords = comparePasswords;
const generateToken = (id, role) => {
    const token = jsonwebtoken_1.default.sign({ id, role }, config_1.default.jwtSecret, {
        expiresIn: '1y',
    });
    return token;
};
exports.generateToken = generateToken;
const verifyDate = (date) => {
    const today = new Date();
    return (today.getDate() === date.getDate() &&
        today.getMonth() === date.getMonth() &&
        today.getFullYear() === date.getFullYear());
};
exports.verifyDate = verifyDate;
