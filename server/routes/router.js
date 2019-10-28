const Router = require("koa-router");
const endpoints = require("./endpoints");
const views = require("./views");

module.exports = async function createRouter() {
  const router = new Router();
  const api = new Router();

  // for health check
  router.get("/ping", async ctx => {
    ctx.body = "pong";
  });

  // View endpoints
  router.use(views);

  // API endpoints
  api.use(endpoints);
  router.use("/api", api.routes());

  return router;
};
