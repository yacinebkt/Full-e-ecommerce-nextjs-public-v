//       const {data} = await axios.post('/api/admin/upload', bodyFomData, {

    import nextConnect from 'next-connect'
    import multer from 'multer'
    import {v2 as cloudinary} from 'cloudinary'
    import streamifier from 'streamifier'
    import {onError} from '../../../utils/error/error'
    import { isAuth } from '../../../utils/auth/auth';
    
    
    
    
    cloudinary.config({ 
        cloud_name: process.env.CLOUD_NAME_CLOUDINARY, 
        api_key: process.env.API_KEY_CLOUDINARY, 
        api_secret: process.env.API_SECRET_CLOUDINARY
    });
    
      
    export const config = {
        api : { 
            bodyParser : false
        }
    }
    
    
    const handler = nextConnect({ onError})
    const upload = multer()
    
    handler.use(isAuth, upload.single('file')).post( async (req, res) => {
        const streamUpload = (req) => {
            return new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream((error, result)=> {
                    if (result) {
                        resolve(result)
                    } else {
                        reject(error)
                    }
                })
    
                streamifier.createReadStream(req.file.buffer).pipe(stream)
            })
        }
    
        const result = await streamUpload(req);
        res.send(result)
    })
    
    
    export default handler;
    
    