import { useNavigate } from "react-router-dom"
import { useEffect } from "react"

interface AuthErrorProps {
    email: string
}

const AuthError = ({ email }: AuthErrorProps) => {
    const navigate = useNavigate()

    const handleRedirect = () => {
        setTimeout(() => {
            navigate('/')
        }, 5000)
    }

    useEffect(() => {
        handleRedirect()
    }, [])
    return (
    <>
        <div className='flex justify-center mt-5'>
            <p onClick={()=> navigate('/')} className='w-fit font-serif text-slate-600 bg-slate-50 px-2 py-1 rounded-xl hover:cursor-pointer'>Fulfilled</p>
        </div>
        <div className="flex justify-center items-center flex-col gap-10 h-[100vh] mx-25">
            <div className="flex-row md:text-6xl text-4xl bg-slate-50 rounded-2xl px-2 py-2 shadow-lg "><span className='font-bold'>Error.</span></div>
            <div className="flex-row md:text-2xl text-md bg-black text-white font-semibold rounded-2xl px-2 py-2 shadow-lg">Your Email: <span className='underline underline-offset-4 font-bold'>{email}</span> failed verification.</div>
            <div className='text-slate-600'>This is almost definitely an error on our side. Please report it, and we will fix it asap.</div>
            <div className='text-slate-600'>Shortly you will be redirected. However, in the unlikley event of error, click <span onClick={() => navigate('/')} className='flex-row hover:cursor-pointer font-semibold'>here</span> to be returned to the home page</div>
        </div>        
    </>
    )
}

export default AuthError