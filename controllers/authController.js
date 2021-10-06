const User = require('../models/User')
const jwt = require('jsonwebtoken')

// error handler
const errorHandler = (error) => {
    let errors = { username: '', email: '', password: '' }

    // duplicate errors
    if (error.code === 11000) {
        errors.email = 'email already exists'
        return errors
    }

    // validation errors
    if (error.message.includes('user validation failed')) {
        Object.values(error.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message
        })
    }

    return errors;
}

const maxAge = 3 * 24 * 60 * 60 // 3 days in miliseconds
const createToken = (id) => {
    return jwt.sign({ id }, 'appAttendance Secrete', {
        expiresIn: maxAge
    })
}



module.exports.signup_get = (req, res) => {
    res.render('signup')
}

module.exports.login_get = (req, res) => {
    res.render('signup')
}

module.exports.signup_post = async (req, res) => {
    const { username, email, password } = req.body

    try {
        const user = await User.create({ username, email, password })
        const token = createToken(user._id)
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 })
        res.status(201).json({ user: user._id })
    }
    catch (error) {
        const errors = errorHandler(error)
        res.status(400).json({ errors })
    }
}

module.exports.login_post = async (req, res) => {
    res.send('new login')
    console.log(req.body)
}