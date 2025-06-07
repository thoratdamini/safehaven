import express from 'express'
import { signupUser, loginUser, getUsersDetails, deleteUsersDetails } from '../controller/user-controller.js';
import { uploadImage, getImage } from '../controller/image-controller.js';
import upload from '../utils/upload.js'
import { authenticateToken } from '../controller/jwt-controller.js';
import { createPost, getAllPosts, getPost, updatePost, deletePost, searchPosts } from '../controller/post-controller.js';
import { newComment, getComments, deleteComment } from '../controller/comment-controller.js';
import { deleteCampsDetails, getCamp, newCamp, updateCamp } from '../controller/camp-controller.js';
import { deleteNewsDetails, getNews, newNews, updateNews } from '../controller/news-controller.js';
import { addQuery, deleteQuery, getAllQueries } from '../controller/query-controller.js';
import { addSubscription, getAllSubscriptions } from '../controller/newsletter-controller.js';

const router = express.Router();

// Routes related to user management
router.post('/signup', signupUser); // Route to sign up a new user
router.post('/login', loginUser); // Route to log in a user
router.get('/users', getUsersDetails); // Route to get details of all users
router.delete('/users/delete/:id', deleteUsersDetails); // Route to delete a user by ID

// Routes related to file management
router.post('/file/upload', upload.single('file'), uploadImage); // Route to upload a file
router.post('/file/:filename', getImage); // Route to get an image by filename

// Routes related to post management
router.post('/create', authenticateToken, createPost); // Route to create a new post
router.get('/posts', authenticateToken, getAllPosts); // Route to get all posts
router.get('/post/:id', authenticateToken, getPost); // Route to get a post by ID
router.put('/update/:id', authenticateToken, updatePost); // Route to update a post by ID
router.delete('/delete/:id', authenticateToken, deletePost); // Route to delete a post by ID
router.get('/search', authenticateToken, searchPosts); // Route to search for posts

// Routes related to comments management
router.post('/comment/new', authenticateToken, newComment); // Route to add a new comment
router.get('/comments/:id', authenticateToken, getComments); // Route to get comments by post ID
router.delete('/comment/delete/:id', deleteComment); // Route to delete a comment by ID

// Routes related to camp management
router.post('/camp/new', newCamp); // Route to add a new camp
router.get('/camps', getCamp); // Route to get all camps
router.put('/camp/update/:id', updateCamp); // Route to update a camp by ID
router.delete('/camp/delete/:id', deleteCampsDetails); // Route to delete a camp by ID

// Routes related to news management
router.post('/news/new', newNews); // Route to add a new news
router.get('/news', getNews); // Route to get all news
router.put('/news/update/:id', updateNews); // Route to update a news by ID
router.delete('/news/delete/:id', deleteNewsDetails); // Route to delete a news by ID

// Routes related to query management
router.post('/send-email', addQuery); // Route to send email queries
router.get('/queries', getAllQueries); // Route to get all queries
router.delete('/query/delete/:id', deleteQuery); // Route to delete a query by ID

// Routes related to subscription management
router.post('/add-subscription', addSubscription); // Route to add a new subscription
router.get('/subscriptions', getAllSubscriptions); // Route to get all subscriptions

export default router;
