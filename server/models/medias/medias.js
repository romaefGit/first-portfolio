module.exports = function(sequelize, Sequelize) {
  return sequelize.define('medias', {
    idmedia: { 
      type: Sequelize.INTEGER(11), 
      primaryKey: true,
      autoIncrement: true,
    },
    url : {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    url_dos: {
      type: Sequelize.TEXT,
    },
  },{
    timestamps : true,
    name : {plural : 'medias', singular : 'media'}
  });
}
