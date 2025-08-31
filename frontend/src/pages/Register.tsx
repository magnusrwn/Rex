// import {useState} from 'react';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';

const RegisterCard = () =>{
    // const [newUser, setNewUser] = useState({
    //     "username": "",
    //     "email":"",
    //     "password":""
    // })

    const navigate = useNavigate()

    return(
        <div className='min-h-[800px] h-[100vh] w-full flex justify-center items-center mt-5'>
            <div className='
             rounded-2xl
             w-[80%] h-[60%]
             md:w-[500px] md:h-[600px]
             bg-white
             shadow-2xl
             text-black
            '>
                <div className='h-full my-15 mx-10 flex flex-col'>
                    <div className='flex-row h-[30%] text-6xl font-semibold'>Register</div>
                    <div className='flex-row h-[40%]'>
                        <form>
                            {/* FINISH THIS FORM */}
                        </form>
                    </div>
                    <div className='flex-row h-[30%]'>
                        <div className='grid grid-cols-2 grid-rows-1 gap-10 text-xl font-semibold'>
                            <Button
                             variant='primary'
                             className='py-3 rounded-2xl shadow-md'
                             onClick={()=> navigate('/')} // MAKE THIS WORK... I GUESS IT WILL BE A WHILE MAYBE...
                            >Register!
                            </Button>
                            <Button
                             variant='secondary'
                             className='bg-white py-3 rounded-2xl hover:text-slate-800'
                             onClick={()=> navigate('/login')}
                            >Login
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RegisterCard