//import "./CreateRecipe.css";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
const axios = require("axios");

export default function Form() {
    
    const types = useSelector((state) => state.diets);
    const initialState = {
        name: "",
        resume: "",
        diets: [],
        errors: {},
        score: 0,
        instructions: [],
        image: "",
    };
    
    const [recipe, setRecipe] = useState(initialState);

    function validate(values) {
        let errors = {};
        if (!values.name) {
          errors.name = "You must enter a valid name for your recipe";
        }
        if (!values.resume) {
          errors.resume = "You must enter a valid resume for your recipe";
        }
        if (
          parseInt(values.score) < 0 ||
          parseInt(values.score) > 100
        ) {
          errors.score = "The score must be a number between 0 and 100";
        }        
        return errors;
      }

      const handleChange = (e) => {
        setRecipe((prevState) => {
          return {
            ...prevState,
            [e.target.name]: e.target.value,
          };
        });
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
    
        const { errors, ...sinErrors } = recipe;
        const result = validate(sinErrors);
    
        setRecipe((prevState) => {
          return {
            ...prevState,
            healthScore: parseInt(recipe.healthScore),
            spoonacularScore: parseInt(recipe.spoonacularScore),
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

      function addDiet(type) {
        if (!recipe.diets.includes(type)) {
          setRecipe({
            ...recipe,
            diets: [...recipe.diets, type],
          });
        }
      }
     


        return (
            <div className="form_container__all">
            <div className="titlePage">
                <h4>Create your recipe</h4>
            </div>
            <form className="form__container" id="formCreate" onSubmit={(e) => handleSubmit(e)}>
                <div className="left">
                <div className="form__title">
                    <label>Title</label>
                    <input name="title" className="form__title__input" type="text" autoComplete="off" onChange={(e) => handleChange(e)}/>
                    {recipe.errors.title && (
                    <p>You must enter a valid title for your recipe</p>
                    )}
                </div>
                <div className="form__summary">
                    <p>Summary</p>
                    <textarea
                    name="summary"
                    className="form__summary__textarea"
                    type="text"
                    autoComplete="off"
                    onChange={(e) => handleChange(e)}
                    />
                    {recipe.errors.summary && (
                    <p>You must enter a valid summary for your recipe</p>
                    )}
                </div>
                
                <div className="form__image">
                    <p>URL Image</p>
                    <input
                    name="image"
                    className="form__image--input"
                    placeholder="url"
                    type="text"
                    autoComplete="off"
                    onChange={(e) => handleChange(e)}
                    />
                </div>
                </div>
                <div className="right">
                <div className="form__diets">
                    <p className="form__diets__title">Select diet types:</p>
                    {types.length &&
                    types.map((type, idx) => {
                        return (
                        <div key={idx}>
                            <p>{type.name}</p>
                            <p
                            className="stepButton"
                            onClick={() => {
                                addDiet(type.name);
                            }}
                            >
                            Add
                            </p>
                        </div>
                        );
                    })}
                </div>
                       
                <div className="form__scoreHealth">
                    <p>Health Score</p>
                    <input
                    name="healthScore"
                    className="healthScoreInput"
                    type="number"
                    autoComplete="off"
                    onChange={(e) => handleChange(e)}
                    />
                    {recipe.errors.spoonacularScore && (
                    <p>The health score must be a number between 0 and 100</p>
                    )}
                </div>
        
               
                </div>
                <button type="submit" className="btn-create">
                Create
                </button>
            </form>
            <Link className="linkHome" to="/home">
                Home
            </Link>
            </div>
        );
        };
