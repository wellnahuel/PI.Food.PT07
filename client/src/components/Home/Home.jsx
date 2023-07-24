import { Link } from "react-router-dom";
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchRecipes } from '../../actions';
import Recipe from '../Recipe/Recipe';
import Pagination from '../Pagination/Pagination';
import '../Home/Home.css'
import { Loading } from "../Loading/Loading";


//kshdfbjsdhgvbshdjgbsdjgbfdjfhgvbd

export default function Home() {
  let store = useSelector((state) => state)
  const [currentPage, setCurrentPage] = useState(1)
  const [recipesPerPage, setRecipesPerPage] = useState(9)
  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;

  function currentRecipesFrula(arr) {
    let cortado = [...arr]
    return cortado.slice(indexOfFirstRecipe, indexOfLastRecipe)
  }

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber)
  }
  const totalNumberOfRecipes = store.recipesToShow?.length

  let dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchRecipes())
  }, [])
  useEffect(() => {
  }, [store, currentPage])

  if(store.recipesToShow?.length === 0 ) {
    return <Loading />
  }

  return <div className='pagination-external-container'>
    <div >
      <Pagination paginate={paginate} recipesPerPage={recipesPerPage} totalNumberOfRecipes={totalNumberOfRecipes}></Pagination>
    </div>
    <div className='recipes-external-container'>
      {store.RecipesByName?.length ? currentRecipesFrula(store.RecipesByName).map((currentRecipes) => {
        return (
          <Link to={`/recipes/${currentRecipes.id}`} className="recipe">
            <Recipe className='recipe-render' key={currentRecipes.id} name={currentRecipes.name} image={currentRecipes.image} diets={currentRecipes.diets} />
          </Link>
        )
      }) : store.orderedRecipes?.length ? currentRecipesFrula(store.orderedRecipes).map((currentRecipes) => {
        return (
          <Link to={`/recipes/${currentRecipes.id}`} className="recipe">
            <Recipe key={currentRecipes.id} name={currentRecipes.name} image={currentRecipes.image} diets={currentRecipes.diets} />
          </Link>
        )
      }) : store.filteredRecipes?.length ? currentRecipesFrula(store.filteredRecipes).map((currentRecipes) => {
        return (
          <Link to={`/recipes/${currentRecipes.id}`} className="recipe">
            <Recipe key={currentRecipes.id} name={currentRecipes.name} image={currentRecipes.image} diets={currentRecipes.diets} />
          </Link>
        )
      }) : currentRecipesFrula(store.recipes).map((currentRecipes) => {
        return (
          <Link to={`/recipes/${currentRecipes.id}`} className="recipe">
            <Recipe key={currentRecipes.id} name={currentRecipes.name} image={currentRecipes.image} diets={currentRecipes.diets} />
          </Link>
        )
      })}
    </div>
  </div>
}