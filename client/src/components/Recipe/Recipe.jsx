export default function Recipe({title, image, diets}) {
    return (
        <div>
            <h3>
                {title}
            </h3>
            <img src={image} alt='imagen'/>
           {/*  { diets?.map((d) => <h5> {d} </h5> )}   */}           {/*  <h4>{diets}</h4> */}
            {console.log(diets)}
            
        </div>
    )
}