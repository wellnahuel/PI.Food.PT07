export default function Recipe({title, image, id}) {
    return (     

        <div>
            <h5>{id}</h5>
            <h3>
                {title}
            </h3>
            <img src={image} alt='imagen'/>
        </div>

    )
    
}