//Creamos el modelo -tabla- diet (en la DB se llamara diets)

const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('diet', {
        id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
        },
        name: {
        type: DataTypes.STRING,
        },
    });
}

//uso UUID para que el id de la DB no se choque con el de la API.
//para definir la relacion entre este modelo y Recipe me voy a db.js