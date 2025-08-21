import { NavLink } from "react-router-dom"
import Button from "../components/Button"


const Navbar = () => {
    return (
        <>
        <Button type="button" onClick={() => alert("you clicked my fattass")}>BUTTON HERE</Button>
        <NavLink to='/' className='bg-amber-950'>Home</NavLink>
        <NavLink to='/login'>Login</NavLink>
        <NavLink to='/about'>About</NavLink>
        </>
    )
}

export default Navbar
