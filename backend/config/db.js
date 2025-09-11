import mongoose, { mongo } from 'mongoose'

//connect to db

const connectDB = async ()=>{
    mongoose.connection.on('connected', ()=> console.log('Database Connected'))

    await mongoose.connect(`${process.env.MONGO_URI}/coinkeeper`)
}

export default connectDB

