import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { tryCatch } from "../../utils"
import AuthLanding from './AuthLanding'
import AuthRedirect from './AuthRedirect'
import AuthError from "./AuthError"
import axios from "axios"
import { toast } from "react-toastify"

// Extract the link
// Send the request to the endpoint
// Handle response
// Redirect after 5 seconds to home/ dashboard

interface ResponseRules {
    status_code: number
    message?: string
}

const AuthLinkPage = () => {
    // extracting token from url
    const { token, email } = useParams()
    // Grabbing backedn base url
    const backendBaseUrl = import.meta.env.VITE_BACKEND_BASE_URL

    const [authStatus, setAuthStatus] = useState<"PROCESSING" | "REDIRECTING" | "FAILED">()
    // send request to backend to auth
    useEffect(() => {
        
        // processes
        const mainProcess = async () => {
            // sends the email verification
            const verifyEmail = async ():Promise<ResponseRules> => {
                const response = await tryCatch(axios.post(`${backendBaseUrl}/finish-email-auth`, {
                    token: token,
                    email: email
                }))
                if (response["error"]) {
                    let errMsg = response["error"]
                    console.log(errMsg)
                    return {"status_code": 500, "message":"unable to verify email, check console logs to see error"}
                }
                return {"status_code": 200}
            }
            
            // calls/ handles responses from function defined above
            const response = await verifyEmail()
            if (response["status_code"] !== 200) {
                let msg = response["message"]
                toast.error(msg)
                setAuthStatus("FAILED")
                // exit the process
                return
            }
            toast.success("email is now verified!")
            setAuthStatus("REDIRECTING")
        }
        
        setAuthStatus("PROCESSING")
        mainProcess()
    }, [])
    const handleRedirect = () => {
        setTimeout(() => {
            <AuthRedirect email={email ?? "An err occured... email not passed/ found"} /> // using condition to ensure email is present
        }, 5000)
            
    }
    return (
        <>
            {authStatus === "PROCESSING" ? (
                <AuthLanding />
            ) : authStatus === "FAILED" ? (
                <AuthError email={email ?? "No email passed"} />
            ) : (
                () => {handleRedirect}
            )}
        </>
    )
}

export default AuthLinkPage