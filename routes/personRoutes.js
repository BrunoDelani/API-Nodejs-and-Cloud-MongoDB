const router = require('express').Router()
const Person = require('../models/Person')

// search all person
router.get('/', async (req, res) => {
    try {
       const people = await Person.find()

       res.status(200).json(people)

    } catch (error) {
        res.status(500).json({error: error})
    }
})

// search one person
router.get('/:id', async (req, res) => {
    const id = req.params.id

    try {
        const person = await Person.findOne({_id:id})
        if(!person) {
            res.status(422).json({error: "User not found!"}) 
            return
        }
        res.status(200).json(person)

    } catch (error) {
        res.status(500).json({error: error})
    }
})

// create person
router.post('/', async (req,res) => {

    const {name,height} = req.body

    if(!name || !height) {
        res.status(422).json({error: "Name and height field are required!"}) 
        return
    }
    if(height > 165) {approved = true} else approved = false

    const newPerson = {
        name,
        height,
        approved
    }
    
    try {
        // create data
        await Person.create(newPerson)
        res.status(201).json({message: "Person entered in the system!"})
    } catch (error) {
        res.status(500).json({error: error})
    }

})

// change person data
router.patch('/:id', async (req, res) => {
    const id = req.params.id
    const {name,height} = req.body

    if(!name || !height) {
        res.status(422).json({error: "Name and height field are required!"}) 
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
            res.status(422).json({error: "User not found!"}) 
            return
        }

        res.status(200).json(newPerson)

    } catch (error) {
        res.status(500).json({error: error})
    }
})

// delete person
router.delete('/:id', async (req, res) => {
    const id = req.params.id

    try {
        const person = await Person.findOne({_id:id})
        if(!person) {
            res.status(422).json({error: "User not found!"}) 
            return
        }

        await Person.deleteOne({_id:id})

        res.status(200).json({message: "User successfully removed!"})

    } catch (error) {
        res.status(500).json({error: error})
    }
})



module.exports = router