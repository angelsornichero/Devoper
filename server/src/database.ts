import console from "console";
import { prototype } from "events";
import mongoose from "mongoose";


(async () => {
    try {
        const db = await mongoose.connect(
            process.env.MONGO_URL_DEV as string,
            {
                "user": process.env.MONGO_USER,
                "pass": process.env.MONGO_PASSWORD
            }
        )
        console.log('[*] Database connected to: ', db.connection.name)
    }
    
    catch(err) {
        console.error(err)
    }
})()

