const jwt = require('jsonwebtoken');
const mysql = require('mysql');
const mysql_con = require('../mysql_con.js');

module.exports = (req, res, next) => {
  try {
    console.log("auth.js");
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;

    if (req.body.userId && req.body.userId !== userId) { throw "L'userId n'est pas reconnu."; } 
    else { console.log("Requête authentifiée."); next(); }
  } catch {
    res.status(401).json({
      error: new Error("Requête refusée !")
    });
  }
};