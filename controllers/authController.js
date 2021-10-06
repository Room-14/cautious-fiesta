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
        res.status(201).json(user)
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