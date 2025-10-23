import express from "express";

const app = express();
const port = process.env.PORT || 1337

app.listen(port, () => {
  console.log(`server started on port ${port}`)
})