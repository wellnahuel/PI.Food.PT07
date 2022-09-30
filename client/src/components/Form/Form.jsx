import '../Form/Form.css'
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { postRecipe } from '../../actions';
import {getDiets} from '../../actions/index.js'

//const axios = require("axios");

function validate(input) {
    let errors = {};
    if (!input.title) {
      errors.title = "You must enter a valid name for your recipe";
    }
    if (!input.resume) {
      errors.resume = "You must enter a valid resume for your recipe";
    }
    if (!input.instructions) {
      errors.instructions = "You must enter a valid instructions for your recipe";
    }
    if ( parseInt(input.score) < 0 || parseInt(input.score) > 100) {
      errors.score = "The score must be a number between 0 and 100";
    }        
    return errors;
  }

export default function Form() {
  const allDietsToForm = useSelector((state) => state.allDiets);
  console.log(allDietsToForm)
  const dispatch = useDispatch()    

  useEffect(() => {
		dispatch(getDiets());
	}, [dispatch]);

  

  //const navigate = useNavigate()
  const [errors, setErrors] = useState({})
  //const typesOfDiets = useSelector((state) => state.diets);

  const [input, setInput] = useState ({
    title: "",
    resume: "",
    diets: [],
    errors: {},
    score: 0,
    instructions: [],
    //image: "",
  });
    
  // const [recipe, setRecipe] = useState(initialState);


  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name] : e.target.value
    })
   // console.log(errors)
    setErrors(validate({
      ...input,
      [e.target.name]: e.target.value
    }))
  }

  function handleCheck(e) {
    //console.log(input.diets)
    if(e.target.checked) {
      setInput({
        ...input,
        diets: [...input.diets, e.target.value]
      })
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    //console.log(input);
    dispatch(postRecipe(input))
    alert('Recipe created')
    setInput({
      title: "",
      resume: "",
      diets: [],
      score: "",
      instructions: [],
    })
    //navigate('/recipes')
  }
  

  
  
  return (
      <div className="form-main-container">
        <h1 className="form-title">Create your recipe</h1>
        <form onSubmit={(e) => handleSubmit(e)}>            
          <div className="form-main-div">            
            <div className="form-left-div">
              <label>Title:</label>
              <input
                type='text'
                value={input.title}
                name='title'
                onChange={(e) => handleChange(e)}
              />
              {errors.title && (
              <p className="error">{errors.title}</p>
              )}
              <label>Resume:</label>
              <textarea
                type='text'
                value={input.resume}
                name='resume'
                onChange={(e) => handleChange(e)}
              /> 
              {errors.resume && (
              <p className="error">{errors.resume}</p>
              )}
              <label>Score:</label>
              <input
                type='text'
                value={input.score}
                name='score'
                onChange={(e) => handleChange(e)}
              />
              {errors.score && (
              <p className="error">{errors.score}</p>
              )}
              <label>Instructions:</label>
              <textarea
                type='text'
                value={input.instructions}
                name='instructions'
                onChange={(e) => handleChange(e)}
              />
              {errors.instructios && (
              <p className="error">{errors.instructions}</p>
              )}
            </div>  
            <div className="form-rigth-div">
              <div className="form-list-diets">
                {allDietsToForm.length > 0 &&
                    allDietsToForm.map((diet) => (
                      <label
                        htmlFor={diet.id
                          .toLowerCase()
                          .replace(' ', '')
                          .replace('-', '')}
                      >
                      <input
                        key={diet.id}                          
                        type='checkbox'
                        value = {diet.id}
                        name={diet.name
                          .toLowerCase()
                          .replace(' ', '')
                          .replace('-', '')}
                        onChange={handleCheck}
                      />
                      {diet.name}
                      </label>
                    ))}
              </div>
             </div>
         
        
          </div>
          <div className="button-create">
            <button type="submit">Create Recipe</button>
          </div>
        </form>
      </div>
      
  );
}
 















































  /*   const handleSubmit = async (e) => {
      e.preventDefault();
  
      const { errors, ...sinErrors } = recipe;
      const result = validate(sinErrors);
  
      setRecipe((prevState) => {
        return {
          ...prevState,
          healthScore: parseInt(recipe.healthScore),
          
          errors: result,
        };
      });
  
      if (!Object.keys(result).length) {
        alert("Valid Form");
      }
      await axios.post("http://localhost:3001/recipes", recipe);
      setRecipe(initialState);
      document.getElementById("formCreate").reset();
      alert("Recipe Uploaded");
    };

     */