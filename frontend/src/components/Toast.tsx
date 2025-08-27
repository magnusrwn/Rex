import React, { useEffect } from 'react';
import { toast } from 'react-toastify/unstyled';

interface ToastProps {
    message: string
    type: "success" | "error" | "warning" | "info"
};

const Toast: React.FC<ToastProps> = React.memo(({message, type}) =>{
    useEffect(() => {
        switch (type) {
            case "success":
                toast.success(message)
                break;
            case "error":
                toast.error(message)
                break;
            case "warning":
                toast.warning(message)
                break;
            case "info":
                toast.info(message)
                break;
            default:
                toast(message)
        }
    }, [type, message])
    return null
})

export default Toast
