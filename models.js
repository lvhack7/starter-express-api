const {Sequelize, DataTypes} = require('sequelize')
const db = require('./db')

const Posts = db.define('Post', {
    id: {type: DataTypes.INTEGER, unique: true, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.TEXT, allowNull: false, unique: true},
    subtitle: {type: DataTypes.TEXT, allowNull: true},
    summary: {type: DataTypes.TEXT, allowNull: true},
    tag: {type: DataTypes.STRING, allowNull: false},
    content: {type: DataTypes.JSON, allowNull: false},
    author: {type: DataTypes.STRING, allowNull: true},
    link: {type: DataTypes.STRING},
    publishedDate: {type: DataTypes.STRING, allowNull: false}
})

const Questions = db.define('Question', {
    id: {type: DataTypes.INTEGER, unique: true, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, allowNull: false},
    question: {type: DataTypes.TEXT, allowNull: false}
})

const User = db.define('User', {
    id: {type: DataTypes.INTEGER, unique: true, primaryKey: true, autoIncrement: true},
    username: {type: DataTypes.STRING, allowNull: false},
    password: {type: DataTypes.TEXT, allowNull: false}
})

module.exports = {Posts, Questions, User}