'use strict'
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value)
          })
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value))
        } catch (e) {
          reject(e)
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value))
        } catch (e) {
          reject(e)
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected)
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next())
    })
  }
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
const fs_1 = __importDefault(require('fs'))
const http_status_1 = __importDefault(require('http-status'))
const cloudinary_1 = __importDefault(require('../config/cloudinary'))
const imageUploader = (req, res, next) =>
  __awaiter(void 0, void 0, void 0, function* () {
    if (!req.file) {
      return res.status(400).json({
        statusCode: http_status_1.default.BAD_REQUEST,
        success: false,
        message: 'No image file uploaded',
      })
    }
    try {
      console.log(req.file.path)
      const result = yield cloudinary_1.default.v2.uploader.upload(
        req.file.path,
      )
      req.body.profileImage = result.secure_url
      fs_1.default.unlink(req.file.path, err => {
        if (!err) {
          return true
        }
        return false
      })
      next()
    } catch (error) {
      next(error)
    }
  })
exports.default = imageUploader
