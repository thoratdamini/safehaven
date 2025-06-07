import grid from 'gridfs-stream';
import mongoose from 'mongoose';

// MongoDB connection URL
const url = 'http://localhost:8000';

// Initialize variables for gridfs-stream and GridFSBucket
let gfs, gridfsBucket;

// MongoDB connection event handler
const conn = mongoose.connection;
conn.once('open', () => {
    // Create a new GridFSBucket instance with the MongoDB connection and bucket name 'fs'
    gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName: 'fs'
    });
    
    // Create a gridfs-stream instance with the MongoDB connection
    gfs = grid(conn.db, mongoose.mongo);
    
    // Set the collection name to 'fs'
    gfs.collection('fs');
});

// Controller to upload an image
export const uploadImage = (request, response) => {
    // Check if a file is included in the request
    if (!request.file) {
        console.log('File not found');
        return response.status(404).json("File not found");
    }

    // Construct the image URL using the server URL and the filename
    const imageUrl = `${url}/file/${request.file.filename}`;
    console.log('Image URL:', imageUrl);

    // Respond with the image URL
    response.status(200).json(imageUrl);
}

// Controller to get an image by filename
export const getImage = async (request, response) => {
    try {
        // Find the file in the 'fs' collection by filename
        const file = await gfs.files.findOne({ filename: request.params.filename });
        if (!file) {
            // If file not found, respond with an error message
            console.log('File not found in database');
            return response.status(404).json("File not found");
        }

        // Log the found file
        console.log('Found file:', file);
        
        // Create a read stream for the file and pipe it to the response
        const readStream = gfs.createReadStream(file.filename);
        readStream.pipe(response);
        // Alternatively, you can use GridFSBucket's openDownloadStream method:
        // const readStream = gridfsBucket.openDownloadStream(file._id);
        // readStream.pipe(response);
    } catch (error) {
        // If an error occurs, log the error and respond with an error message
        console.error('Error retrieving image:', error);
        response.status(500).json({ msg: error.message });
    }
}
