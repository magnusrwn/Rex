// import { useState } from 'react';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';
// import Toast from '../components/Toast';


const LoginCard = () => {
    const navigate = useNavigate()

    return(
        <div className='min-h-[800px] h-[100vh] w-full flex justify-center items-center mt-5'>
            <div className='
             rounded-2xl
             w-[80%] h-[60%]
             md:w-[500px] md:h-[600px]
             bg-black
             shadow-2xl
             text-white
            '>
                <div className='h-full my-15 mx-10 flex flex-col'>
                    <div className='flex-row h-[30%] text-6xl font-semibold'>Login</div>
                    <div className='flex-row h-[40%]'>
                        <form>
                            {/* FINISH THIS FORM */}
                        </form>
                    </div>
                    <div className='flex-row h-[30%]'>
                        <div className='grid grid-cols-2 grid-rows-1 gap-10 text-xl font-semibold'>
                            <Button
                             variant='primary'
                             className='py-3 rounded-2xl'
                             onClick={()=> navigate('/')} // MAKE THIS WORK... I GUESS IT WILL BE A WHILE MAYBE...
                            >Login
                            </Button>
                            <Button
                             variant='secondary'
                             className='bg-white py-3 rounded-2xl hover:text-slate-800'
                             onClick={()=> navigate('/register')}
                            >Register
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginCard
