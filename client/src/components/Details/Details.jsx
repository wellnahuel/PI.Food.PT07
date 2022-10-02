import axios from 'axios'
import { useParams } from 'react-router'
import { useEffect, useState } from 'react';
import '../Details/Details.css'

export default function Details() {
	const [recipe, setRecipe] = useState(null)
	let { id } = useParams()

	useEffect(() => {
		axios.get('http://localhost:3001/recipes/' + id)
			.then((response) => {
				setRecipe(response.data)
			})
		return () => {
			setRecipe(null)
		}
	}, [])

	const dietString = (diets) => {
		if (typeof diets[0] === 'string') {
			return diets
		}
		const str = diets.map(el => el.name)
		return str;
	}
	return <div className='details-main-container'>
			{
				recipe ?
					<>
						<div>
							<h1 className='detail-title'>{recipe.name}</h1>
						</div>
						<div className="detail-container">
							<div className="div-left">
								<div>
									<img className="detail-image" src={recipe.image} alt='imagen'></img>
								</div>
								<div className="detail-diets">
									<h4>Belongs to the diets: {dietString(recipe.diets)}</h4>
								</div>
								<div className="detail-healthscore">
									<h4>HealthScore: {recipe.score}</h4>
								</div>
							</div>
							<div className="div-right">
								<div className="detail-summary">
									<p dangerouslySetInnerHTML={{ __html: recipe.resume }} />
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
										)
										}
									</ul>
								</div>
							</div>

						</div>
					</> :
					<div>loading...</div>
			}
		</div>
}






