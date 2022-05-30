const router = require('express').Router()
const { deleteOne } = require('../models/Person')
const Person = require('../models/Person')

// buscando todas as pessoas
router.get('/', async (req, res) => {
    try {
       const people = await Person.find()

       res.status(200).json(people)

    } catch (error) {
        res.status(500).json({error: error})
    }
})

// buscando uma pessoa
router.get('/:id', async (req, res) => {
    const id = req.params.id

    try {
        const person = await Person.findOne({_id:id})
        if(!person) {
            res.status(422).json({error: "Usuário não encontrado!"}) 
            return
        }
        res.status(200).json(person)

    } catch (error) {
        res.status(500).json({error: error})
    }
})

// criando pessoa
router.post('/', async (req,res) => {

    const {name,height} = req.body

    if(!name || !height) {
        res.status(422).json({error: "Os campos nome e altura são obrigatórios!"}) 
        return
    }
    if(height > 165) {approved = true} else approved = false

    const newPerson = {
        name,
        height,
        approved
    }
    
    try {
        // criando dados
        await Person.create(newPerson)
        res.status(201).json({message: "Pessoa inserida com sucesso ao banco de dados!"})
    } catch (error) {
        res.status(500).json({error: error})
    }

})

// alterando dados de uma pessoa
router.patch('/:id', async (req, res) => {
    const id = req.params.id
    const {name,height} = req.body

    if(!name || !height) {
        res.status(422).json({error: "Os campos nome e altura são obrigatórios!"}) 
        return
    }
    if(height > 165) {approved = true} else approved = false

    const newPerson = {
        name,
        height,
        approved
    }

    try {
        const updatedUser = await Person.updateOne({_id:id}, newPerson)
        if(updatedUser.matchedCount === 0) {
            res.status(422).json({error: "Usuário não encontrado!"}) 
            return
        }

        res.status(200).json(newPerson)

    } catch (error) {
        res.status(500).json({error: error})
    }
})

// deletando uma pessoa
router.delete('/:id', async (req, res) => {
    const id = req.params.id

    try {
        const person = await Person.findOne({_id:id})
        if(!person) {
            res.status(422).json({error: "Usuário não encontrado!"}) 
            return
        }

        await Person.deleteOne({_id:id})

        res.status(200).json({message: "Usuário removido com sucesso!"})

    } catch (error) {
        res.status(500).json({error: error})
    }
})



module.exports = router