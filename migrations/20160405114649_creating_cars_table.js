
exports.up = function(knex, Promise) {
  return knex.schema.createTable('makes', function(table) {
    table.increments();
    table.string('make_name');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('makes');
};
