import { Router } from 'express';
import multer from 'multer';
import cloudinary from '../config/cloudinary.js';
import { deleteImage, uploadImage } from '../controllers/upload.js';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

const router = Router();
const storage = new CloudinaryStorage({
   cloudinary: cloudinary,
   params: {
      folder: 'nhom3',
      format: 'jpg'
   }
});
const upload = multer({
   storage: storage
});

router.post('/upload', upload.array('images', 3), uploadImage);
router.delete('/delete-image/:publicId', deleteImage);
// còn phần update ảnh từ từ đã
export default router;
