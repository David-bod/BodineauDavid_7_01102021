const mysql_con = require('../mysql_con'); // identifiants conexion mysql
const mysql = require('mysql');

class postsR {
    constructor() {
        
    }
 
    createPost(dataCreatePost) {
        let sqlData = "INSERT INTO `posts` (`userid`, `text`, `createdate`) VALUES(?, ?, NOW())";
        sqlData = mysql.format(sqlData, dataCreatePost);
        return new Promise((resolve) => {
            mysql_con.query(sqlData, function (err, res) {
                if (err) throw err;
                resolve({ message : "Post créé" });
            })
        })
    }
    getAllPosts() {
        let getDataPosts = "SELECT posts.id, posts.userId, posts.text, DATE_FORMAT(DATE(posts.createdate), '%d/%m/%Y') AS date, TIME(posts.createdate) AS time, users.name FROM posts JOIN users ON posts.userid = users.id ORDER BY posts.createdate DESC";
        return new Promise((resolve) => {
            mysql_con.query(getDataPosts, function(err, result) {
                if (err) { console.log(err); }
                resolve(result)
            })
        })
    }
    deletePost(reqPostId, reqPostIdUserId) {
        let sqlDelete = "SELECT * FROM posts where id = ?";
        sqlDelete = mysql.format(sqlDelete, reqPostId);
        console.log(sqlDelete);
        return new Promise((resolve, reject) => {
            mysql_con.query(sqlDelete, function (err, result) {
                if (err) { console.log(err); }
                if(reqPostIdUserId[0] != null) {
                    let sqlDeletePost = "DELETE FROM posts WHERE id = ?";
                    sqlDeletePost = mysql.format(sqlDeletePost, reqPostIdUserId);
                    console.log(sqlDeletePost);
                    mysql_con.query(sqlDeletePost, function (err, result){
                        if (err) { console.log(err); }
                        resolve({ message : "Le post a été supprimé." });
                    })
                }else{
                    reject({ error: "Le post n'a pas pu être supprimé." });
                }
            });
        })
    }
    createCom(reqPostComment) {
        let sqlCreateCom = "INSERT INTO `comments` (`userid`, `postid`, `text`, `createdate`, `name`) VALUES(?, ?, ?, NOW(), ?)";
        sqlCreateCom = mysql.format(sqlCreateCom, reqPostComment);
        return new Promise((resolve) => {
            mysql_con.query(sqlCreateCom, function (err, result) {
                if (err) { console.log(err); }
                resolve({ message : "Commentaire ajouté." })
            })
        })
    }
    getComments(reqGetCom) {
        let sqlGetCom = "SELECT comments.text, DATE_FORMAT(comments.createdate, '%d/%m/%Y à %H:%i:%s') AS date, comments.id, comments.postid, comments.userId, comments.name, users.name FROM comments JOIN users on comments.userId = users.id WHERE postId = ? ORDER BY date";
        sqlGetCom = mysql.format(sqlGetCom, reqGetCom);
        return new Promise((resolve) => {
            mysql_con.query(sqlGetCom, function (err, result) {
                if (err) { console.log(err); }
                resolve(result);
            })
        })
    }
    deleteComment(reqDeleteCom) {
        let sqlDeleteCom = "DELETE FROM comments WHERE id = ?";
        sqlDeleteCom = mysql.format(sqlDeleteCom, reqDeleteCom);
        return new Promise((resolve) => {
            console.log("Commentaire supprimé.");
            mysql_con.query(sqlDeleteCom, function (err, result, fields){
                if (err) { console.log(err); }
                resolve({ message : "Commentaire supprimé." });
            })
        })
    }
}

module.exports = postsR;