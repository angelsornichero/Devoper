import  {useEffect, useState, ChangeEvent} from 'react'
import { Video } from '../../types/Video.type'
import { useParams } from 'react-router-dom'
import ReactPlayer from 'react-player'
import { getUser } from '../../services/UserService'
import { getVideoById, giveLike, deleteLike, createComment } from '../../services/VideoService'
import { useCookies } from 'react-cookie'
import * as jose from 'jose'
import { AiFillHeart, AiOutlineSend } from 'react-icons/ai'
import { Comment } from '../../types/Comment.type'
import { Comments } from '../Commentaries/Comments'
import { Like } from '../Like/Like'

export const VideoInterface = () => {
    const [video, setVideo] = useState<Video>()
    const [error, setError] = useState<boolean>(false)
    const [userId, setUserId] = useState<string>('')
    const [user, setUser] = useState<string>('')
    const [jwt, setJwt] =  useState<string>()
    const [cookie] = useCookies(['sessionJWT'])
    const [sendComment, setSendComment] = useState<Comment>({comment: '', userId: userId})
    const { id } = useParams()

    const loadVideo = async () => {
        const videoFound = await getVideoById(id as string)
        if (!videoFound) return setError(true)
        setVideo(videoFound.video)
        
    }
    const loadUser = async () => {  
        try {
            const verify = jose.jwtVerify(cookie.sessionJWT, new TextEncoder().encode(import.meta.env.VITE_SECRET_JWT as string))
            if (!verify) return
            return setJwt(cookie.sessionJWT)
        } catch {
            return
        }

    }

    const loadUserId = async () => {
        const videoFound = await getVideoById(id as string)
        if (!videoFound) return
        const data = await getUser(videoFound.video.userId.toString())
        setUser(data.username)
      }

    const loadId = async () => {
        const { payload } = await jose.jwtVerify(cookie.sessionJWT, new TextEncoder().encode(import.meta.env.VITE_SECRET_JWT as string))
        setUserId(payload.id as string)
        setJwt(cookie.sessionJWT)
        return payload.id
    }

    const handleInputChange = (e: any) => {
        setSendComment({...sendComment, [e.target.name]: e.target.value})
    }
    
    const submitComment = async (e: any) => {
        e.preventDefault()
        console.log(sendComment.comment)
        try {
            const data = await createComment(sendComment.comment, jwt as string, id as string)
            console.log(data)
            window.location.reload()
        }
        catch {
            return
        }
    }
    
    useEffect(() => {
        loadVideo()
        loadUser()
        loadUserId()
        loadId()
        // videoIsLiked()
    }, [])

    return (
        <div>
            {
                error 
                    ? (
                        <div className='p-4 bg-red-600 rounded-lg'>
                            <h1>Error on load video, probably video doesn't exists</h1>
                        </div>
                    )
                    : <></>
            }
            {
                video
                    ? (
                <div className='w-screen'>
                    <h1 className='text-center text-6xl mt-4 text-white font-bold'>{video.title}</h1>
                    <div className='mx-16 my-8 flex justify-center rounded-lg'>
                        <ReactPlayer width={1300} height={600} className='' url={video.url} />
                    </div>
                    <div className='mx-16 flex justify-between bg-white rounded-xl'>
                        <span className='p-4 text-3xl flex gap-4'>Video posted by:<p className='text-blue-600'> {user}</p></span>
                        <div className='flex'>
                            { 
                                jwt ? <Like jwt={jwt as string} id={video._id as string} video={video as Video} userId={userId as string} /> 
                                : <div></div>
                            }
                            <span className='text-3xl p-4'>{video.likes?.length}</span>
                        </div>
                    </div>
                    <div className='m-10 border-blue-600 mx-10 border-2 rounded-xl text-center'>
                        <h1 className='text-6xl text-white font-bold p-4'>Comments</h1>
                    </div>
                    {
                        jwt
                            ? (
                                <div className='bg-white flex gap-4 rounded-2xl m-6 mx-[600px] p-4 justify-center'>
                                    <input className='bg-green-700 text-2xl text-white p-3 w-96 rounded-xl' type={'text'} name='comment' onChange={handleInputChange} placeholder='Write a comment' />
                                <button onClick={submitComment} className='text-4xl text-blue-600'><AiOutlineSend /></button>

                                </div>
                            )
                            : <div></div>
                    }
                    <Comments idVideo={id as string}  />
                </div>
                )
                    :   <div></div>
            }
        </div>
    )
}
