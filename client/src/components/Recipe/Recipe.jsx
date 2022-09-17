export default function Recipe({title, image, diets}) {
    return (     

        <div>
            
            <h3>
                {title}
            </h3>
            <img src={image} alt='imagen'/>
            <h5>{diets}</h5>
        </div>

    )
    
}