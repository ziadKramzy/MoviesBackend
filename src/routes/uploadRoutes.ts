import { Router } from 'express';
import { uploadSingle } from '../middleware/upload';
import { auth } from '../middleware/auth';
import path from 'path';

const router = Router();

// Upload image endpoint
router.post('/image', auth, uploadSingle, (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: 'No image file provided'
      });
    }

    // Return the file path that can be used to access the image
    const imageUrl = `/uploads/${req.file.filename}`;
    
    res.json({
      success: true,
      data: {
        filename: req.file.filename,
        originalName: req.file.originalname,
        size: req.file.size,
        url: imageUrl
      }
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to upload image'
    });
  }
});

// Note: Images are served by static middleware in index.ts
// This route is not needed as express.static handles /uploads

export { router as uploadRoutes }; 