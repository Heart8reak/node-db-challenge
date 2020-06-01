
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('tasks').del()
    .then(function () {
      // Inserts seed entries
      return knex('tasks').insert([
        {
          task_name: 'Xbox Skills',
          project_id: 1,
          completed: false
        },
        {
          task_name: 'PS5 Skills',
          project_id: 2,
          completed: false
        },
        {
          task_name: 'Python Master',
          project_id: 3,
          completed: false
        },
      ]);
    });
};
