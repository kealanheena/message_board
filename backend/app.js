import express from 'express'

const app = express()
const PORT = 3000

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(routes)

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
})

module.exports = app;
