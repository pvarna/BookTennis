export async function up(knex) {
  await knex.schema.alterTable('clubs', (table) => {
    table.unique('name');
  });
}

export async function down(knex) {
  await knex.schema.alterTable('clubs', (table) => {
    table.dropUnique('name');
  });
}
