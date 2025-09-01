import {useState} from 'react';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Navbar from '../layout/Navbar';
//
// FIX THE TOAST ON PAGE SWITCH
//
const RegisterCard = () =>{
    const navigate = useNavigate()
    
    const passwordRules = {
        minLength: 6,
        maxLength: 20,
        hasUppercase: /[A-Z]/,
        hasNumber: /[0-9]/,
        hasSpace: /\s/
    }
    const usernameRules = {
        minLength: 3,
        maxLength: 15,
        hasSpace: /\s/,
    }
    const emailRules = {
        hasSymbol: /[@]/,
        hasSpace: /\s/,
    }

    const [fieldErr, setFieldErr] = useState({ // RENDERS ERR WHEN FALSE
        username: true,
        email: true,
        password: true,
    })
    
    const [newUser, setNewUser] = useState({
        username: "",
        email:"",
        password:""
    })
    
    const handleFieldChange = (e:any) => {
        const {name, value} = e.target
        setNewUser(prev => ({...prev, [name]:value}))
    }

    const verifyInput = ():boolean => {
        if (usernameRules.hasSpace.test(newUser.username)) {
            setFieldErr(cur => ({...cur, username: false}))
            toast.error("the username must be free from spaces")
            return false
        }
        if (usernameRules.minLength >= newUser.username.length || usernameRules.maxLength <= newUser.username.length ) {
            setFieldErr(cur => ({...cur, username: false}))
            toast.error("username must be between 3 - 15 chars long")
            return false
        }
        if (!emailRules.hasSymbol.test(newUser.email)){
            setFieldErr(cur => ({...cur, email: false}))
            toast.error("email must include '@' symbol")
            return false
        }
        if (emailRules.hasSpace.test(newUser.email)) {
            setFieldErr(cur => ({...cur, email: false}))
            toast.error("email must be free of spaces")
            return false
        }
        if (!passwordRules.hasNumber.test(newUser.password)) {
            setFieldErr(cur => ({...cur, password: false}))
            toast.error("password must include a number")
            return false
        }
        if (passwordRules.hasSpace.test(newUser.password)) {
            setFieldErr(cur => ({...cur, password: false}))
            toast.error("password must not include a space")
            return false
        }
        if (!passwordRules.hasUppercase.test(newUser.password)) {
            setFieldErr(cur => ({...cur, password: false}))
            toast.error("password must include an uppercase charachter")
            return false
        }
        if (passwordRules.minLength >= newUser.password.length || passwordRules.maxLength <= newUser.password.length ) {
            setFieldErr(cur => ({...cur, password: false}))
            toast.error("password must be between 6 - 20 chars long")
            return false
        }
        return true
    }

    const handleRegistration = (e?: React.FormEvent) => {
        setFieldErr({
            username: true,
            email: true,
            password: true,
        })
        if (e) {e.preventDefault()}
        const response: boolean = verifyInput()
        if (!response) return
        console.log('yay')
    }

    return(
    <>
        <Navbar />
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
                    <div className='flex-row h-[20%] text-6xl font-bold'>Register</div>
                    <div className='flex-row h-[40%]'>
                            <form className='gird grid-rows-4' onSubmit={handleRegistration}>
                            <div className='grid grid-rows-2 mb-10'>
                                <label htmlFor="username" className='text-2xl font-semibold'>Username:</label>
                                <input onChange={(e) => handleFieldChange(e)} value={newUser.username} type="text" name="username" className={fieldErr.username  ? ("pl-2 text-black bg-white rounded-xl border-2 border-slate-200") : ("pl-2 text-black bg-white rounded-xl border-2 border-red-400")}/>
                            </div>
                            <div className='grid grid-rows-2 mb-10'>
                                <label htmlFor="email" className='text-2xl font-semibold'>Email:</label>
                                <input onChange={(e) => handleFieldChange(e)} value={newUser.email} type="text" name="email" className={fieldErr.email  ? ("pl-2 text-black bg-white rounded-xl border-2 border-slate-200") : ("pl-2 text-black bg-white rounded-xl border-2 border-red-400")}/>
                            </div>
                            <div className='grid grid-rows-2 mb-10'>
                                <label htmlFor="password" className='text-2xl font-semibold'>Password:</label>
                                <input onChange={(e) => handleFieldChange(e)} value={newUser.password} type="password" name="password" className={fieldErr.password  ? ("pl-2 text-black bg-white rounded-xl border-2 border-slate-200") : ("pl-2 text-black bg-white rounded-xl border-2 border-red-400")}/>
                            </div>
                            <div className='grid grid-cols-2 grid-rows-1 text-xl font-semibold gap-10'>
                                <Button
                                    variant='primary'
                                    className='py-3 rounded-2xl'
                                    type='submit'
                                >
                                    Register
                                </Button>
                                <Button
                                    variant='secondary'
                                    className='bg-white py-3 rounded-2xl hover:text-slate-800'
                                    type='button'
                                    onClick={()=> navigate('/login')}
                                >
                                    Login
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </>
    )
}

export default RegisterCard