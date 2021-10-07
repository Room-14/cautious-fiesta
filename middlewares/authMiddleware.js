const jwt = require('jsonwebtoken')

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

module.exports = { requireAuth }