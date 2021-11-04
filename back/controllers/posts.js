const postsR = require('../models/posts'); // route models pour les posts
const jwt = require('jsonwebtoken'); // jsonwebtoken

let posts = new postsR();

exports.createPost = async (req, res, next) => {
    let userId = req.body.userId;
    let text = req.body.text;
    let dataCreatePost = [userId, text];
    posts.createPost(dataCreatePost)
        .then((response) => {
        res.status(201).json(JSON.stringify(response));
    })
};

exports.getAllPosts = async (req, res, next) => {
    posts.getAllPosts()
    .then((response) => {
        res.status(200).json(JSON.stringify(response));
    });
};

exports.deletePost = async (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;
    let postId = req.params.id;
    let reqPostId = [postId];
    let reqPostIdUserId = [postId];
    posts.deletePost(reqPostId, reqPostIdUserId)
    .then((response) => {
        res.status(200).json(JSON.stringify(response));
    })
    .catch((error) => {
        console.log(error);
        res.status(400).json(JSON.stringify(error));
    })
};

exports.getComment = async (req, res, next) => {
    let postId = req.params.id;
    let reqGetCom = [postId];
    posts.getComments(reqGetCom)
    .then((response) => {
        res.status(200).json(JSON.stringify(response));
    })
};

exports.createComment = async (req, res, next) => {
    let postId = req.params.id;
    let userId = req.body.userId;
    let text = req.body.text;
    let name = req.body.name;
    let reqPostComment = [userId, postId, text, name];
    console.log(reqPostComment);
    posts.createCom(reqPostComment)
    .then((response) => {
        res.status(201).json(JSON.stringify(response));
    })
};

exports.deleteComment = async (req, res, next) => {
    let comId = req.params.id;
    let reqDeleteCom = [comId];
    posts.deleteComment(reqDeleteCom)
    .then((response) => {
        res.status(201).json(JSON.stringify(response));
    })
};