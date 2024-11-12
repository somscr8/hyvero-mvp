import express from 'express';
import multer from 'multer';
import { auth } from '../middleware/auth.js';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/upload', auth, upload.single('file'), async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    res.json({
      filename: req.file.filename,
      originalname: req.file.originalname,
      mimetype: req.file.mimetype,
      size: req.file.size
    });
  } catch (error) {
    next(error);
  }
});

router.get('/:filename', auth, async (req, res, next) => {
  try {
    res.download(`uploads/${req.params.filename}`);
  } catch (error) {
    next(error);
  }
});

export default router;