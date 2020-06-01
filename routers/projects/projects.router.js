const express = require('express')

const projects = require('./projects-model')

const router = express.Router()

router.get('/', (req, res) => {
    projects.find()
        .then((projectList) => {
            res.json(projectList)
        })
        .catch((err) => {
            res.status(500).json({ message: 'Failed to get projectList', error: err })
        })
})

router.get('/:id', (req, res) => {
    const { id } = req.params
    projects.findById(id)
        .then((project) => {
            if (!project === []) {
                res.status(404).json({ message: 'Could not find project with given ID' })
            } else {
                res.status(200).json(project)
            }
        })
        .catch((err) => {
            res.status(500).json({ message: 'Failed to retreive ID from database' })
        })
})

router.post('/', (req, res) => {
    const projectData = req.body

    projects.addProject(projectData)
        .then((project) => {
            res.status(201).json(({ message: 'Created new project!' }), project)
        })
        .catch((err) => {
            res.status(500).json({ message: 'Failed to create new project', error: err })
        })
})

router.get('/:id/resources', (req, res) => {
    const { id } = req.params
    projects.findProjectResources(id)
        .then((resource) => {
            if (!resource === []) {
                res.status(404).json({ message: 'Could not retreive resource with give ID' })
            } else {
                res.status(200).json(resource)
            }
        })
        .catch((err) => {
            res.status(500).json({ message: 'Problem with the ID in the database', error: err })
        })
})

router.get('/:id/tasks', (req, res) => {
    const { id } = req.params
    projects.findProjectTasks(id)
        .then((tasks) => {
            if (!tasks === []) {
                res.status(404).json({ message: 'Could not find task with given ID' })
            } else {
                res.status(200).json(tasks)
            }
        })
        .catch((err) => {
            res.status(500).sjon({ message: 'Problem with the ID in the database' })
        })
})

router.put('/:id', (req, res) => {
    const { id } = req.params
    const changes = req.body

    projects.findById(id)
        .then((project) => {
            if (project) {
                projects.update(changes, id)
                    .then((updatedproject) => {
                        res.json(updatedproject)
                    })
            } else {
                res.status(404).json({ message: 'Could not find project with given ID' })
            }
        })
        .catch(() => {
            res.status(500).json({ message: 'Failed to update project' })
        })
})

router.delete('/:id', (req, res) => {
    const { id } = req.params

    projects.remove(id)
        .then((deleted) => {
            if (deleted) {
                res.json({ remove: deleted })
            } else {
                res.status(404).json({ message: 'Could not find project with given ID' })
            }
        })
        .catch(() => {
            res.status(500).json({ message: 'Failed to deleted project' })
        })
})

router.post('/:id/tasks', (req, res) => {
    const taskData = req.body
    const { id } = req.params

    projects.findById(id)
        .then((project) => {
            if (project) {
                projects.addTasks(taskData, id)
                    .then((step) => {
                        res.status(201).json(step)
                    })
            } else {
                res.status(404).json({ message: 'Could not find project with given ID' })
            }
        })
        .catch(() => {
            res.status(500).json({ message: 'Failed to create new step' })
        })
})

module.exports = router