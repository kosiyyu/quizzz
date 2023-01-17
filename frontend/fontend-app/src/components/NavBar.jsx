import { NavLink } from "react-router-dom"
export default function NavBar(){
    return (
        <nav className="nav">
            <NavLink to="/" className="site-title">Search</NavLink>
            <ul>
                <NavLink to="/create">Create Quiz</NavLink>
            </ul>
        </nav>
    )
}