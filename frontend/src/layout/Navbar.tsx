import { NavLink } from "react-router-dom"
import Button from "../components/Button"


const Navbar = () => {
    return (
        <>
        <Button type="button" variant='primary'>primary</Button>
        <Button type="button" variant='secondary'>secondary</Button>
        <Button type="button" variant='negative' className="">negative</Button>
        <NavLink to='/' className='bg-amber-950'>Home</NavLink>
        <NavLink to='/login'>Login</NavLink>
        <NavLink to='/about'>About</NavLink>
        </>
    )
}

export default Navbar
