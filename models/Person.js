const mongoose = require('mongoose')

const Person = mongoose.model('Person', { //Person é o model, a classe
  name: String,
  salary: Number,
  approved: Boolean,
})

module.exports = Person