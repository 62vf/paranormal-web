const userModel = require('../models/user.model')
const jwt = require('jsonwebtoken')

const cookieOptions = {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
}

async function register(req, res) {
    try {
        const { username, email, password } = req.body
        const existingUser = await userModel.findOne({ email })
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' })
        }
        const newUser = await userModel.create({ username, email, password })
        // Generate JWT token
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET)
        // Set token in cookie
        res.cookie('token', token, cookieOptions)
        // Respond with user info and token
        res.status(201).json({ message: 'User registered successfully', user: {
            id: newUser._id,
            username: newUser.username,
            email: newUser.email
        }, token })
    } catch (error) {
        res.status(500).json({ message: 'Server error' })
    }
}

async function login(req, res) {
    const { email, password } = req.body
    const user = await userModel.findOne({ email })
    if (!user) {
        return res.status(404).json({ message: 'User not found' })
    }
    if (user.password !== password) {
        return res.status(401).json({ message: 'Invalid credentials' })
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
    res.cookie('token', token, cookieOptions)
    res.status(200).json({ message: 'Login successful', token })
}

async function logout(req, res) {
    res.clearCookie('token', cookieOptions)
    res.status(200).json({ message: 'Logout successful' })
}

module.exports = { register, login, logout }