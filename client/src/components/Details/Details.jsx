import { Link } from "react-router-dom";
import axios from 'axios'
import { useParams } from 'react-router'
import  { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRecipesById } from '../../actions/index.js';


export default function Details() {
	const [recipe, setRecipe] = useState(null)
    let {id} = useParams()
    useEffect(() => {
        axios.get('http://localhost:3001/recipes/' + id)
        .then((response) => {
            setRecipe(response.data)
        })
        return () => {
            setRecipe(null)
        } //clean up si trabajamos con redux
    }, [])

	
	return <div>
				{
					recipe ?
					<>
						<h1>{recipe.title}</h1>
						<img src={recipe.image} alt='imagen'></img>
						<h4>{recipe.dishTypes}</h4>
						<h4>{recipe.diets}</h4>
						<p dangerouslySetInnerHTML={{__html: recipe.summary,}}/>
						<h4>{recipe.healthScore}</h4>						
					</> : 
					<div>loading...</div>
				}
			</div>
	}
	
	
	
	
	
	
	/* const RecipeID = props.match.params.id;
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getRecipesById(RecipeID));
	}, [dispatch, RecipeID]);
	
	const recipeDetail = useSelector((state) => state.recipeById);*/
    

	/* <div className="details__container__all">
	  {recipeDetail.title && (
		<div className="details__container">
		  <h1 className="details__title">{recipeDetail.title}</h1>
		  <img className="details__image" src={recipeDetail.image} alt="" />
		  <p className="details__summary">{recipeDetail.summary}</p>
		  <div className="details__container__stepbystep">
			<h3 className="details__stepbystep__title">Step by step:</h3>
			<ul>
			  {recipeDetail.analyzedInstructions ? (
				recipeDetail.analyzedInstructions.map((step, idx) => {
				  return <li key={idx}>{step}</li>;
				})
			  ) : (
				<li>No instructions to this recipe</li>
			  )}
			</ul>
		  </div>
		  <div className="details__subcontainer">
			<div>
			  <h3 className="details__diets__title">Diets included:</h3>
			  <ul>
				{recipeDetail.diets.map((diet, idx) => {
				  return <li key={idx}>{diet}</li>;
				})}
			  </ul>
			</div>
			<div>
			  <h4 className="details__healthscore__title">Health Score:</h4>
			  <p>{recipeDetail.healthScore}</p>
			</div>
			<div className="details_spoonacularscore">
			  <h4 className="details__spoonacularscore__title">
				Spoonacular Score:
			  </h4>
			  <p>{recipeDetail.spoonacularScore}</p>
			</div>
			<div>
			  <h4 className="details__dishtypes_title">Dish Types:</h4>
			  <p>
				{recipeDetail.dishTypes &&
				  recipeDetail.dishTypes.length &&
				  recipeDetail.dishTypes.map((e, idx) => {
					return <p key={idx}>{e}</p>;
				  })}
			  </p>
			</div>
		  </div>
		</div>
	  )}
	  <Link className="link__home" to="/home">
		Home
	  </Link>
	</div> */