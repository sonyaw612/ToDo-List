const express = require('express')
const router = express.Router()
const Sequelize = require('sequelize')
const Op = Sequelize.Op
const { tasks } = require('../models/tasks')

// get all values in TASKS table
router.get('/', (req, res) =>{

    console.log('Request received')
    tasks.findAll({})
    .then((data) => {
        console.log(data.length)
        res.status(200).json(data)
    })
    .catch(err => {
        res.status(404).json({
            message: "No tasks available"
        })
    })
})

// creates a new entry in the TASKS table ; should not use 'create' but rather use '/'
router.post('/', (req, res) => {

    console.log('Request to make task: ' + req.body.task)
    tasks.create({
        task: req.body.task,
        completed: false
    }) 
    .then((data) => {
        res.status(201).send("Entry creation success")})
    .catch(err => {res.status(404).send( err.message )})
})

// delete the task with the specified task id ; standard: '/:id'
router.delete('/:id', (req, res) => {
    tasks.destroy({ where: { id: req.params.id }})
    .then(() => {
        res.status(200).send("Deletion completed")
    })
    .catch(err => {res.status(404).send( err.message )})
})

// edit the task with the specified id
router.put('/:id', (req, res) => {
    console.log('Request received for edit task: ' + req.body.task)
    tasks.update({
        task: req.body.task,
        completed: req.body.completed
    },{
        where: { id: req.params.id 
    }})
    .then((data) => {
        console.log(data)

        res.status(200).send("Update successful")
    })
    .catch(err => { res.status(404).send(err.message)})
})

// put, delete, patch uses '/:id'
// if an entry is expected to be in the db its '/:id'

module.exports = router;