const jwt = require('jsonwebtoken')
const User = require('../models/User')

const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt

    // check jwt exists and is valid
    if (token) {
        jwt.verify(token, 'appAttendance Secrete', (error, decodedToken) => {
            if (error) {
                console.log(error.message)
                res.redirect('/signup')
            } else {
                console.log(decodedToken)
                next()
            }
        })
    } else {
        res.redirect('/signup')
    }
}

// check current user
const checkUser = (req, res, next) => {
    const token = req.cookies.jwt

    if (token) {
        jwt.verify(token, 'appAttendance Secrete', async (error, decodedToken) => {
            if (error) {
                console.log(error.message)
                res.locals.user = null
                next()
            } else {
                console.log(decodedToken)
                let user = await User.findById(decodedToken.id)
                res.locals.user = user
                next()
            }
        })
    } else {
        res.locals.user = null
        next()
    }
}

module.exports = { requireAuth, checkUser }