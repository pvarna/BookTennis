export async function up(knex) {
  await knex.schema.alterTable('club_creation_requests', (table) => {
    table.enu('status', ['Accepted', 'Cancelled', 'Pending']).notNullable();
  });
}

export async function down(knex) {
  await knex.schema.alterTable('club_creation_requests', (table) => {
    table.dropColumn('status');
  });
}
