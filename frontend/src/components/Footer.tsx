import { useNavigate } from "react-router-dom"
  
const Footer = () =>{
    const navigate = useNavigate()
    return (
    <>
        <div className="bg-black text-white items-center max-w-4xl lg:mx-auto md:mx-20 rounded-t-2xl px-20 pb-5 pt-15">
            <div className="
            grid
            grid-cols-1 grid-rows-3
            md:grid-cols-3 md:grid-rows-1
            ">
                <div className="flex flex-col items-center justify-start">
                    <h3 className="text-xl underline">More product info</h3>
                    <ul className="">
                        <li onClick={()=>navigate('/about')} className="hover:cursor-pointer">About page</li> {/* MAKE THE ABOUT PAGE!!! */}
                        <li onClick={()=>navigate('/')} className="hover:cursor-pointer">Ask a question </li> {/* ADD EMAIL FORM THING!!! */}
                    </ul>
                </div>
                <div className="flex flex-col items-center justify-start">
                    <h3 className="text-xl underline">About the developer</h3>
                    <ul>
                        <li onClick={()=>navigate('/')} className="hover:cursor-pointer">A bit about myself!</li> {/* ADD MY INFO!!! */}
                    </ul>
                </div>
                <div className="flex flex-col items-center justify-start">
                    <h3 className="text-xl underline">Quick Nav</h3>
                    <ul>
                        <li onClick={()=>navigate('/')} className="hover:cursor-pointer">Home</li>
                        <li onClick={()=>navigate('/about')} className="hover:cursor-pointer">About</li> {/* MAKE THE ABOUT PAGE!!! */}
                        <li onClick={()=>navigate('/register')} className="hover:cursor-pointer">Sign up</li>
                        <li onClick={()=>navigate('/login')} className="hover:cursor-pointer">Login</li>
                    </ul>
                </div>
            </div>
        </div>
    </>
    )
}


export default Footer