import { Link } from "react-router-dom";
import './Navbar.css'

export default function Navbar() {
    return <div className='navbar'>
                <div className="nav-left">
                    <Link to='/'>
                        <div>
                            FoodsterR
                        </div>
                    </Link>
                </div>
                <nav className='nav-right'>
                    <ul className="list">
                        <li className="list-item">
                            <Link to="/recipes" >Search Recipes  ||  </Link>
                            <Link to="/create" >Create a Recipe  ||  </Link>
                            <Link to="/about" >About</Link>
                        </li>
                    </ul>
                </nav>
        </div>
}