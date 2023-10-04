const Router = require('express')
const router = new Router()
const {Posts} = require('../models')
const authMiddleware = require('../authMiddleware')
const sequelize = require('sequelize')

router.post('/', authMiddleware, async (req, res) => {
    const postInfo = req.body

    const newPost = await Posts.create(postInfo)

    res.json(newPost).status(200)
})

router.get('/all', async (req, res) => {
    
    const posts = await Posts.findAll({
        attributes: ['id', 'title', 'author', 'publishedDate', 'summary', 'tag']
    })

    res.json(posts).status(200)
})

router.get('/search', async (req, res) => {
    const {keyword} = req.query

    const posts = await Posts.findAll({
        where: {
          title: {
            [sequelize.Op.iLike]: `%${keyword}%`,
          },
        },
    });
    
    res.json(posts).status(200)
})

router.get('/', async (req, res) => {
    const {title} = req.query

    const post = await Posts.findOne({where: {title}})

    res.json(post).status(200)
})

module.exports = router