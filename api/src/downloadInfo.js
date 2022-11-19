const axios = require("axios");
const {
  isElement,
  findRenderedDOMComponentWithTag,
} = require("react-dom/test-utils");
const { DataTypes } = require("sequelize");
require("dotenv").config();
const { API_KEY } = process.env;
const { Recipe, DietsTypes } = require("../db");
const { getInfo } = require("../downloadData/reutilizable");

const getAllApiInformation = async () => {
  const verDb = await Recipe.findAll();
  
  if (verDb.length > 0) {
    console.log("base precargada  ", verDb.length);
    return verDb;
  }

  const { data } = await axios.get(
    `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`
  );
  
  const dataPretended = data.results.map((el) => {
    return getInfo(el);
  });
  try {
    const db = await Recipe.bulkCreate(dataPretended);
    console.log("cargando db por 1° ", db.length);
    return db;
  } catch (error) {
    console.log( "error catch", error);
    return error;
  }
};


module.exports = { getAllApiInformation}; 
