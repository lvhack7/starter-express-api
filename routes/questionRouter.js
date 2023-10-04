const Router = require('express')
const router = new Router()
const {Questions} = require('../models')
const authMiddleware = require('../authMiddleware')

router.post('/', async (req, res) => {
    const {email, question} = req.body

    const newQuestion = await Questions.create({email, question})

    res.json(newQuestion)
})

router.get('/all', authMiddleware, async (req, res) => {
    const questions = await Questions.findAll()

    res.json(questions)
})

router.delete('/answer', authMiddleware, async (req, res) => {
    const {id} = req.query
    await Questions.destroy({
        where: {
            id
        }
    })
    res.json({message: "Question was answered"})
})

module.exports = router