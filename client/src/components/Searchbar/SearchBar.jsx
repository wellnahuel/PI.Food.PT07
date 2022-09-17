import { useState } from 'react'

export default function Searchbar() {

    const [search, setSearch] = useState('')

    function onSubmit(e) {
        e.preventDefault();
    }

    function onInputChange(e) {
        setSearch(e.target.value)
    }

    return <div>
        <form onSubmit={onSubmit}>
            <input type='text' onChange={onInputChange} value={search}/>
            <input type='submit' value='Search'/>
        </form>
    </div>
}