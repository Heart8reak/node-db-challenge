const express = require('express')

const resources = require('./resources-model')

const router = express.Router()

router.get('/', (req, res) => {
    resources.findResources()
        .then((resourcesList) => {
            res.status(200).json(resourcesList)
        })
        .catch(() => {
            res.status(500).json({ message: 'Failed to get list of Resources' })
        })
})

router.get('/:id', (req, res) => {
    const { id } = req.params
    resources.findResourceById(id)
        .then((resource) => {
            res.status(200).json(resource)
        })
        .catch((err) => {
            res.status(500).json({ message: 'Can not get the ID from the database' })
        })
})

router.post('/', (req, res) => {
    const resourceData = req.body

    resources.addResources(resourceData)
        .then((resource) => {
            res.status(201).json(resource)
        })
        .catch(() => { res.status(500).json({ message: 'Failed to create bew resource' }) })
})

router.put('/:id', (req, res) => {
    const { id } = req.params
    const changes = req.body

    resources.findResourceById(id)
        .then((resource) => {
            if (resource) {
                resources.update(changes, id)
                    .then((updateresource) => {
                        res.json(updateresource)
                    })
            } else {
                res.status(404).json({ message: 'Could not find resource with given id' })
            }
        })
        .catch(() => {
            res.status(500).json({ message: 'Failed tp update resource' })
        })
})

router.delete('/:id', (req, res) => {
    const { id } = req.params

    resources.remove(id)
        .then((deleted) => {
            if (deleted) {
                res.json({ removed: deleted })
            } else {
                res.status(404).json({ message: 'Could retreive the resource with the given id' })
            }
        })
        .catch(() => {
            res.status(500).json({ message: 'Failed to delete resource' })
        })
})

module.exports = router