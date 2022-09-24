import { Link } from "react-router-dom";
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchRecipes } from '../../actions';
import Recipe from '../Recipe/Recipe';
import Pagination from '../Pagination/Pagination';
export default function Home() {  
    let store =  useSelector((state) => state)
    const [currentPage, setCurrentPage] = useState(1)
    const [recipesPerPage, setRecipesPerPage] = useState(9)
    const indexOfLastRecipe = currentPage * recipesPerPage;
    console.log(indexOfLastRecipe)
    const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
    console.log(indexOfFirstRecipe)

    const currentRecipes =  store.recipes.slice(indexOfFirstRecipe, indexOfLastRecipe)
    console.log(currentRecipes)
    const paginate = (pageNumber) => {
      setCurrentPage(pageNumber)
    }
    const totalNumberOfRecipes = store.recipes.length
    console.log(totalNumberOfRecipes)
    //let recipes = useSelector((state) => state.recipes)//recipes es una array
   // console.log(recipes)
    let dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchRecipes())
    }, [])
    useEffect(() => {
      console.log(currentPage)
     //console.log(store) 
    }, [store, currentPage])
   // console.log(recipes)  

    return <div>
         <Pagination paginate={paginate} recipesPerPage={recipesPerPage} totalNumberOfRecipes={totalNumberOfRecipes}>
         </Pagination>
        { store.RecipesByName?.length ?  store.RecipesByName.map((currentRecipes) => {
            return (
              <Link to={`/recipes/${currentRecipes.id}`} className="recipe">
                <Recipe /* recipesOnScreen={currentRecipes} */ key={currentRecipes.id} title={currentRecipes.title} image={currentRecipes.image} diets={currentRecipes.diets}/>

              </Link>
              )        
        }) : store.orderedRecipes?.length ? store.orderedRecipes.map((currentRecipes) => {
            return (
              <Link to={`/recipes/${currentRecipes.id}`} className="recipe">
                <Recipe /* recipesOnScreen={currentRecipes} */ key={currentRecipes.id} title={currentRecipes.title} image={currentRecipes.image} diets={currentRecipes.diets}/>
              </Link>
            )         
        }) : 
        currentRecipes.map((currentRecipes) => {        
          return (
                <Link to={`/recipes/${currentRecipes.id}`} className="recipe">
                  <Recipe /* recipesOnScreen={currentRecipes} */ key={currentRecipes.id} title={currentRecipes.title} image={currentRecipes.image} diets={currentRecipes.diets}/>
                </Link>               
                ) 
          })}
    </div>
}