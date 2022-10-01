import { Link } from "react-router-dom";
import React from 'react';
import '../Pagination/Pagination.css'

const Pagination = ({ paginate, recipesPerPage, totalNumberOfRecipes}) => {   
    const numberOfPage = []
    let totalDivNine = Math.ceil(totalNumberOfRecipes/recipesPerPage)
    for(let i =1 ; i <= totalDivNine; i++) {
        numberOfPage.push(i)
    }
    return  <div>
                    <nav>
                        <ul className='ul-pagination'>
                        {numberOfPage && numberOfPage.map(number => 
                            (                
                                <li className='each-number' key={number} >
                                    <p className='p-pagination' onClick = {() => paginate(number)}>{number}</p>
                                </li>                
                            ) 
                        )}                
                        </ul>            
                    </nav>
    </div>
    ;
};
export default Pagination;