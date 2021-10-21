const router = require('express').Router();
const express = require('express');
const auth = require('../middleware/auth');
const postsCtrl = require('../controllers/posts');


try{
    router.get('/groupomania', auth, postsCtrl.getAllPosts);

} catch(err) {
    console.log("Erreur de route : Posts.");
}