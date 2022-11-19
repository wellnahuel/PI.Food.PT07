import '../Form/Form.css'
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postRecipe } from '../../actions';
import { getDiets } from '../../actions/index.js'

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
  if (parseInt(input.score) < 0 || parseInt(input.score) > 100) {
    errors.score = "The score must be a number between 0 and 100";
  }
  return errors;
}

export default function Form() {

  const allDietsToForm = useSelector((state) => state.allDiets);
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getDiets());
  }, [dispatch]);

  const [errors, setErrors] = useState({})
  const [input, setInput] = useState({
    title: "",
    resume: "",
    diets: [],
    errors: {},
    score: 0,
    instructions: [],
  });

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    })
    setErrors(validate({
      ...input,
      [e.target.name]: e.target.value
    }))
  }

  function handleCheck(e) {
    if (e.target.checked) {
      setInput({
        ...input,
        diets: [...input.diets, e.target.value]
      })
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(postRecipe(input))
    alert('Recipe created')
    setInput({
      title: "",
      resume: "",
      diets: [],
      score: "",
      instructions: [],
    })
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
            {errors.instructions && (
              <p className="error">{errors.instructions}</p>
            )}
          </div>
          <div className="form-rigth-div">
            <div className="form-list-diets">
              {allDietsToForm.length > 0 &&
                allDietsToForm.map((diet) => (
                  <label
                    htmlFor={diet.id}
                  >
                    <input
                      key={diet.id}
                      type='checkbox'
                      value={diet.id}
                      name={diet.name}
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
