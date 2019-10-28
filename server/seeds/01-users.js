const faker = require("faker");

const users = [
  {
    name: "admin",
    role: "admin",
    id: "345ae4d0-f2c3-4342-91a2-5b45cb8db57f",
  },
  {
    name: "hxlin",
    role: "admin",
    email: "hxlin@xxx.com",
    id: "16c1ef84-df72-4be1-ad46-1168ee53cd60",
  },
  {
    name: "someone",
    role: "admin",
    id: "b8d2586f-4746-418c-82b2-db9eff7a7f42",
  },
];

function getUsers() {
  return users.map(u => {
    return {
      id: u.id,
      email: u.email || `${u.name}@demo.com`,
      username: u.name,
      role: u.role,
      password: "piccsadlife",
      bio: faker.lorem.sentences(),
      image: faker.image.avatar(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
  });
}

exports.getUsers = getUsers;

// eslint-disable-next-line func-names
exports.seed = async function(knex) {
  if (process.env.NODE_ENV === "production") {
    await knex("users")
      .whereIn("email", users.map(u => u.email || `${u.name}@demo.com`))
      .del();
  } else {
    await knex("users").del();
  }

  return knex("users").insert(getUsers());
};
