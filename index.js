// config inicial
require('dotenv').config()
const express = require('express')
const app = express()

// depois do db
const mongoose = require('mongoose')

const Person = require('../models/Person')

app.use(  //criando um middleware para ler JSON
  express.urlencoded({
    extended: true,
  }),
)

app.use(express.json())


// rotas da API
const personRoutes = require('./routes/personRoutes')

app.use('/person', personRoutes) //direciona para o arquivo personRoutes.js


app.get('/', (req, res) => {
    res.json({ message: 'Oi Express!' }) //resposta em JSON
})

const DB_USER = process.env.DB_USER
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD)

mongoose
  .connect(
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@restfulapibanco.lq7ds.mongodb.net/bancodaloja7?retryWrites=true&w=majority',`
  )
  .then(() => {
    console.log('Conectou ao banco!')
    app.listen(3000)
  })
  .catch((err) => console.log(err))