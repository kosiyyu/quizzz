import { NavLink } from "react-router-dom"
export default function NavBar(){
    return (
        <nav className="nav">
            <NavLink to="/" className="site-title">Home</NavLink>
            <ul>
                <NavLink to="/create">Create Quiz</NavLink>
                <NavLink to="/solve">Solve Quiz</NavLink>
            </ul>
        </nav>
    )
}