import express, { response } from "express";

const app = express();

app.use(express.json())

const port = process.env.PORT || 1338

const users = [
  { 'id': 1, 'name': 'Ba6aka' },
  { 'id': 2, 'name': 'Marina' }
]

app.listen(port, () => {
  console.log(`server started on port ${port}`)
})

app.get('/api/user', (request, response) => {
  const { filter, value } = request.query

  if (!filter && !value) return response.send({})
  if (filter && value) return response.send(users.find((user) => user[filter].includes(value)))

})

app.get('/api/users', (request, response) => {

  response.status(201).send(users)
})

app.get('/api/users/:id', (request, response) => {
  const parsedId = +request.params.id

  if (isNaN(parsedId)) return response.status(400).send('id is not a number')

  response.send(users.find((user) => user.id == parsedId) || "ivalid user id")
})

app.post('/api/users', handlePostNewUser)

app.put('/api/users/:id', handlePutUser)

function handlePutUser(request, response) {
  const body = request.body
  const id = parseInt(request.params.id)
  const index = users.findIndex((user) => user.id === id)

  if (index === -1) return response.sendStatus(404)
  users[index] = { id: index + 1, ...body }
  response.sendStatus(200)
}

function handlePostNewUser(request, response) {
  const id = users.length + 1
  const newUser = { id, ...request.body }

  users.push(newUser)

  response.sendStatus(200)
}