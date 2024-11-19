/** Dependencias **/
var path = require('path');
var Sequelize = require('sequelize');

var beta = {
	host: 'localhost',
	port: 3306,
	db_user: 'root',
	db_password: '',
	db_name: 'romaef',
	db_dialect: 'mysql'
};

// var pro = {
// 	host: '',
// 	port: ,
// 	db_user: '',
// 	db_password: '',
// 	db_name: '',
// 	db_dialect: ''
// };

const connect = beta;

/** Conexion a la base de datos **/
var sequelize = new Sequelize(connect.db_name, connect.db_user, connect.db_password, {
    host    : connect.host,
    port    : connect.port,
    dialect : connect.db_dialect
});
// CREATE SCHEMA `romaef` DEFAULT CHARACTER SET utf8 ;
/** Importar Modelos **/
var Languages = sequelize.import(path.join(__dirname, 'languages/languages'));
var Empresas = sequelize.import(path.join(__dirname, 'empresas/empresas'));
var Usuarios = sequelize.import(path.join(__dirname, 'usuarios/usuarios'));
var Articulos = sequelize.import(path.join(__dirname, 'articulos/articulos'));
var Medias = sequelize.import(path.join(__dirname, 'medias/medias'));
var EmpresaHasLanguages = sequelize.define('EmpresaHasLanguages');

// asociaciones
Languages.belongsTo(Medias, {foreignKey : 'idmedia'});
Empresas.belongsTo(Medias, {foreignKey : 'idmedia'});
Usuarios.belongsTo(Medias, {foreignKey : 'idmedia'});
Articulos.belongsTo(Medias, {foreignKey : 'idmedia'});

//empresa tiene lenguajes
Empresas.belongsToMany(Languages, { through: EmpresaHasLanguages ,foreignKey: 'idempresa', });
// lenguajes tienen empresas
Languages.belongsToMany(Empresas, { through: EmpresaHasLanguages ,foreignKey: 'idlanguage',});

// crea en base de datos
exports.Languages = Languages;
exports.Empresas = Empresas;
exports.Usuarios = Usuarios;
exports.Articulos = Articulos;
exports.Medias = Medias;
exports.EmpresaHasLanguages = EmpresaHasLanguages;

/** Sincroinizar La Base de Datos **/ 

// sequelize.sync().then(function() {
// 		console.log("---------------------------------------------------------");
// 		console.log("<<<<<<< (Success) Se sincronizó La base de Datos >>>>>>>>");
// 		console.log("---------------------------------------------------------");
// 	}, function(err) {
// 		console.log("---------------------------------");
// 		console.log("<<<<<<< (Error) "+err+ " >>>>>>>>");
// 		console.log("---------------------------------");
// });
