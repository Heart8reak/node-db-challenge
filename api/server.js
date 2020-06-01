const express = require('express')
const helmet = require('helmet')

const ProjectRouter = require('../routers/projects/projects.router')
const ResourceRouter = require('../routers/resources/resources-router')
const TasksRouter = require('../routers/tasks/tasks-router')

const server = express()

server.use(express.json())
server.use(helmet())
server.use('/api/projects', ProjectRouter)
server.use('/api/resources', ResourceRouter)
server.use('/api/tasks', TasksRouter)

module.exports = server