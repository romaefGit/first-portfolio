var express = require("express"); // express rutas
var path = require("path"); // saber bien el path del proyecto
var fs = require("fs");
var logger = require("morgan"); // logs
var cookieParser = require("cookie-parser"); //
var bodyParser = require("body-parser"); // poner limites de carga
var app = express();

// build de Angular (cd frontend && npm run build)
var angularDist = path.join(__dirname, "frontend", "dist", "frontend", "browser");
var angularIndex = path.join(angularDist, "index.html");

// servidor
app.use(logger("dev"));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());

// API
app.use("/server/api", require("./server/routes/api"));
app.use("/server/api", function (req, res) {
  res.status(404).json({ status: false, message: "Not Found" });
});

// archivos públicos: estilos, imágenes y lo que suben desde el admin
app.use("/public", express.static(path.join(__dirname, "public")));
app.use("/languages-img", express.static(path.join(__dirname, "public/img/lenguajes")));
app.use("/empresas-img", express.static(path.join(__dirname, "public/img/empresas")));
app.use("/articulos-img", express.static(path.join(__dirname, "public/img/articulos")));

// app Angular
app.use(express.static(angularDist));

// cualquier otra ruta es del router de Angular (/inicio, /admin/languages, ...)
app.get("*", function (req, res, next) {
  if (!fs.existsSync(angularIndex)) {
    return next(new Error("No se encontró el build de Angular. Ejecuta: npm run build"));
  }
  res.sendfile(angularIndex); // express 4.2 no tiene res.sendFile
});

// Error handler (no stack traces leaked to user)
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({ error: err.message });
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
