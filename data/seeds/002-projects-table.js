
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('projects').del()
    .then(function () {
      // Inserts seed entries
      return knex('projects').insert([
        {
          project_name: 'US Marine Corp',
          project_description: "As a Marine I will survive!",
          completed: false
        },
        {
          project_name: 'Blackwater Agent',
          project_description: "Bullet Sponge",
          completed: false
        },
        {
          project_name: 'Graphic Designer',
          project_description: "I love art",
          completed: false
        },

      ]);
    });
};
