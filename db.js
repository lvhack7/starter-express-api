const {Sequelize} = require('sequelize')

const db = new Sequelize('postgresql://postgres:iy9MWBWASLd!_QW@db.hngynzgvpcjbhhkvjkso.supabase.co:5432/postgres')

module.exports = db