const router = require('express').Router()

router.post('/person', async (req, res) => {
    const { name, salary, approved } = req.body //cria esses elementos no body
  
    const person = {
      name,
      salary,
      approved,
    }
  
    try {
      await Person.create(person)
  
      res.status(201).json({ message: 'Pessoa inserida no sistema com sucesso!' })
    } catch (error) {
      res.status(500).json({ erro: error })
    }
})
  
router.get('/person', async (req, res) => {
    try {
      const people = await Person.find() //espera que todos os dados venham para depois trazer eles para a resposta
  
      res.status(200).json(people) //está tudo certo, envia people como json
    } catch (error) {
      res.status(500).json({ erro: error })
    }
})
  
router.get('/person/:id', async (req, res) => {
    const id = req.params.id
  
    try {
      const person = await Person.findOne({ _id: id })
  
      if (!person) {
        res.status(422).json({ message: 'Usuário não encontrado!' })
        return  //Garante q não será executado outra linha
      }
  
      res.status(200).json(person)
    } catch (error) {
      res.status(500).json({ erro: error })
    }
})
  
router.patch('/person/:id', async (req, res) => { //1-atualiza o dado, 2-salva ele em uma variável, 3-retorna os dados atualizados
    const id = req.params.id
  
    const { name, salary, approved } = req.body
  
    const person = {
      name,
      salary,
      approved,
    }
  
    try {
      const updatedPerson = await Person.updateOne({ _id: id }, person) //({usuário que será atualizado}, atualização)
  
      if (updatedPerson.matchedCount === 0) {
        res.status(422).json({ message: 'Usuário não encontrado!' })
        return
      }
  
      res.status(200).json(person)
    } catch (error) {
      res.status(500).json({ erro: error })
    }
})
  
router.delete('/person/:id', async (req, res) => {
    const id = req.params.id
  
    const person = await Person.findOne({ _id: id })
  
    if (!person) {
      res.status(422).json({ message: 'Usuário não encontrado!' })
      return
    }
  
    try {
      await Person.deleteOne({ _id: id })
  
      res.status(200).json({ message: 'Usuário removido com sucesso!' })
    } catch (error) {
      res.status(500).json({ erro: error })
    }
})
  


module.exports = router