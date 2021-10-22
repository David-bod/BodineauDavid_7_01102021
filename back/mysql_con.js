const mysql = require('mysql');

let con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'X2h=t57r',
    database: 'groupomania'
});

con.connect(function(err) { 
    if (err) { console.log("Connexion à la BDD impossible. " + err); }
    console.log("Connexion BDD : OK.");
});

module.exports = con;