import '../Recipe/Recipe.css'

export default function Recipe({title, image, diets}) {
    return (
        <div className='recipe-card'>
            <img className='recipe-image' src={image} alt='imagen'/>
            <h3 className='recipe-title'>{title}</h3>
            <h6 classNAme='recipe-diets'>Belongs to the diets: {diets + '  '}</h6>
           {/*  { diets?.map((d) => <h5> {d} </h5> )}   */}           {/*  <h4>{diets}</h4> */}
           {/*  {console.log(diets)} */}
            
        </div>
    )
}