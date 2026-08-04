import multer from 'multer'

import path from 'path'

import {
  CloudinaryStorage
} from 'multer-storage-cloudinary'

import cloudinary from '../config/cloudinary.js'

const storage =
  new CloudinaryStorage({

    cloudinary,

    params: async (
      req,
      file
    ) => {

      const ext =
        path.extname(
          file.originalname
        )

      const fileName =
        file.originalname
          .replace(ext, '')
          .replace(/\s+/g, '-')

      return {

        folder: 'lab-reports',

        resource_type: 'raw',

        type: 'upload',

        public_id:
          Date.now() +
          '-' +
          fileName,

        format:
          ext.replace('.', ''),

        flags: 'attachment'

      }
    }

  })

const upload = multer({
  storage
})

export default upload