const { Recipe, Diet } = require('../db.js');
const axios = require('axios');

//import { BASE_URL, BASE_NEXT, RECIPE_DETAIL } from '../../constants.js'
const { API_KEY } = process.env
//BASE_URL= 'https://api.spoonacular.com/recipes';
//BASE_NEXT= '/complexSearch';
//RECIPE_DETAIL= '&addRecipeInformation=true';
//GET_RECIPE_INFO = '{id}/information';
//formato ==>  https://api.spoonacular.com/recipes/complexSearch?apiKey=331724e7d8284060a4360d44591cf676&addRecipeInformation=true&query=apple&number=15

//${BASE_URL}${BASE_NEXT}?apiKey=${API_KEY}${RECIPE_DETAIL}&number=100 

//-------------------Busco ''TODA'' la data de la API--------------------------//

const getApiData = async() => { //planteo traer 100 porque no puedo traer más
    const recipePromiseApi = await axios.get(`
    https://api.spoonacular.com/recipes/complexSearch?apiKey=b1d326b95121455f9ff08ca199046e1d&addRecipeInformation=true&number=10
    `) 
    const apiData = recipePromiseApi.data.results.map(datas => {
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

const dbFilteredData= await dataBase?.map(datas => {
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
                                                            .includes(name.toLowerCase())
                                                        )
            if(recipesByName.length) {
                res.status(200).send(recipesByName)
            } else if(!recipesByName.length) {
                res.status(404).send('Not found')
            } else {
                res.status(200).send(recipesTotal)
            }
        } else {
            res.status(200).send(recipesTotal)
        }
    } catch(err) {
            next(err)
        }
};

//-------------------------------------------------------------------------------//

function getRecipeById(req, res, next) {
	const id = req.params.idRecipe;
	if (id.includes('-')) { //si el id tiene un '-' es porque es UUID , ergo esta en la DB, magia de Lau 
		Recipe.findByPk(id, { include: Diet }).then((resp) => {
			return res.json(resp);
		});
	} else { // si no esta en la DB me voy a buscar a la API (aca use tu magia Fran)
		axios.get(`https://api.spoonacular.com/recipes/${id}/information?includeNutrition=false&apiKey=b1d326b95121455f9ff08ca199046e1d`)
		  .then((response) => {
				return res.json({
					title: response.data.title,
					image: response.data.image,
					dishTypes: response.data.dishTypes,
					diets: response.data.diets,
					summary: response.data.summary,
					score: response.data.spoonacularScore,
					healthScore: response.data.healthScore,
					instructions: response.data.instructions,
				});
			})
			.catch((error) => next(error));
	}
}
  

//----------------Crear Receta -----------------------------------------------//

async function createRecipe(req, res, next) {
    let {
        title,
        summary,
        aggregateLikes,
        healthScore,
        analyzedInstructions,
        image,
        diets,
      } = req.body;

      try {
        if (!title || !summary) {
          return res.json(
            "You must enter a title and a summary to create a recipe"
          );
        }
        let recipeCreated = await Recipe.create({
          title,
          summary,
          aggregateLikes,
          healthScore,
          analyzedInstructions,
          image,
        });
    
        let dietDb = await Diet.findAll({ where: { name: diets } });
        await recipeCreated.addDiet(dietDb);
    
        res.send("Recipe created");
      } catch (err) {
        res.json({ err });
      }
    };


//-----------------------------------------------------------------------------//





module.exports = {
    getRecipesByName,
    getRecipeById,
    createRecipe,
};


