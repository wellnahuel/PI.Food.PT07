//Creamos el modelo -tabla- recipe (en la DB se llamara recipes)

const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipe', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING
    },
    resume: {
      type: DataTypes.STRING,
      allowNull: false
    },
    score: {
      type: DataTypes.INTEGER,
    },
    instructions: {
      type: DataTypes.TEXT
    }
  });
};

//uso UUID para que el id de la DB no se choque con el de la API.
//para definir la relacion entre este modelo y Diet me voy a db.js