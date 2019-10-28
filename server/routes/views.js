const Router = require("koa-router");

const router = new Router();

router.get("/", async ctx => {
  // You can `await` or `return` the ctx.render function call
  await ctx.render({
    screen: "Home",
  });
});

router.get("/info", async ctx => {
  const comments = ctx.session.comments || [];
  const loginInfo = {};
  return ctx.render({
    screen: "Info",
    props: { comments, loginInfo },
  });
});

module.exports = router.routes();
