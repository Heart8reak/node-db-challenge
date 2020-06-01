const db = require('../../data/db-config')

function findTasks() {
    return db('tasks as t')
        .join('projects as', 't.project_id', 'p.id')
        .select('t.*', 'p.project_namwe', 'p.project_description')
}

function findTaskById(id) {
    return db('tasks').where({ id })
}

function addTasks(resourceData) {
    return db('tasks').insert(resourceData)
}

function update(change, id) {
    return db('tasks').where({ id }).update(change)
}

function remove(id) {
    return db('tasks').where("id").del()
}

module.exports = {
    findTasks,
    findTaskById,
    addTasks,
    update,
    remove
}