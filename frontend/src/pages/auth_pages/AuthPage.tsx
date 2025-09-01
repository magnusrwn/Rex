import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { tryCatch } from "../../utils"
import AuthLanding from './AuthLanding'
import AuthRedirect from './AuthRedirect'


// Extract the link
// Send the request to the endpoint
// Handle response
// Redirect after 5 seconds to home/ dashboard

const AuthLinkPage = () => {
    const { token } = useParams()
    const [authStatus, setAuthStatus] = useState<"PROCESSING" | "REDIRECTING" | "FAILED">()
    const [username, setUsername] = useState('')
    // send request to backend to auth
    useEffect(() => {
        const checkToken = async () =>{
            
        }
        
        // processes
        setAuthStatus("PROCESSING")
    })

    return (
        <>
            {authStatus === "PROCESSING" ? (
                <AuthLanding />
            ) : authStatus === "FAILED" ? (
                <AuthError />
            ) : (
                <AuthRedirect username={username} />
            )}
        </>
    )
}

export default AuthLinkPage