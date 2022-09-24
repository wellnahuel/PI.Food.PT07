import { Link } from "react-router-dom";
import React from 'react';
const Pagination = ({ paginate, recipesPerPage, totalNumberOfRecipes}) => {   
    const numberOfPage = []
    let totalDivNine = Math.ceil(totalNumberOfRecipes/recipesPerPage)
    for(let i =1 ; i <= totalDivNine; i++) {
        numberOfPage.push(i)
    }
    return ( <div>
        <nav className="pagination container">
            <ul>
            {numberOfPage && numberOfPage.map(number => (                
                    <li key={number} >
                        <p onClick = {() => paginate(number)}>{number}</p>
                    </li>                
                ) 
            )}                
            </ul>            
        </nav>
    </div>
    );
};
export default Pagination;