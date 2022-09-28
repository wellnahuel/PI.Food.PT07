//import "./CreateRecipe.css";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { postRecipe } from '../../actions';

//const axios = require("axios");

function validate(input) {
    let errors = {};
    if (!input.title) {
      errors.name = "You must enter a valid name for your recipe";
    }
    if (!input.resume) {
      errors.resume = "You must enter a valid resume for your recipe";
    }
    if ( parseInt(input.score) < 0 || parseInt(input.score) > 100) {
      errors.score = "The score must be a number between 0 and 100";
    }        
    return errors;
  }

export default function Form() {
  //const navigate = useNavigate()
  const dispatch = useDispatch()    
  const [errors, setErrors] = useState({})
  const typesOfDiets = useSelector((state) => state.diets);

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
      ...setInput,
      [e.target.name] : e.target.value
    })
    setErrors(validate({
      ...input,
      [e.target.name]: e.target.value
    }))
  }

  function handleCheck(e) {
    if(e.target.checked) {
      setInput({
        ...input,
        diets: e.target.value
      })
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(input);
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
      <div>
        <Link className="linkHome" to="/recipes">
          <button>Home</button>
        </Link>
        <h1>Create your recipe</h1>
        <form onSubmit={(e) => handleSubmit(e)}>            
          <div>
            <label>Title:</label>
            <input
              type='text'
              value={input.title}
              name='title'
              onChange={(e) => handleChange(e)}
          />
          {errors.name && (
            <p className="error">{errors.name}</p>
          )}
          </div>
        <div>
          <label>Resume:</label>
          <input
            type='text'
            value={input.resume}
            name='resume'
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div>
          <label>Score:</label>
          <input
            type='text'
            value={input.score}
            name='score'
            onChange={(e) => handleChange(e)}
          />
        </div>
        <br />
        <button type="submit">Create Recipe</button>
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