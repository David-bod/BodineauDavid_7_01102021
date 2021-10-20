const mysql = require('mysql');

let con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'X2h=t57r',
    database: 'groupomania'
});

con.connect(function(err) { 
    if (err) throw err;
    console.log("Connecté à la base de données.")
});

module.exports = con;