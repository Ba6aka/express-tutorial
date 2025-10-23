import express from "express";

const app = express();
const port = process.env.PORT || 1337

const users = [
  { 'id': 1, 'name': 'Ba6aka' },
  { 'id': 2, 'name': 'Marina' }
]

app.listen(port, () => {
  console.log(`server started on port ${port}`)
})

app.get('/api/users', (request, response) => {
  response.status(201).send(users)
})

app.get('/api/users/:id', (request, response) => {
  const parsedId = +request.params.id

  if (isNaN(parsedId)) return response.status(400).send('id is not a number')

  response.send(users.find((user) => user.id == parsedId) || "ivalid user id")
})