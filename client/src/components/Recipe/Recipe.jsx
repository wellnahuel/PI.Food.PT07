import '../Recipe/Recipe.css'

export default function Recipe({name, image, diets}) {
    const dietString = (diets) => {
        if (typeof diets[0] === 'string') {
            return diets
        } 
    const str = diets.map(el => el.name) 
    return str;



    }
    
    return (
        <div className='recipe-card'>
            <img className='recipe-image' src={image} alt='imagen'/>
            <h3 className='recipe-title'>{name}</h3>
            <h6 className='recipe-diets'>Belongs to the diets: {'  ' + dietString(diets) + '  '}</h6>
        </div>
    )
}