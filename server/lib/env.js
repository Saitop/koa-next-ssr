if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = "development";
}

if (!process.env.DB_CLIENT) {
  process.env.DB_CLIENT = "pg";
}
if (!process.env.DB_CONNECTION) {
  process.env.DB_CONNECTION = "postgres://test:test@localhost:5432/cbs";
}
