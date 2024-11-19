var express = require("express"); // express rutas
var path = require("path"); // saber bien el path del proyecto
var index = require("./routes/index"); // el landing
var admin = require("./routes/admin"); // el administrador
var cons = require("consolidate"); // sire pararenderizar variables de node en tipo html
var logger = require("morgan"); // logs
var cookieParser = require("cookie-parser"); //
var bodyParser = require("body-parser"); // poner limites de carga
var routes = require("./server/routes/index.js"); // las routes del servidor
var app = express();

// Serve static assets from the /dist directory
// app.use(express.static(path.join(__dirname, 'dist')));
app.use(express.static(path.join(__dirname, "public")));

// serve static assets from the public directory
app.use(express.static(path.join(__dirname, "public")));

// angularJs 1 configuracion de rutas de la app
// esta primero el alias y luego si la ruta que es
app.use("/modulos", express.static(__dirname + "/node_modules"));
app.use("/componentes", express.static(__dirname + "/bower_components"));
app.use("/utiles", express.static(__dirname + "/client/landing/commons"));
app.use("/cliente", express.static(__dirname + "/client"));
app.use(
  "/controladores",
  express.static(__dirname + "/client/landing/controllers")
);
app.use(
  "/controladores_admin",
  express.static(__dirname + "/client/admin/controllers")
);
app.use("/vistas_cliente", express.static(__dirname + "/client/landing/views"));
app.use("/vistas_admin", express.static(__dirname + "/client/admin/views/"));
app.use(
  "/includes",
  express.static(__dirname + "/client/landing/views/includes")
);
app.use(
  "/includes_admin",
  express.static(__dirname + "/client/admin/views/includes/")
);
app.use("/public", express.static(__dirname + "/public"));
// public img
app.use("/languages-img", express.static(__dirname + "/public/img/lenguajes"));
app.use("/empresas-img", express.static(__dirname + "/public/img/empresas"));
app.use("/articulos-img", express.static(__dirname + "/public/img/articulos"));

// Configuracion de lenguaje de marcado a usar
app.engine("html", cons.swig);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "html");

// Rutas del servidor
app.use("/", index);
app.use("/", admin);

// servidor
app.use(logger("dev"));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", routes);
app.use("/server/api", require("./server/routes/api"));

// Fallback route to serve index.html for SPA routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

// Server configuration
app.use(logger("dev"));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());

// Catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// Error handler (no stack traces leaked to user)
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({ error: err.message });
});

// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// se exporta la instacia de app
module.exports = app;

// se pone el puerto
var port = process.env.PORT || 3000;

// mostrar por consola en que puerto está corriendo nodejs
app.listen(port, function () {
  console.log(
    "----------------------------------------------------------------------------------------------------"
  );
  console.log(
    "<<<<<<< (Success) El proyecto  de romaef está corriendo en el http://localhost:" +
      port +
      " >>>>>>>>"
  );
  console.log(
    "----------------------------------------------------------------------------------------------------"
  );
});

// // Export the app instance
// module.exports = app;

// // Start the server
// var port = process.env.PORT || 3000;
// app.listen(port, function () {
//   console.log('----------------------------------------------------------------------------------------------------');
//   console.log('App is running at http://localhost:' + port);
//   console.log('----------------------------------------------------------------------------------------------------');
// });
