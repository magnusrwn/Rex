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
        <div className='h-[80vh] flex justify-center items-center font-mono text-gray-600'>
            <div className='h-[50vh] w-[40vh] border-2 shadow-xl border-gray-200'>
                <div className='ml-1 mt-16'>
                    <h1 className='mt-2 mb-8 ml-4 text-5xl underline underline-offset-6' >Register.</h1>
                </div>
                <div className='mx-5 text-xl h-fit'>
                    <form>
                        <div className='pb-5'>
                            <label htmlFor='email'>Email: </label>
                            <input type='text' name='email' className='border-1 px-2 w-[100%]'></input>
                        </div>
                        <div className='pb-5'>
                            <label htmlFor='username'>Username: </label>
                            <input type='text' name='username' className='border-1 px-2 w-[100%]'></input>
                        </div>
                        <div className='pb-5'>
                            <label htmlFor='password'>Password: </label>
                            <input type='password' name='password' className='border-1 px-2 w-[100%]'></input>
                        </div>
                        <div className='flex flex-row gap-[10%] mt-8 w-full'>
                            <Button className='px-4 w-[45%] py-1 text-2xl' type='submit' variant='primary'>Continue</Button>
                            <Button className='px-4 w-[45%] py-1 text-2xl' onClick={() => {navigate('/login')}} variant='secondary'>Login</Button> {/* FIGURE ONCLICK FOR THIS */ }
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default RegisterCard