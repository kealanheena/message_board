import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

const app = express()
const PORT = 3000

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(bodyParser.json());
app.use(cors());

app.use(require("./lib/routes.js"))

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
})

export default app;
