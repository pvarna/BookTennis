export async function up(knex) {
  await knex.schema.createTable('users', (table) => {
    table.increments('id').primary();
    table.string('email').notNullable().unique();
    table.string('full_name').notNullable();
    table.string('phone').notNullable();
    table.string('password').notNullable();
    table.boolean('is_admin').notNullable().defaultTo(false);

    table.index('id');
  });

  await knex.schema.createTable('clubs', (table) => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.string('city').notNullable();
    table
      .integer('user_id')
      .notNullable()
      .references('id')
      .inTable('users')
      .onDelete('cascade');

    table.index('id');
  });

  await knex.schema.createTable('courts', (table) => {
    table.increments('id').primary();
    table.string('surface').notNullable();
    table.double('price').notNullable();
    table
      .integer('club_id')
      .notNullable()
      .references('id')
      .inTable('clubs')
      .onDelete('cascade');

    table.index('id');
  });

  await knex.schema.createTable('reservations', (table) => {
    table.increments('id').primary();
    table
      .integer('user_id')
      .notNullable()
      .references('id')
      .inTable('users')
      .onDelete('cascade');
    table
      .integer('court_id')
      .notNullable()
      .references('id')
      .inTable('courts')
      .onDelete('cascade');
    table.integer('duration').notNullable();
    table.datetime('start_time', { precision: 6 }).defaultTo(knex.fn.now(6))

    table.index('id');
  });

  await knex.schema.createTable('club_creation_requests', (table) => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.string('city').notNullable();
    table
      .integer('user_id')
      .notNullable()
      .references('id')
      .inTable('users')
      .onDelete('cascade');

    table.index('id');
  });

  await knex.schema.createTable('messages', (table) => {
    table.increments('id').primary();
    table
      .integer('user1_id')
      .notNullable()
      .references('id')
      .inTable('users')
      .onDelete('cascade');
    table
      .integer('user2_id')
      .notNullable()
      .references('id')
      .inTable('users')
      .onDelete('cascade');
    table.string('data').notNullable();
    table.timestamp('time').notNullable().defaultTo(knex.fn.now());

    table.index('id');
  });
}

export async function down(knex) {
  await knex.schema.dropTable('messages');
  await knex.schema.dropTable('clubCreationRequests');
  await knex.schema.dropTable('reservations');
  await knex.schema.dropTable('courts');
  await knex.schema.dropTable('clubs');
  await knex.schema.dropTable('users');
}
