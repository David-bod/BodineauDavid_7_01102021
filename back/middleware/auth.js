const jwt = require('jsonwebtoken');
const mysql = require('mysql');
const mysql_con = require('../mysql_con.js');

module.exports = (req, res, next) => {
  try {
    console.log("Vérification de la requête...");
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;
    let elem = [userId];
    let reqSql = "SELECT COUNT(id) FROM users WHERE id=?";
    reqSql = mysql.format(reqSql, elem);
    mysql_con.query(reqSql, function(err, result) {
      if (err) reject({ message : "Requête rejetée !" });
      if (result[0]['COUNT(id)'] !== 1) {
          throw 'Token invalide';
      } else {
          next();
      }
    })
  } catch {
    res.status(401).json({ message : "Erreur dans l'auth !" });
  }
};