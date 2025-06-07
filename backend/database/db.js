import mongoose from "mongoose"


const connection  =async (USERNAME,PASSWORD)=>{
    const URL =`mongodb://${USERNAME}:${PASSWORD}@ac-gizmxbc-shard-00-00.xl93pss.mongodb.net:27017,ac-gizmxbc-shard-00-01.xl93pss.mongodb.net:27017,ac-gizmxbc-shard-00-02.xl93pss.mongodb.net:27017/?ssl=true&replicaSet=atlas-yt6wi9-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Refugee-assistant-app`;
    try {
        await mongoose.connect(URL,{useNewUrlParser: true});
        console.log('Database connected successfully')
    } catch (error) {
        console.log('Error while connecting with the database',error);
    }
}

export default connection;