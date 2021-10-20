const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const mysql_con = require('../mysql_con.js');

/*
name: { type: DataTypes.STRING, allowNull: false, required: true },
email: { type: DataTypes.STRING, allowNull: false, required : true, unique: true },
password: { type: DataTypes.STRING, allowNull: false, required: true },
photoProfil: { type: DataTypes.STRING, allowNull: true }, // Vérifier le DataTypes pour la photo
isAdmin: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false }
*/

class User {
    constructor() {}  
    signup(userSql) {
        console.log("userSql (models/users.js)");
        let insertion = "INSERT INTO users VALUES( null, ?, ?, ?, null, 0)";
        insertion = mysql.format(insertion, userSql);
        return new Promise((res, err) => {
            mysql_con.query(insertion, function(err, result) {
                if (err){ console.log(err); }
                else { console.log("Utilisateur inscrit !"); }
            })
        })
    }
}


module.exports = User;