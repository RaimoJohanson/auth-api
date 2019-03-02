exports.up = async (knex) => {
  await knex.schema.createTable('accounts', (table) => {
    table.increments('id').primary().unique();
    table.string('first_name');
    table.string('last_name');
    table.string('email').unique().notNullable();
    table.string('password').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at');
  });
  const initialUsers = [
    {
      first_name: 'Raimo',
      last_name: 'Johanson',
      email: 'raimo',
      password: '$2b$10$xP6I3onbOgY9i7oinzNF/ua9A7tsmF87NpvB6YezND3jszJckGqu.',
    },
    {
      first_name: 'Liis',
      last_name: 'Lõune',
      email: 'liis',
      password: '$2b$10$ObCLsH4QSkauu92DEIlebOd.DTEytXFMaht8Cxg1HcO7fonFXcn3O',
    },
  ];

  return knex('accounts').insert(initialUsers);
};

exports.down = knex => knex.schema.dropTable('accounts');
