import './Landing.css';
import React from 'react';
import { Link } from 'react-router-dom';
import landingImage from '../../../src/images/food-1898194_1280.jpg';


export default function Landing() {
    return (
        <React.Fragment>
            <div className='background-container'>
                <div className='left-container'>
                    <div className='title'>
                        <h6 className='welcome'>Welcome to</h6>
                        FoodsterR
                    </div>
                    <div className='phrase'>
                        <p>A person who knows how to cook</p>
                        <p>is extremely nice!</p>
                    </div>
                    <div className='info-and-button'>
                        <Link to='/recipes'>
                            <button className='button-get-in'>Get in</button>
                        </Link>    
                    </div>
                </div>
                <div className='landing-image'>
                    <img src={landingImage} alt='landingImage' />
                </div>
            </div> 
        </React.Fragment>


    )
}