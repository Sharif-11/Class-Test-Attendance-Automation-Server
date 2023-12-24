import { RequestHandler } from 'express'
import fs from 'fs'
import httpStatus from 'http-status'
import cloudinary from '../config/cloudinary'
const imageUploader: RequestHandler = async (req, res, next) => {
  if (!req.file) {
    return res.status(400).json({
      statusCode: httpStatus.BAD_REQUEST,
      success: false,
      message: 'No image file uploaded',
    })
  }
  try {
    console.log(req.file.path)
    const result = await cloudinary.v2.uploader.upload(req.file.path)

    req.body.profileImage = result.secure_url
    fs.unlink(req.file.path, err => {
      if (!err) {
        return true
      }
      return false
    })
    next()
  } catch (error) {
    next(error)
  }
}
export default imageUploader
