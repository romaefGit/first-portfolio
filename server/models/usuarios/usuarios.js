module.exports = function(sequelize, Sequelize) {
  return sequelize.define('usuarios', {
    idusuario: { 
      type: Sequelize.INTEGER(11), 
      primaryKey: true,
      autoIncrement: true,
    },
    nombre : {
      type: Sequelize.STRING(100),
      allowNull: false,
    },
    apellidos : {
      type: Sequelize.TEXT, 
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING(100), 
      allowNull: false,
      unique: true,
    },
    password: {
      type: Sequelize.STRING(100),
      allowNull: false,
    },
  },{
    timestamps : true,
    name : {plural : 'usuarios', singular : 'usuario'}
  });
}
