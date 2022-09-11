const { Recipe, Diet } = require('../db.js');
const axios = require('axios');
const { Op } = require('sequelize');
import { BASE_URL, BASE_NEXT, RECIPE_DETAIL, GET_RECIPE_INFO } from '../../constants.js'
const { API_KEY } = process.env
//BASE_URL= 'https://api.spoonacular.com/recipes';
//BASE_NEXT= '/complexSearch';
//RECIPE_DETAIL= '&addRecipeInformation=true';
//GET_RECIPE_INFO = '{id}/information';
//formato ==>  https://api.spoonacular.com/recipes/complexSearch?apiKey=331724e7d8284060a4360d44591cf676&addRecipeInformation=true&query=apple&number=15


//-------------------Busco ''TODA'' la data de la API--------------------------//

const getApiData = async() => { //planteo traer 100 porque no puedo traer más
    const recipePromiseApi = axios.get(`
        ${BASE_URL}${BASE_NEXT}?apiKey=${API_KEY}${RECIPE_DETAIL}&number=100 
    `) //https://api.spoonacular.com/recipes/complexSearch?apiKey=331724e7d8284060a4360d44591cf676&addRecipeInformation=true&query=apple&number=15
    const apiData = await recipePromiseApi.data.results.map(datas => {
        return { //aca meto filtrado de lo que viene, que es mucha data no util.
            id: datas.id,
            image: datas.image,
            title: datas.title,
            diets: datas.diets?.map(element => element),
            summary: datas.summary,
            aggregateLikes: datas.aggregateLikes,
            healthScore: datas.healthScore,  
            steps: datas.analyzedInstructions[0]?.steps.map(s=>s.step).join("")
        };
    });
    return apiData;    
};

//----------------------------------------------------------------------------------//
//------------------Traigo la data de la base de datos -----------------------------//

const getDbData = async () => {
    const dataBase = await Recipe.findAll({
        include:[{
            model: Diet,
            attributes: ['name']
        }]
    });

//----------------------------------------------------------------------------------//
//---------- Filtro la data de la base de datos (si es que hay algo ahi)  ----------//

const dbFilteredData= await database?.map(datas => {
    return {
        id: datas.id,
        image: datas.image,
        title: datas.title,
        diets: datas.diets?.map(element => element),
        summary: datas.summary,
        aggregateLikes: datas.aggregateLikes,
        healthScore: datas.healthScore,  
        steps: datas.steps
    };
});
    return dbFilteredData;
};

//-------Fusiono lo que traje de la API (segun nombre de receta) con lo de la DB ---//

const getAllRecipes = async () => {
    const dbFilteredData = await getDbData();
    const apiData = await getApiData();
    const dataTotal = dbFilteredData.concat(apiData);
    return dataTotal;
};

//---------------------------------------------------------------------------------//
//---------------------Traer recetas por nombre------------------------------------//

async function getRecipesByName (req, res, next) {
    let name = req.query.name;
    try {
        let recipesTotal = await getAllRecipes();
        if (name) {
            let recipesByName = await recipesTotal.filter(
                                                            t => t.title.toLowerCase()
                                                            .includes(title.toLowerCase())
                                                        )
            if(recipesByName.length) {
                res.status(200).send(recipesByName)
            } else if(!recipesByName.length) {
                res.status(404).send('Not found')
            } else {
                res.status(200).send(recipesTotal)
            }
        }
    } catch(err) {
            next(err)
        }
};

//-------------------------------------------------------------------------------//

//-----------------Buscar en la API recetas por ID---------------------------------//
const getRecipeByIdFromApi = async (id) => {
    const result = await axios.get(
      `${BASE_URL}/${id}/informtion?apiKey=${API_KEY}${RECIPE_DETAIL}&number=1`
      //https://api.spoonacular.com/recipes/${id}/information?apiKey=${YOUR_API_KEY}&addRecipeInformation=true&number=1
    );
    const apiDataById = await result.data.results.map(datas => {
        return { //aca meto filtrado de lo que viene, que es mucha data no util.
            id: datas.id,
            image: datas.image,
            title: datas.title,
            diets: datas.diets?.map(element => element),
            summary: datas.summary,
            aggregateLikes: datas.aggregateLikes,
            healthScore: datas.healthScore,  
            steps: datas.analyzedInstructions[0]?.steps.map(s=>s.step).join("")
        };
    });
    return apiDataById
  };

/* const getByIdFromApi = async (id) => {
    const recipeByIdFound = await getRecipeByIdFromApi(id);
    return recipeByIdFound;
}; */

//------------------------------------------------------------------------------------//
//-----------Fusiono lo que traje de la API segun ID con lo de la base de datos-------//

const getAllRecipesById = async () => {
    const dbFilteredData = await getDbData();
    const apiDataById = await getRecipeByIdFromApi();
    const dataById = dbFilteredData.concat(apiDataById);
    return dataById;
};

//---------------------------------------------------------------------------------//
//-------------------Traer recetas por ID------------------------------------------//

async function getRecipeById(req, res, next) {
    const idRecipe = req.params.id;
    try {
        let recipeFound = await getAllRecipesById();
        if(idRecipe) {
            let recipeById = recipeFound.filter(rec = rec.id == idRecipe)
            if(recipeById.length) {
                res.status(200).send(recipesById)
            } else if(!recipeById.length) {
                res.status(404).send('Not found')
            } else {
                res.status(200).send(recipesTotal)
            }
        }
    } catch(err) {
            next(err)
        }
};

//---------------------------------------------------------------------------//

//----------------Crear Receta -----------------------------------------------//

async function createRecipe(req, res, next) {
    const { title, summary, image, dishTypes,
            aggregateLikes, healthScore, steps, diets 
        } = req.body
    const recipeCreated = await Recipe.create({
        title,
        summary,
        image,    
        aggregateLikes,
        dishTypes,
        healthScore,
        steps
    });

diets.forEach(async element => {
    let dietDb = await Diet?.findOne({ where: {name: element} })
    recipeCreated.addDiet(dietDb)
    
});
    res.json(recipeCreated)
};


//-----------------------------------------------------------------------------//





module.exports = {
    getRecipesByName,
    getRecipeById,
    createRecipe,
};

