import { Router } from "express";
import * as crtlVideo from '../controllers/videos.controllers.js'
import * as crtlUser from '../controllers/users.controllers.js'


const router = Router()

// Get
router.get('/videos', crtlVideo.getVideos)
router.get('/videos/:id', crtlVideo.getVideo)
// Post
router.post('/video/create', crtlVideo.createVideo)
router.post('/register', crtlUser.registerUser)
router.post('/login', crtlUser.loginUser)
// Delete
router.delete('/video/delete/:id', crtlVideo.deleteVideo)
// Put
router.put('/video/update/:id', crtlVideo.updateVideo)



export default router;