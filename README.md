# LinkedInClone
## To run server: npm run server
## to run tests: npm run test

1.This clone application has core features of linkedIn such as login, signup, posting a blog, making new connections, follow, unfollow, like/unlike/comment on posts/blogs, feed, searching a user etc.
2.The app as of now is implemented in REST API. 
3.The application has Authentication and Authorisation features wherever needed.
4.Tech stack used are Node.js, express.js, MongoDB, JWT etc.
5.Search functionality will give you users classifed with either 1st connection, 2nd connection or 3rd+ connection. This feature has graph implementation.
6.Test cases are implemented in test folder.
7. Few APIs are unrestricted, such as /api/authenticate. for the rest you will have to login.
8. The APIs with respective functionalities are following:
    * POST /api/user/login or /api/authenticate: for user login.
    * POST /api/user/signup: For new user registration.
    * GET /api/user/all: See all users info
    * GET /api/blog/ : See all posts
    * POST /api/connect/send : Send a connection request.
    * POST /api/connect/accept: Accept a connection request.
    * GET /api/connect/ : See all connection requests for authenticated user.
    * GET /api/connect/list: See connections list.
    * GET /api/connect/search: Search a user.
    * POST /api/follow/:id : Follow a user.
    * POST /api/unfollow/:id : Unfollow a user.
    * GET /api/user: Logged in user information.
    * POST /api/posts: Create a post/blog.
    * DELETE /api/posts/:id : Delete a blog.
    * POST /api/like/:id : Like a blog.
    * POST /api/unlike/:id : Unlike a blog.
    * POST /api/comment/:id : Comment on a blog.
    * GET /api/post/:id : Get blog by id
    * GET /api/all_posts : All posts by current user.
    * GET /api/user/feed: Get all posts in feed for authenticated user.
    
    
    
    
    
    
    
    
    
    
    
 # Docker Immage pulic Link
 
 https://hub.docker.com/r/ramitnitp/social-media/tags
 
 
 

