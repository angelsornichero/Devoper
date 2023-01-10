import { Router } from "express";
import * as crtlVideo from '../controllers/videos.controllers.js'
import * as crtlUser from '../controllers/users.controllers.js'
import * as crtlComment from '../controllers/comments.controllers.js'
import * as crtlLike from '../controllers/likes.controllers.js'
import { isAuthenticated } from "../middlewares/isAuthorized.js";

const router = Router()

// Get
router.get('/videos', crtlVideo.getVideos)
router.get('/videos/:id', crtlVideo.getVideo)
router.get('/comments/:id', crtlComment.getComments)
router.get('/likes/:id', crtlLike.getLikes)
// Post
router.post('/comment/create/:id', isAuthenticated, crtlComment.createComment)
router.post('/video/create', isAuthenticated, crtlVideo.createVideo)
router.post('/register', crtlUser.registerUser)
router.post('/login', crtlUser.loginUser)
router.post('/like/create/:id', isAuthenticated, crtlLike.createLikes)
// Delete
router.delete('/video/delete/:id', isAuthenticated, crtlVideo.deleteVideo)
router.delete('/comment/delete/:id', isAuthenticated, crtlComment.deleteComments)
router.delete('/like/delete/:id', isAuthenticated, crtlLike.deleteLike)
// Put
router.put('/video/update/:id', isAuthenticated, crtlVideo.updateVideo)



export default router;