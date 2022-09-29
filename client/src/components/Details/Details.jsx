import { Link } from "react-router-dom";
import axios from 'axios'
import { useParams } from 'react-router'
import  { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRecipesById } from '../../actions/index.js';
import '../Details/Details.css'


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

	
	return <div className='details-main-container'>
				{
					recipe ?
					<>		
							<div>
								<h1 className='detail-title'>{recipe.title}</h1>
							</div>
					<div className="detail-container">
						<div className="div-left">
							<div>
								<img className="detail-image" src={recipe.image} alt='imagen'></img>
							</div>
							<div className="detail-typeofdish">
								<h4>Type of dish: {recipe.dishTypes}</h4>
							</div>
							<div className="detail-diets">
								<h4>Belongs to the diets: {recipe.diets}</h4>
							</div>
							<div className="detail-healthscore">
								<h4>HealthScore: {recipe.healthScore}</h4>
							</div>
						</div>
						<div className="div-right">
							<div className="detail-summary">
								<p dangerouslySetInnerHTML={{__html: recipe.summary,}}/>
							</div>
							<div className="details-container-stepbystep">
								<h3 className="details-stepbystep-title">Step by step:</h3>
								<ul>
									{recipe.analyzedInstructions ? (
										recipe.analyzedInstructions[0].map((steps, idx) => {
										return <li key={idx}>{steps}</li>;
										})
										) : (
											<li>No instructions to this recipe</li>
										)}
								</ul>
							</div>
						</div>
						{/* <p obj.analyzedInstructions[0]?.steps.map(el => el.step)/> */}												
					</div>
						</> : 
						<div>loading...</div>
				}
			</div>
	}
	
	
	
	
	
	
	