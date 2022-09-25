import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {sort, filterRecipesByDiets} from '../../actions';
import { ASCENDENTE, DESCENDENTE,/*  HEALTH_UP, HEALTH_DOWN */} from "../../constantes/sort"

export default function Order() {
  const [filter, setFilter] = useState('');

    const dispatch = useDispatch()

    function onSelectChange(e) {
      dispatch(sort(e.target.value))  
    }


  function handleFilterDiets(e){
    dispatch(filterRecipesByDiets(e.target.value))
  }

    return (
        <div>
          <select name="select" onChange={onSelectChange}>
            <option value={ASCENDENTE}>ascendente</option>
            <option value={DESCENDENTE}>descendente</option>            
          </select> 

          <span>Filter By Diet: </span>
            <select className='filter-select' onChange={(e) => handleFilterDiets(e)}>
              <option default value=''>Select a Diet</option>
                <option value='Gluten free'>Gluten Free</option>
                <option value='Dairy Free'>Ketogenic</option>
                <option value='Vegetarian'>Vegetarian</option>
                <option value='Lacto Vegetarian'>Lacto-Vegetarian</option>
                <option value='Ovo Vegetarian'>Ovo-Vegetarian</option>
                <option value='Vegan'>Vegan</option>
                <option value='Pescatarian'>Pescetarian</option>
                <option value='Paleolithic'>Paleo</option>
                <option value='Primal'>Primal</option>
                <option value='Whole 30'>Whole 30</option>;
            </select>      
        </div>
    );
  }
  



















  

  /*  function orderedFunction(e) {
        if (e.target.value === "AZ") {
          dispatch(orderAZ());
        } else if (e.target.value === "ZA") {
          dispatch(orderZA());
        } else if (e.target.value === "ScoreUp") {
          dispatch(orderScoreUp());
        } else if (e.target.value === "HealthUp") {
          dispatch(orderHealthUp());
        } else if (e.target.value === "HealthDown") {
          dispatch(orderHealthDown());
        } else {
          dispatch(orderScoreDown());
        }
      } */


  /*   return (
        <div>
          <select name="select" onChange={(e) => orderedFunction(e)}>
            <option value={ASCENDENTE}>ascendente</option>
            <option value={DESCENDENTE}>descendente</option>
            
          </select> */
         
          /* <select name="select" onChange={onSelectChange}>
            <option value={HEALTH_UP}>Health Up</option>
            <option value={HEALTH_DOWN}>Health Down</option>
          </select> */
/* >>>>>>> ba0706546fd98a4334bf5077cc46ca359fcb5810 */





  /* <select name="select" onChange={onSelectChange}>
    <option value={HEALTH_UP}>Health Up</option>
    <option value={HEALTH_DOWN}>Health Down</option>
  </select> */


   /*  <select defaultValue={"ORDER"} className="select" onChange={(e) => orderedFunction(e)}>
        <option value="ORDER" disabled hidden>Order</option>
        <option value="AZ">AZ</option>
        <option value="ZA">ZA</option>
        <option value="ScoreUp">Score Up</option>
        <option value="ScoreDown">Score Down</option>
        <option value="HealthUp">Health Up</option>
        <option value="HealthDown">Health Down</option>
    </select> */