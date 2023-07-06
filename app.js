const express = require('express')
const app = express()
const port = 80

app.get('/create', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})