import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import mongoose from 'mongoose'
import config from './config/config';

mongoose.connect(config.db, { useNewUrlParser: true, useFindAndModify: false })

const db = mongoose.connection

db.once('open', _ => {
 console.log('Database connected:', config.db)
})

db.on('error', err => {
 console.error('connection error:', err)
})

const app = express()
const PORT = config.port

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(bodyParser.json());
app.use(cors());

app.use(require("./lib/routes.js"))

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
})

export default app;
