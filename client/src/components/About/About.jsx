import '../About/About.css'
import aboutImage from '../../images/kiddo_cooking.jpg'
import linkedin from '../../images/icon_linkedin.png'
import github from '../../images/icon_github.png'

export default function About() {
    return <div className='about-background-container'>
                <div className='about-main-container'>
                    <h1>About</h1>

                    <div className='about-info'>
                        <p>
                            FoodsterR was developed during the bootcamp at Henry. The goal was to build an App using React JS, Redux, Node JS, Express JS, Sequelize and PostgreSQL. In addition to Spoonacular's Food Api. Connect the concepts learned in the course. Learn best practices. Learn and practice GIT workflow. Use and practice some testing.
                        </p>
                        <img className='about-info-image' src={aboutImage} alt='aboutimage'/>
                    </div>

                    <div className='about-contact'>
                        <h2>Contact Me</h2>
                            <p>My name is Nahuel Cittadino. You can find me on LinkedIn and GitHub.</p>
                        <div className='about-contact-icons'>
                            <a href='https://www.linkedin.com/in/nahuel-cittadino-b386331b2/' target="_blank">
                                <img src={linkedin} alt='Linkedin' />
                            </a>
                            <a href='https://github.com/wellnahuel/' target="_blank">
                                <img src={github} alt='Github' />
                            </a>  
                            
                        </div>
                    </div>


                    <div></div>

                    <div></div>

                </div>


                        
            </div>
}