const mongoose = require('mongoose')
const { isEmail, isStrongPassword } = require('validator')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'username field should not be empty']
    },
    email: {
        type: String,
        required: [true, 'email field should not be empty'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Please enter a valid email']
    },
    password: {
        type: String,
        required: [true, 'password field should not be empty'],
        minlength: [8, 'Minimum password length is 8 characters'],
        validate: [isStrongPassword, 'Password should contain at-least 1 uppercase, 1 lowercase, 1 symbol and 1 number']
    },
})

userSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password, salt)
    next()
})

// static method to login user
userSchema.statics.login = async function (email, password) {
    const user = await this.findOne({ email });
    if (user) {
        const auth = await bcrypt.compare(password, user.password)
        if (auth) {
            return user
        }
        throw Error('Incorrect password')
    }
    throw Error('Incorrect email')
}

const User = mongoose.model('user', userSchema)

module.exports = User