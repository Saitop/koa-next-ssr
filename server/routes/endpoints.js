const Boom = require("@hapi/boom");
const Router = require("koa-router");
const { loginK8s } = require("../k8s/k8s-api");

const router = new Router();
const db = require("../lib/db");

router.get("/comments", async ctx => {
  ctx.session.comments = ctx.session.comments || [];
  ctx.body = ctx.session.comments;
});

router.post("/comments", async ctx => {
  // eslint-disable-next-line no-console
  console.log("posting comments ctx", ctx.session.comments);
  ctx.session.comments = ctx.session.comments || [];

  if (!ctx.request.body["comment"]) {
    throw Boom.badData("Empty comments not allowed");
  }

  const comment = {
    date: new Date(),
    comment: ctx.request.body["comment"],
  };
  ctx.session.comments.push(comment);
  ctx.status = 201;
  ctx.body = comment;
});

router.get("/login", async ctx => {
  const { data: loginInfo } = await loginK8s();
  // eslint-disable-next-line no-console
  console.log("server login info===", loginInfo);
  ctx.status = 201;
  ctx.body = loginInfo;
});

router.get("/users", async ctx => {
  const users = await db("users");
  ctx.status = 200;
  ctx.body = users;
});

module.exports = router.routes();
