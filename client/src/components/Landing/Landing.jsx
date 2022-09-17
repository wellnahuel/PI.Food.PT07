import React from 'react';
import { Link } from 'react-router-dom';

export default function Landing() {
    return (
        <React.Fragment>
            <div className='background-container'>
                <div className='title-container'>

                </div>
                <div className='info-and-button'>
                    <Link to='/recipes'>
                        <button>
                            Ingresar
                        </button>
                    </Link>    
                </div>
                <div className='landing-image'>

                </div>
            </div> 
        </React.Fragment>


    )
}