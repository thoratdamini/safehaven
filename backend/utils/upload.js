import multer from 'multer';
import { GridFsStorage } from 'multer-gridfs-storage';

const storage = new GridFsStorage({
    url: `mongodb://patelsmit5:admin@ac-gizmxbc-shard-00-00.xl93pss.mongodb.net:27017,ac-gizmxbc-shard-00-01.xl93pss.mongodb.net:27017,ac-gizmxbc-shard-00-02.xl93pss.mongodb.net:27017/?ssl=true&replicaSet=atlas-yt6wi9-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Refugee-assistant-app`,
    options: { useNewUrlParser: true, useUnifiedTopology: true },
    file: (request, file) => {
        const match = ["image/png", "image/jpg"];

        if(match.indexOf(file.mimetype) === -1) 
            return`${Date.now()}-blog-${file.originalname}`;

        return {
            bucketName: "photos",
            filename: `${Date.now()}-blog-${file.originalname}`
        }
    }
});

export default multer({ storage });
