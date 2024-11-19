module.exports = function(sequelize, Sequelize) {
  return sequelize.define('articulos', {
    idarticulo: { 
      type: Sequelize.INTEGER(11), 
      primaryKey: true,
      autoIncrement: true,
    },
    titulo : {
      type: Sequelize.STRING(100),
      allowNull: false,
    },
    descripcion : {
      type: Sequelize.TEXT, 
      allowNull: false,
    },
    meta_description : {
      type: Sequelize.TEXT, 
      allowNull: false,
    },
    og_title : {
      type: Sequelize.STRING(100), 
      allowNull: false,
    },
  },{
    timestamps : true,
    name : {plural : 'articulos', singular : 'articulo'}
  });
}
