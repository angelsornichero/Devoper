import { Router } from "express";
import * as crtlVideo from '../controllers/videos.controllers.js'

const router = Router()

// Get
router.get('/videos', crtlVideo.getVideos)
router.get('/videos/:id', crtlVideo.getVideo)
// Post
router.post('/video/create', crtlVideo.createVideo)
router.post('/register', )
router.post('/login', )
// Delete
router.delete('/video/delete/:id', crtlVideo.deleteVideo)
// Put
router.put('/video/update/:id', crtlVideo.updateVideo)



export default router;