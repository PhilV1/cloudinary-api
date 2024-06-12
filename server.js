import express from 'express'
import cors from 'cors'
import connectDB from './database/connectDB.js'
import productRouter from './routes/productRoutes.js'
import 'dotenv/config'

const app = express()
const PORT = process.env.API_PORT || 5000
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('API is running...')
})

const startServer = async () => {
  try {
    await connectDB(process.env.MONGODB_URL)
    console.log('verbindung mit MONGODB hat geklaptt!')
    //
    app.listen(PORT, () => {
      console.log(`Port läuft auf Port: ${PORT}`)
    })
  } catch (error) {
    console.log(error)
  }
}

startServer()
