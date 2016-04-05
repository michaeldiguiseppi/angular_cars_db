
exports.up = function(knex, Promise) {
  return knex.schema.createTable('models', function(table) {
    table.increments();
    table.integer('make_id');
    table.foreign('make_id').references('id').inTable('makes');
    table.string('model_name');
    table.string('year_range');
    table.string('class_name');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('models');
};
