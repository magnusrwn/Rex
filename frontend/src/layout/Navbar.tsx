// import { NavLink } from "react-router-dom"
// import Button from "../components/Button"


// const Navbar = () => {
//     return (
//         <>
//         {/* <Button type="button" variant='primary'>primary</Button>
//         <Button type="button" variant='secondary'>secondary</Button>
//         <Button type="button" variant='negative' className="">negative</Button> */}
//         <div className="flex-row  bg-green-300 h-[4vh] gap-5">
//             <div className="flex flex-1">
//                 logo
//             </div>
//             <div className="flex flex-1 justify-center5">
//                 <NavLink to='/'>Home</NavLink>
//                 <NavLink to='/login'>Login</NavLink>
//                 <NavLink to='/about'>About</NavLink>
//                 <NavLink to='/register'>Register</NavLink>
//             </div>
//         </div>
//         </>
//     )
// }

// export default Navbar
import CardNav from './NavbarConfig'
// import logo from './logo.svg';

const Navbar = () => {
  const items = [
    {
        label: "About",
        bgColor: "#0D0716",
        textColor: "#fff",
        links: [
        { label: "Company", ariaLabel: "About Company", href: "/company" },
        { label: "Careers", ariaLabel: "About Careers", href: "/careers" }
        ]
    },
    {
        label: "Projects", 
        bgColor: "#170D27",
        textColor: "#fff",
        links: [
        { label: "Featured", ariaLabel: "Featured Projects", href: "/featured" },
        { label: "Case Studies", ariaLabel: "Project Case Studies", href: "/case-studies" }
        ]
    },
    // {
    //     label: "Contact",
    //     bgColor: "#271E37", 
    //     textColor: "#fff",
    //     links: [
    //     { label: "Email", ariaLabel: "Email us", href: "mailto:info@example.com" },
    //     { label: "Twitter", ariaLabel: "Twitter", href: "https://twitter.com/example" },
    //     { label: "LinkedIn", ariaLabel: "LinkedIn", href: "https://linkedin.com/company/example" }
    //     ]
    // }
    ];

  return (
    <CardNav
      logo="rah"
      logoAlt="Company Logo"
      items={items}
      baseColor="#fff"
      menuColor="#000"
      buttonBgColor="#111"
      buttonTextColor="#fff"
      ease="power3.out"
    />
  );
};

export default Navbar