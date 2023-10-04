const Router = require('express') 
const router = new Router()
const questionRouter = require('./questionRouter')
const postRouter = require('./postRouter')
const authRouter = require('./authRoute')

router.use('/post', postRouter)
router.use('/question', questionRouter)
router.use('/auth', authRouter)

module.exports = router