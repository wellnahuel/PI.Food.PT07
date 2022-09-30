import { Link } from "react-router-dom";
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchRecipes } from '../../actions';
import Recipe from '../Recipe/Recipe';
import Pagination from '../Pagination/Pagination';
import '../Home/Home.css'

export default function Home() {  
    let store =  useSelector((state) => state)
    const [currentPage, setCurrentPage] = useState(1)
   // const [recipesToShow, setRecipesToShow] = useState();
    const [recipesPerPage, setRecipesPerPage] = useState(9)
    const indexOfLastRecipe = currentPage * recipesPerPage;
    //console.log(indexOfLastRecipe)
    const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
    //(indexOfFirstRecipe)

    function currentRecipesFrula(arr) {
      let cortado = [...arr]
      return cortado.slice(indexOfFirstRecipe, indexOfLastRecipe)
    }
    
   // const currentRecipes =  store.recipes.slice(indexOfFirstRecipe, indexOfLastRecipe)
   // console.log(currentRecipes)
    const paginate = (pageNumber) => {
      setCurrentPage(pageNumber)
    }
    const totalNumberOfRecipes = store.recipes.length
    //console.log(totalNumberOfRecipes)
    //let recipes = useSelector((state) => state.recipes)//recipes es una array
   // console.log(recipes)
    let dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchRecipes())
    }, [])
    useEffect(() => {
     // console.log(currentPage)
     //console.log(store) 
    }, [store, currentPage])
   // console.log(recipes)  

    return <div className='pagination-external-container'>
            <div >
              <Pagination paginate={paginate} recipesPerPage={recipesPerPage} totalNumberOfRecipes={totalNumberOfRecipes}>
              </Pagination>
            </div>
            <div className='recipes-external-container'>
              { store.RecipesByName?.length ?  currentRecipesFrula(store.RecipesByName).map((currentRecipes) => {
                  return (
                    <Link to={`/recipes/${currentRecipes.id}`} className="recipe">
                      <Recipe className='recipe-render' key={currentRecipes.id} title={currentRecipes.title} image={currentRecipes.image} diets={currentRecipes.diets}/>

                    </Link>
                    )        
              }) : store.orderedRecipes?.length ? currentRecipesFrula(store.orderedRecipes).map((currentRecipes) => {
                  return (
                    <Link to={`/recipes/${currentRecipes.id}`} className="recipe">
                      <Recipe /* recipesOnScreen={currentRecipes} */ key={currentRecipes.id} title={currentRecipes.title} image={currentRecipes.image} diets={currentRecipes.diets}/>
                    </Link>
                  )   
              }) : store.filteredRecipes?.length ? currentRecipesFrula(store.filteredRecipes).map((currentRecipes) => {
                return (
                  <Link to={`/recipes/${currentRecipes.id}`} className="recipe">
                    <Recipe /* recipesOnScreen={currentRecipes} */ key={currentRecipes.id} title={currentRecipes.title} image={currentRecipes.image} diets={currentRecipes.diets}/>
                  </Link>
                )
                }): currentRecipesFrula(store.recipes).map((currentRecipes) => {        
                  return (
                    <Link to={`/recipes/${currentRecipes.id}`} className="recipe">
                      <Recipe /* recipesOnScreen={currentRecipes} */ key={currentRecipes.id} name={currentRecipes.name} image={currentRecipes.image} diets={currentRecipes.diets}/>
                    </Link>               
                    ) 
                  })}
            </div>
      </div>
}