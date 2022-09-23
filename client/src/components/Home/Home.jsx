import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchRecipes } from '../../actions';
import Recipe from '../Recipe/Recipe';

export default function Home() {

    let store =  useSelector((state) => state)
    //let recipes = useSelector((state) => state.recipes)//recipes es una array
   // console.log(recipes)
    let dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchRecipes())
    }, [])

    useEffect(() => {
     console.log(store) 
    }, [store])
   // console.log(recipes)

    return <div>
        { store.RecipesByName?.length ?  store.RecipesByName.map((recipe) => {
            return <Recipe title={recipe.title} image={recipe.image} diets={recipe.diets}/>
        
        }) : store.orderedRecipes?.length ? store.orderedRecipes.map((recipe) => {
            return <Recipe title={recipe.title} image={recipe.image} diets={recipe.diets}/>
            
        }) : 
        store.recipes.map((recipe) => {
            console.log(recipe.title)
            return <Recipe title={recipe.title} image={recipe.image} diets={recipe.diets}/>
        })}
    </div>
}