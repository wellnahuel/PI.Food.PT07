import { Link } from "react-router-dom";

import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchRecipes } from '../../actions';
import Recipe from '../Recipe/Recipe';
//import Pagination from '../Pagination/Pagination';

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
            return (
              <Link to={`/recipes/${recipe.id}`} className="recipe">
                <Recipe title={recipe.title} image={recipe.image} diets={recipe.diets}/>

              </Link>
              )
        
        }) : store.orderedRecipes?.length ? store.orderedRecipes.map((recipe) => {

            return (
              <Link to={`/recipes/${recipe.id}`} className="recipe">
                <Recipe title={recipe.title} image={recipe.image} diets={recipe.diets}/>

              </Link>

            )
            
            
        }) : 
        store.recipes.map((recipe) => {
            console.log(recipe.title)
            return (
              <Link to={`/recipes/${recipe.id}`} className="recipe">
                <Recipe title={recipe.title} image={recipe.image} diets={recipe.diets}/>

              </Link>
              
              ) 
        })}
    </div>
}