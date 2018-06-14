
export const url = process.env.REACT_APP_READABLE_URL || "http://localhost:3001";
let token = "anto004";
const headers = {
    'Accept': 'application/json',
    'Authorization': token
};


// GET /categories
// USAGE:
//     Get all of the categories available for the app. List is found in categories.js.
//     Feel free to extend this list as you desire.
export const getCategories = () =>
    fetch(`${url}/categories`, {headers})
        .then(res => res.json())
        .then(data => data.categories);

// GET /:category/posts
// USAGE:
// Get all of the posts for a particular category
//TODO: Testing required
export const getCategoryPosts = () =>
    fetch(`${url}/:category/posts`, {headers})
        .then(res => res.json())
        .then(posts => {
            console.log("API category posts", posts);
            return posts});

// GET /posts
// USAGE:
//     Get all of the posts. Useful for the main page when no category is selected.
export const getAllPosts = () =>
    fetch(`${url}/posts`, {headers})
        .then(res => res.json())
        .then(data => data);
// POST /posts
// USAGE:
//     Add a new post
// PARAMS:
//      id - UUID should be fine, but any unique id will work
//      timestamp - timestamp in whatever format you like, you can use Date.now() if you like
//      title - String
//      body - String
//      author - String
//      category: Any of the categories listed in categories.js. Feel free to extend this list as you desire.
export const addPost = (id, timestamp, title, body, author, category) =>
    fetch(`${url}/posts`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(
            {
                "id":id,
                "timestamp": timestamp,
                "title": title,
                "body": body,
                "author": author,
                "category": category
            }
           )
    }).then(res => res.json());

// GET /posts/:id
// USAGE:
//     Get the details of a single post
export const getPost = (id) =>
    // url.searchParams.append("id", id);
    fetch(`${url}/posts/${id}`, {headers})
        .then(res => res.json());

// POST /posts/:id
// USAGE:
//     Used for voting on a post
// PARAMS:
//     option - String: Either "upVote" or "downVote"
export const votePost = (id, vote) =>
    fetch(`${url}/posts/${id}`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(
            {
                "option": vote
            }
        )
    })
        .then(res => res.json())
        .then(data => data);

// PUT /posts/:id
// USAGE:
//     Edit the details of an existing post
// PARAMS:
//     title - String
//     body - String
export const editPost = (id, title, body) =>
    fetch(`${url}/posts/${id}`, {
        method: "PUT",
        headers: {
            ...headers,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(
            {
                "title": title,
                "body": body
            }
        )
    })
        .then(res => res.json())
        .then(data => data);

//TODO create new post new comments and test deletePost
// DELETE /posts/:id
// USAGE:
//     Sets the deleted flag for a post to 'true'.
//     Sets the parentDeleted flag for all child comments to 'true'.


// GET /posts/:id/comments
// USAGE:
//     Get all the comments for a single post
export const getPostComments = (postId) =>
    fetch(`${url}/posts/${postId}/comments`, {headers})
        .then(res => res.json())
        .then(data => data);

// POST /comments
// USAGE:
//     Add a comment to a post
// PARAMS:
//     id: Any unique ID. As with posts, UUID is probably the best here.
//     timestamp: timestamp. Get this however you want.
//     body: String
//     author: String
//     parentId: Should match a post id in the database.
export const addPostComment = (id, timestamp, body, author, parentId) =>
    fetch(`${url}/comments`,{
        method: "POST",
        headers: {
            ...headers,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(
            {
                "id": id,
                "parentId": parentId,
                "timestamp": timestamp,
                "body": body,
                "author": author
            }
        )
    })
        .then(res => res.json())
        .then(data => data);

// GET /comments/:id
// USAGE:
//     Get the details for a single comment
export const getComment = (id) =>
    fetch(`${url}/comments/${id}`, {headers})
        .then(res => res.json())
        .then(data => data);

// POST /comments/:id
// USAGE:
//     Used for voting on a comment.
//     PARAMS:
//     option - String: Either "upVote" or "downVote"
export const voteComment = (id, option) =>
    fetch(`${url}/comments/${id}`, {
        method: "POST",
        headers: {
            ...headers,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(
            {
                "option": option
            }
        )

    })
        .then(res => {
            console.log("API commentVote", res);
            return res.json();
        })
        .then(data => data);


// PUT /comments/:id
// USAGE:
//     Edit the details of an existing comment
// PARAMS:
//     timestamp: timestamp. Get this however you want.
//     body: String
// DELETE /comments/:id
// USAGE:
//     Sets a comment's deleted flag to 'true'