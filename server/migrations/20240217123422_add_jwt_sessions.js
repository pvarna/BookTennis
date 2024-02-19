export async function up(knex) {
  await knex.schema.createTable('jwt_sessions', (table) => {
    table.increments('id').primary();
    table
      .integer('user_id')
      .notNullable()
      .references('id')
      .inTable('users')
      .onDelete('cascade');
    table.string('payload').notNullable().unique();

    table.index('id');
  });
}

export async function down(knex) {
  await knex.schema.dropTable('jwt_sessions');
}
