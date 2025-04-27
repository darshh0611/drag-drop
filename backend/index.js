require("dotenv").config();
const sequelize = require("./database/index");
const Koa = require("koa");
const Router = require("@koa/router");
const cors = require("@koa/cors");
const bodyParser = require("koa-bodyparser");
const dashboardRouter = require("./routes/dashboard");

const app = new Koa();
const health = new Router();

health.get("/healthz", async (ctx, next) => {
  await sequelize.authenticate();
  ctx.body = {
    ok: true,
  };
});

app.use(health.routes());

app.use(
  cors({
    origin: "http://localhost:3000",
    allowMethods: ["GET", "POST", "PUT", "DELETE"],
    allowHeaders: ["Content-Type", "Authorization"],
    exposeHeaders: ["Content-Type", "Authorization"],
    maxAge: 600,
  })
);

app.use(
  bodyParser({
    enableTypes: ["json", "text"],
    extendTypes: {
      text: ["text/plain"],
    },
    textLimit: "10mb",
    strict: false,
  })
);

app.use(dashboardRouter.routes());
app.use(dashboardRouter.allowedMethods());

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
