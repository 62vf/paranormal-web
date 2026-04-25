const express = require('express')
const authRoute = require('./routes/auth.route')
const casesRoute = require('./routes/cases.route')
const cookieParser = require('cookie-parser')
const cors = require('cors')

const app = express()

const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173'
const defaultOrigins = [
  frontendUrl,
  'https://paranormal-web.vercel.app',
]
const allowedOrigins = new Set([
  ...defaultOrigins,
  ...(process.env.ALLOWED_ORIGINS
    ? process.env.ALLOWED_ORIGINS.split(',').map((origin) => origin.trim())
    : []),
])

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.has(origin)) {
      callback(null, true)
    } else {
      callback(new Error(`CORS policy: origin ${origin} not allowed`))
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
}

app.use(cors(corsOptions))
app.use(express.json())
app.use(cookieParser())

app.get('/api/health', (req, res) => {
	res.status(200).json({ status: 'ok', message: 'Backend connected' })
})

app.use('/api/auth', authRoute)
app.use('/api/cases', casesRoute)


module.exports = app