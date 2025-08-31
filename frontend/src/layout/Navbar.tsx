import CardNav from './NavbarConfig'

const Navbar = () => {
  const items = [
    {
        label: "About",
        bgColor: "#0D0716",
        textColor: "#fff",
        links: [
        { label: "The product", ariaLabel: "About the product page", reDirTo: '/about' },
        { label: "The developer", ariaLabel: "About the developer page", reDirTo: '/' }
        ]
    },
    {
        label: "Quick Navigation", 
        bgColor: "#170D27",
        textColor: "#fff",
        links: [
        { label: "Home", ariaLabel: "Home page", reDirTo: '/' },
        { label: "Register", ariaLabel: "Register page", reDirTo: '/register' },
        { label: "Login", ariaLabel: "Login page", reDirTo: '/login' },
        ]
    },
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