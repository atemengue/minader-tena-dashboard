const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://172.16.40.12:3001",
      changeOrigin: true,
    })
  );
};
