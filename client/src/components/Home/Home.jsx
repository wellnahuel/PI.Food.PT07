import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchRecipes } from '../../actions';
import Recipe from '../Recipe/Recipe';

export default function Home() {

    let recipes = useSelector((state) => state.filteredRecipes)//recipes es una array
    console.log(recipes)
    let dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchRecipes())
    }, [])
    console.log(recipes)

    return <div>
        {recipes.map((recipe) => {
            console.log(recipe.title)
            return <Recipe title={recipe.title} image={recipe.image} diets={recipe.diets}/>
        })}
    </div>
}