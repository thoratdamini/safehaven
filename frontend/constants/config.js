// API NOTIFICATION



export const API_NOTIFICATION_MESSAGES = {
    loading: {
        title: "Loading...",
        message: "Data is being loaded. Please wait"
    },
    success: {
        title: "Success",
        message: "Data successfully loaded"
    },
    requestFailure: {
        title: "Error!",
        message: "An error occur while parsing request data"
    },
    responseFailure: {
        title: "Error!",
        message: "An error occur while fetching response from server. Please try again"
    },
    networkError: {
        title: "Error!",
        message: "Unable to connect to the server. Please check internet connectivity and try again."
    }
}


  
// API SERVICE URL
// SAMPLE REQUEST
// NEED SERVICE CALL: { url: "/", method: "POST/GET/PUT/DELETE" }
export const SERVICE_URLS = {
    userSignup: { url: '/signup', method: 'POST' },
    userLogin: { url: '/login', method: 'POST' },
    getUsersDetails: { url: '/users', method: 'GET' },
    deleteUsersDetails: { url: '/users/delete', method: 'DELETE',query:true },
    uploadFile: { url: '/file/upload', method: 'POST' },
    createPost:{url: 'create',method:'POST'},
    getAllPosts:{url: '/posts',method:'GET',params:true},
    getPostById: {url:'post',method:'GET',query: true},
    updatePost:{url:'update',method:'PUT',query:true},
    deletePost:{url:'delete',method:'DELETE',query:true},
    newComment:{url:'/comment/new',method:'POST'},
    getAllComments:{url:'/comments',method:'GET',query:true},
    deleteComment:{url:'comment/delete',method:'DELETE',query:true},
    createCamp:{url: '/camp/new',method:'POST'},
    getCamp:{url: '/camps',method:'GET',params:true},
    updateCamp:{url:'/camp/update',method:'PUT',query:true},
    deleteCampsDetails:{url:'/camp/delete',method:'DELETE',query:true},
    createNews:{url: '/news/new',method:'POST'},
    getNews:{url: '/news',method:'GET',params:true},
    updateNews:{url:'/news/update',method:'PUT',query:true},
    deleteNewsDetails:{url:'/news/delete',method:'DELETE',query:true},
    getAllQueries:{url: '/queries',method:'GET',params:true},
    deleteQuery:{url:'/query/delete',method:'DELETE',query:true},


}