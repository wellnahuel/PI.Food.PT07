//import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {sort} from '../../actions';
import { ASCENDENTE, DESCENDENTE,/*  HEALTH_UP, HEALTH_DOWN */} from "../../constantes/sort"

export default function Order() {
    const dispatch = useDispatch()

    function onSelectChange(e) {
      dispatch(sort(e.target.value))  
    }

    return (
        <div>
          <select name="select" onChange={onSelectChange}>
            <option value={ASCENDENTE}>ascendente</option>
            <option value={DESCENDENTE}>descendente</option>            
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