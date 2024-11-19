module.exports = function(sequelize, Sequelize) {
  return sequelize.define('languages', {
    idlanguage: { 
      type: Sequelize.INTEGER(11), 
      primaryKey: true,
      autoIncrement: true,
    },
    nombre : {
      type: Sequelize.STRING(100),
      allowNull: false,
    },
    porcentaje : {
      type: Sequelize.TEXT, 
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
    tipo: {
      type: Sequelize.ENUM('Front', 'Midle', 'Back'),
      allowNull: false,
    },
  },{
    timestamps : true,
    name : {plural : 'languages', singular : 'language'}
  });
}
