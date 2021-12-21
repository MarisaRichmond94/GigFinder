const functions = require("firebase-functions");
const jsonServer = require("json-server");

const api = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();
middlewares.readOnly = true;

api.use(middlewares);
api.use(jsonServer.rewriter({
  "/:resource/:id/show": "/:resource/:id",
}));
api.use(router);

exports.main = functions.https.onRequest(api);
