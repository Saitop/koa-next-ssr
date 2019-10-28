require("./lib/bootstrap");
/* eslint no-console:0 */
const http = require("http");
const stoppable = require("stoppable");
const pEvent = require("p-event");
const util = require("util");

const db = require("./lib/db");
const createApp = require("./app");
const logger = require("./lib/logger");
const knexConfig = require("./knexfile")[process.env.NODE_ENV];

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "0.0.0.0";

async function createServerAndListen(app, port, host) {
  const server = stoppable(http.createServer(app.callback()), 7000);

  server.listen(port, host);

  server.stop = util.promisify(server.stop);

  await pEvent(server, "listening");

  return server;
}

async function main() {
  let server;
  try {
    await db.select(db.raw("1"));
    logger.debug("Database connected");

    const app = await createApp();
    server = await createServerAndListen(app, PORT, HOST);
    logger.debug(`Server is listening on: ${HOST}:${PORT}`);

    await db.migrate.latest(knexConfig);
    logger.debug("Database migrated");
    await db.seed.run(knexConfig);
    logger.debug("Database seeded");
    logger.debug("App is running");

    await Promise.race([
      ...["SIGINT", "SIGHUP", "SIGTERM"].map(s =>
        pEvent(process, s, {
          rejectionEvents: ["uncaughtException", "unhandledRejection"],
        }),
      ),
    ]);
  } catch (e) {
    console.error(e);
    process.exitCode = 1;
    logger.fatal(e);
  } finally {
    if (server) {
      logger.debug("Close server");
      await server.stop();
      logger.debug("Server closed");
    }

    logger.debug("Close database");
    await db.destroy();
    logger.debug("Database closed");

    setTimeout(() => process.exit(), 10000).unref();
  }
}

main();
