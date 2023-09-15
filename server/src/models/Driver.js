const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Driver', {
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
      unique: true
       },

       createBBDD: {
      type: DataTypes.BOOLEAN,
      default: true,

      },

   

    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    apellido: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    imagen: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    descripcion : {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    nacionalidad : {
      type: DataTypes.STRING ,
      allowNull: false,
    }
    ,
    fechaNacimiento: {
        type: DataTypes.TEXT ,
        allowNull: false,
      }



  });   
};
