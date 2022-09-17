import { useState } from 'react'
import { searchRecipes } from '../../actions/index.js'
import { useDispatch } from 'react-redux'

export default function Searchbar() {

    const [search, setSearch] = useState('')
    let dispatch = useDispatch()
    function onSubmit(e) {
        e.preventDefault();
        dispatch(searchRecipes(search))
    }

    function onInputChange(e) {
        e.preventDefault();
        setSearch(e.target.value)
    }

    return <div>
        <form onSubmit={onSubmit}>
            <input type='text' onChange={onInputChange} placeholder='Search' value={search}/>
            <input type='submit' value='Search'/>
        </form>
    </div>
}