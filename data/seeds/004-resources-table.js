
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('resources').del()
    .then(function () {
      // Inserts seed entries
      return knex('resources').insert([
        {
          resource_name: 'Javascript',
          resource_description: 'Master Developer'
        },
        {
          resource_name: 'Java Master',
          resource_description: 'Master Ninja'
        },
        {
          resource_name: 'Python/Django',
          resource_description: 'Master'
        },
        {
          resource_name: 'Full Stack Developer',
          resource_description: 'The Unicorn'
        },
      ]);
    });
};
