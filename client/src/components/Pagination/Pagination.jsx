import React from 'react';
import '../Pagination/Pagination.css'

const Pagination = ({ paginate, recipesPerPage, totalNumberOfRecipes }) => {
    const numberOfPage = []  ; console.log('numero de paginas', numberOfPage )
    
    let totalDivNine = Math.ceil(totalNumberOfRecipes / recipesPerPage)
    console.log('total dividido 9', totalDivNine )
    for (let i = 1; i <= totalDivNine; i++) {
        numberOfPage.push(i)  ; console.log('numero de paginas', numberOfPage )
    }
    return <div>
                <nav>
                    <ul className='ul-pagination'>
                        {numberOfPage && numberOfPage.map(number =>
                        (
                            <li className='each-number' key={number} >
                                <p className='p-pagination' onClick={() => paginate(number)}>{number}</p>
                            </li>
                        )
                        )}
                    </ul>
                </nav>
            </div>                
        };
export default Pagination;

