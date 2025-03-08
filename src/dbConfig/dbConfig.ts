import mongoose from "mongoose";

export async function connect(){
    try {
        mongoose.connect(process.env.MONGO_URI!)
        const connection = mongoose.connection
        connection.on('connected', ()=>{
            console.log("mongodb connected")
        })
        connection.on('error', (error)=>{
            console.log("something went wrong in db", error)
            process.exit()
        })

    } catch (error) {
        console.log("something went wrong error",error)
        console.log(error)
    }
}