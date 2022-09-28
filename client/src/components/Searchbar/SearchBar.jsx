import { useState } from 'react'
import { searchRecipes } from '../../actions/index.js'
import { useDispatch } from 'react-redux'
import '../Searchbar/SearchBar.css'

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

    return <div className='searchbar'>
            <form onSubmit={onSubmit}>
                <input className='input-search' type='text' onChange={onInputChange} placeholder='What do you want to cook?' value={search}/>
                <input className='button-search' type='submit' value='Search'/>
            </form>
        </div>
}