import React, { useState } from 'react';
import Button from '../components/Button';
import Toast from '../components/Toast';

interface LoginCardProps {
    cardHeadText: string;
    cardBodyText: string;
}

const LoginCard: React.FC<LoginCardProps> = ({cardHeadText, cardBodyText}) => {
    const [user, setUser] = useState({
        "username":"",
        "password":""
    })

    const handleSubmit = (e)=>{
        e.preventDefault();
        console.log(user)
        // const u = user;
        // send to backend, get a response, then handle
    }

    const handleChange = (e) =>{
        const name = e.target.name
        const value = e.target.value

        setUser({...user, [name]:value})
    }

    // const [message, setMessage] = useState("")
    // const [toastType, setToastType] = useState("")

    return(
        <div className='h-[80vh] flex justify-center items-center'>
            {/* <Toast type="warning" message='yo: gurt' />  THIS IS THE TOAST COMPONENT... CONDITIANOLY RENDER THIS TO TOAST*/} 
            <div className='h-[50vh] w-[40vh] rounded-xl border-2 shadow-xl border-gray-200' onClick={(e) => {
                e.stopPropagation()
                handleChange(e)}}>
                <h1 className='mt-2 ml-4 text-4xl' >{cardHeadText}</h1>
            </div>
        </div>
    )
}

export default LoginCard