/* eslint func-names:0 */
exports.up = function(knex) {
  return knex.schema
    .createTable("users", function(table) {
      table
        .uuid("id")
        .unique()
        .primary()
        .notNullable();
      table
        .string("email")
        .unique()
        .notNullable();
      table
        .string("username")
        .unique()
        .notNullable();
      table
        .string("role")
        .notNullable()
        .defaultTo("");
      table.string("image").defaultTo("");
      table.text("bio").defaultTo("");
      table.string("password").notNullable();
      table.timestamps(true, true);
    })

    .createTable("user_cases", function(table) {
      table
        .uuid("id")
        .unique()
        .primary()
        .notNullable();
      table
        .string("name")
        .unique()
        .notNullable();
      table.timestamps(true, true);
    });
};

exports.down = function(knex) {
  /* eslint-disable-next-line */
  return knex.schema
    .dropTableIfExists("users")
    .dropTableIfExists("user_cases");
};
