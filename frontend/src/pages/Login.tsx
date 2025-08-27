// import { useState } from 'react';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';
// import Toast from '../components/Toast';


const LoginCard = () => {
    // const [user, setUser] = useState({
    //     "username":"",
    //     "password":""
    // })

    // const handleSubmit = (e)=>{
    //     e.preventDefault();
    //     console.log(user)
    //     // const u = user;
    //     // send to backend, get a response, then handle
    // }

    // const handleChange = (e) =>{
    //     const name = e.target.name
    //     const value = e.target.value

    //     setUser({...user, [name]:value})
    // }

    const navigate = useNavigate()

    return(
        <div className='h-[80vh] flex justify-center items-center font-mono text-gray-600'>
            <div className='h-[50vh] w-[40vh] border-2 shadow-xl border-gray-200'>
                <div className='ml-1 mt-16'>
                    <h1 className='mt-2 mb-8 ml-4 text-5xl underline underline-offset-6' >Login.</h1>
                </div>
                <div className='mx-5 text-xl h-fit'>
                    <form>
                        <div className='pb-5'>
                            <label htmlFor='username' className=''>Username: </label>
                            <input type='text' name='username' className='border-1 px-2 w-[100%]'></input>
                        </div>
                        <div className='pb-5'>
                            <label htmlFor='password' className=''>Password: </label>
                            <input type='password' name='password' className='border-1 px-2 w-[100%]'></input>
                        </div>
                        <div className='flex flex-row gap-[10%] mt-8 w-full'>
                            <Button className='px-4 w-[45%] py-1 text-2xl' type='submit' variant='primary'>Login</Button>
                            <Button className='px-4 w-[45%] py-1 text-2xl' onClick={() =>{navigate('/register')}} variant='secondary'>Register</Button> {/* FIGURE ONCLICK FOR THIS */ }
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default LoginCard
