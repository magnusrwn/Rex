import { useNavigate } from "react-router-dom"

const AuthLanding = ({}) => {
    const navigate = useNavigate()
    return (
        <>
        <div className='flex justify-center mt-5'>
            <p onClick={()=> navigate('/')} className='w-fit font-serif text-slate-600 bg-slate-50 px-2 py-1 rounded-xl hover:cursor-pointer'>Fulfilled</p>
        </div>
        <div className="flex flex-col mx-2 h-[80vh] justify-center items-center gap-5">
            <div className="font-semibold text-4xl text-slate-600">Verifying Email</div>
            <div className="text-md text-slate-600">Redirecting soon...</div>
        </div>
        </>
    )
}

export default AuthLanding