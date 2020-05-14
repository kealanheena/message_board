import express from 'express'
const app = express()
import MessageApp from './lib/model'

const PORT = 3000

let messageApp = new MessageApp("/\///json/\//testMessages.json")

app.get('/', async (req, res) => {
  let result = messageApp.getAll()
  console.log(result)
  res.json(result)
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
  }
)

export default app
