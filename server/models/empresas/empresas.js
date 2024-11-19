module.exports = function(sequelize, Sequelize) {
  return sequelize.define('empresas', {
    idempresa: { 
      type: Sequelize.INTEGER(11), 
      primaryKey: true,
      autoIncrement: true,
    },
    nombre : {
      type: Sequelize.STRING(100),
      allowNull: false,
    },
    selector: {
      type: Sequelize.STRING(100),
      allowNull: false,
    },
    descripcion: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    propiedades: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
  },{
    timestamps : true,
    name : {plural : 'empresas', singular : 'empresa'}
  });
}
