import { NavLink } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css';

export default function NavBar(){
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <NavLink to="/" className="navbar-brand text-light m-2">Quizzz</NavLink>
            <ul className="navbar-nav">
                <li className="nav-item">
                    <NavLink to="/create" className="nav-link">Create quiz</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/search" className="nav-link">Search</NavLink>
                </li>
            </ul>
        </nav>
    )
}
