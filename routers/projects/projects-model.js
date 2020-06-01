const db = require('../../data/db-config')

function find() {
    return db('projects')
}

function findById(id) {
    return db('projects').where({ id }).first()
}

function addProject(projectData) {
    return db('projects').insert(projectData)
}

function findProjectResources(id) {
    return db('project-resources as pr')
        .join('resources as r', 'r.id', 'pr.resources_id')
        .select('r.id', 'r.resource_name', 'r.resource_description')
        .where({ 'pr.project_id': id })
}

function findProjectTasks(id) {
    return db('tasks as t')
        .join('projects as p', 'p.id', 't.project_id')
        .select('t.id', 't.task_name', 't.completed')
        .where({ 'p.id': id })
}

function addTasks(task, id) {
    return db('tasks as t')
        .join('projects as p', 'p.id', 't.project_id')
        .select('t.id', 't.project_id', 't.task_name')
        .where({ project_id: id })
        .inset(task)
}

function update(change, id) {
    return db('projects')
        .where({ id })
        .update(change)
}

function remove(id) {
    return db('projects')
        .where({ id }).del()
}

module.exports = {
    find,
    findById,
    addProject,
    findProjectResources,
    addTasks,
    findProjectTasks,
    update,
    remove
}