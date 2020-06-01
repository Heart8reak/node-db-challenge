const express = require('express')

const tasks = require('./tasks-model')

const router = express.Router()

router.get('/', (req, res) => {
    tasks.findTasks()
        .then((taskList) => {
            res.status(200).json(taskList)
            console.log(taskList)
        })
        .catch((err) => {
            res.status(500).json({ message: 'Failed to get list of tasks', error: err })
        })
})

router.get('/:id', (req, res) => {
    const { id } = req.params
    tasks.findTaskById(id)
        .then((tasks) => {
            res.status(200).json(tasks)
        })
        .catch((err) => {
            res.status(500).json({ message: 'Problem with the ID in the database', error: err })
        })
})


router.post('/', (req, res) => {
    const taskData = req.body

    tasks.addTasks(taskData)
        .then((task) => {
            res.status(201).json(task)
        })
        .catch((err) => {
            res.status(500).json({ message: "Failed to create new task", error: err })
        })
})

router.put('/:id', (req, res) => {
    const { id } = req.params
    const changes = req.body

    tasks.findTaskById(id)
        .then((task) => {
            if (task) {
                tasks.update(changes, id)
                    .then((updatedtask) => {
                        res.json(updatedtask)
                    })
            } else {
                res.status(404).json({ message: 'Could not find task with given id' })
            }
        })
        .catch(() => {
            res.status(500).json({ message: 'Failed to update task' })
        })
})

router.delete('/:id', (req, res) => {
    const { id } = req.params

    tasks.remove(id)
        .then((deleted) => {
            if (deleted) {
                res.json({ removed: deleted })
            } else {
                res.status(404).json({ message: 'Could not find task with given id' })
            }
        })
        .catch((err) => {
            res.status(500).json({ message: 'Failed to delete task', error: err })
        })
})

module.exports = router