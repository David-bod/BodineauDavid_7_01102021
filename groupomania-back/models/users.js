const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

const User = sequelize.define('User', {

    name: {
        type: DataTypes.STRING, allowNull: false },
    email: {
        type: DataTypes.STRING, allowNull: false },
    password: {
        type: DataTypes.STRING, allowNull: false },
    photoProfil: {
        type: DataTypes.STRING, allowNull: true }, // Vérifier le DataTypes pour la photo
    isAdmin: {
        type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false }

}, {});


console.log(User === sequelize.models.User); // true