const Router = require('express')
const { User } = require('../models')
const router = new Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const generateJwt = (id, username) => {
    return jwt.sign(
        {id, username},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}

router.post('/register', async (req, res) => {
    const {username, password} = req.body

    const candidate = await User.findOne({where: {username}})
    if (candidate) {
        res.json({message: "Пользователь уже существует"}).status(400)
    }

    const hashedPassword = await bcrypt.hash(password, 5)
    const newUser = await User.create({username, password: hashedPassword})
    const token = generateJwt(newUser.id, newUser.username)
    res.json({token})
})

router.post('/login', async (req, res) => {
    const {username, password} = req.body

    const candidate = await User.findOne({where: {username}})
    if (!candidate) {
        res.json({message: "Пользователя не существует"}).status(400)
    }

    let comparePassword = bcrypt.compareSync(password, candidate.password)
    
    if (!comparePassword) {
        res.json({message: "Некоректный пароль"}).status(400)
    }

    const token = generateJwt(candidate.id, candidate.username)
    res.json({token})
})

router.post('/check', async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        if (!token) {
            return res.status(401).json({message: "Не авторизован"})
        }
        const decoded = jwt.verify(token, process.env.SECRET_KEY)

        res.json({message: "Token is valid"}).status(200)
    } catch (e) {
        res.status(401).json({message: "Не авторизован"})
    }
})

module.exports = router
