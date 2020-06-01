
exports.up = function (knex) {
    return knex.schema
        .createTable("projects", tbl => {
            tbl.increments()
            tbl.string("name").notNullable()
            tbl.string("description")
            tbl.boolean("completed").notNullable().defaultTo(false)
        })
        .createTable("resources", tbl => {
            tbl.increments()
            tbl.string("name").notNullable().unique()
            tbl.string("description")
        })
        .createTable("tasks", tbl => {
            tbl.increments()
            tbl.string("description").notNullable()
            tbl.string("notes")
            tbl.boolean("completed").notNullable().defaultTo(false)
            tbl.integer("project_id").unsigned().notNullable().references("id").inTable("projects").onDelete("RESTRICT").onUpdate("CASCADE")
        })
        .createTable("resourceList", tbl => {
            tbl.integer("project_id").unsigned().notNullable().references("id").inTable("projects").onUpdate("CASCADE").onDelete("CASCADE")
            tbl.integer("resource_id").unsigned().notNullable().references("id").inTable("resources").onUpdate("CASCADE").onDelete("CASCADE")
            tbl.primary("project_id", "resource_id")
        })
};

exports.down = function (knex) {
    return knex.schema
        .dropTableIfExists("resourceList")
        .dropTableIfExists("tasks")
        .dropTableIfExists("resources")
        .dropTableIfExists("projects")
};
