const Router = require("@koa/router");
const { Dashboard, Widget } = require("../models");
const router = new Router({ prefix: "/api/dashboards" });

// Get dashboard by ID
router.get("/:id", async (ctx) => {
  try {
    const { id } = ctx.params;
    const dashboard = await Dashboard.findByPk(id, {
      include: [{ model: Widget, as: "widget" }],
    });

    if (!dashboard) {
      ctx.status = 404;
      ctx.body = { error: "Dashboard not found" };
      return;
    }

    ctx.body = dashboard;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: error.message };
  }
});

// Get all dashboards
router.get("/", async (ctx) => {
  try {
    const dashboards = await Dashboard.findAll({
      include: [{ model: Widget, as: "widget" }],
    });
    if (!dashboards) {
      ctx.status = 404;
      ctx.body = { error: "No dashboards found" };
      return;
    }
    ctx.body = dashboards;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: error.message };
  }
});

// Create new dashboard
router.post("/", async (ctx) => {
  try {
    const { name, layouts } = ctx.request.body;
    const dashboard = await Dashboard.create({
      name,
      layouts: layouts,
      nextId: 1,
    });
    ctx.status = 201;
    ctx.body = dashboard;
  } catch (error) {
    ctx.status = 400;
    ctx.body = { error: error.message };
  }
});

// Update dashboard layouts
router.put("/:id", async (ctx) => {
  try {
    const { id } = ctx.params;
    const { layouts, name } = ctx.request.body;

    const dashboard = await Dashboard.findByPk(id);
    if (!dashboard) {
      ctx.status = 404;
      ctx.body = { error: "Dashboard not found" };
      return;
    }

    await dashboard.update({ layouts, name });
    ctx.body = dashboard;
  } catch (error) {
    ctx.status = 400;
    ctx.body = { error: error.message };
  }
});

// Add widget to dashboard
router.post("/:id/widgets", async (ctx) => {
  try {
    const { id } = ctx.params;
    const { type, widget_id } = ctx.request.body;
    const name = ctx.request.body.widgetName || null;

    const dashboard = await Dashboard.findByPk(id);
    if (!dashboard) {
      ctx.status = 404;
      ctx.body = { error: "Dashboard not found" };
      return;
    }

    const widget = await Widget.create({
      dashboard_id: id,
      type,
      widget_id,
      name,
    });

    ctx.status = 201;
    ctx.body = widget;
  } catch (error) {
    ctx.status = 400;
    ctx.body = { error: error.message };
  }
});

// Update widget in dashboard
router.put("/:id/widgets/:widgetId", async (ctx) => {
  const { id, widgetId } = ctx.params;
  try {
    const widget = await Widget.findOne({
      where: { id: widgetId, dashboard_id: id },
    });
    if (!widget) {
      ctx.status = 404;
      ctx.body = { error: "Widget not found" };
      return;
    }

    await widget.update({ name: ctx.request.body.name });
    ctx.body = widget;
  } catch (error) {
    ctx.status = 400;
    ctx.body = { error: error.message };
  }
});

// Delete dashboard
router.delete("/:id", async (ctx) => {
  try {
    const { id } = ctx.params;
    const dashboard = await Dashboard.findByPk(id);

    if (!dashboard) {
      ctx.status = 404;
      ctx.body = { error: "Dashboard not found" };
      return;
    }

    await dashboard.destroy();
    ctx.status = 204;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: error.message };
  }
});

module.exports = router;
