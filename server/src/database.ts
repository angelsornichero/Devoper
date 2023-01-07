import console from "console";
import mongoose from "mongoose";


(async () => {
    try {
        const db = await mongoose.connect(process.env.MONGO_URL_DEV as string)
        console.log('[*] Database connected to: ', db.connection.name)
    }
    
    catch(err) {
        console.error(err)
    }
})()

