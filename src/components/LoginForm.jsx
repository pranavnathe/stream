import React, { useState } from "react"
import { Button, Input } from "./index"
import authService from "../services/auth"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { login, logout } from "../slices/authSlice" 
import { toast } from "react-toastify"

export const LoginForm = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setloading] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleSubmit = async (event) => {
        setloading(true)
        event.preventDefault();

        // Validate input fields
        if (!email.trim()) {
            setloading(false)
            return toast.error("Email is required");
        }
        if (!password.trim()) {
            setloading(false)
            return toast.error("Password is required");
        }
        const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
        if (!gmailRegex.test(email.toLowerCase())) {
            setloading(false)
            return toast.error("Enter a valid Gmail address");
        }

        try {
            authService.login({email, password})
            .then((userData) => {
                if (userData) {
                    const user = userData.data.user
                    dispatch(login({userData: user}))
                    toast.success(`Welcome ${user.username}`)
                    setloading(false)
                } else {
                    dispatch(logout())
                    setloading(false)
                }
            })
            .then(() => {
                navigate("/home")
                // window.location.reload(); // Reload the page
            })
            .catch((error) => {
                toast.error("invalid credentials")
                setloading(false)
                console.error("login", error);
            })
        } catch (error) {
            setloading(false)
            toast.error(error)
        }
    };

    const [isPassword, setIsPassword] = useState(true)
    const passwordToggle = () => setIsPassword(!isPassword)

    return (
        <>
            <div className="grid m-4 sm:grid-cols-1 max-w-[480px] text-textBlack dark:text-white">
                <div className="w-full p-5 gap-3 flex flex-col justify-center items-center sm:justify-start sm:gap-6 sm:px-10" >
                    <h2 className="font-bold text-2xl p-3">Welcome to Stream+</h2>
                    <p className="pb-3">Already a memeber, easily login</p>
                    <Input 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    label="Email" 
                    placeholder="Email"/>
                    <div className="flex items-center w-full relative pb-4">
                        <Input 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        label="Password"
                        placeholder="Password" 
                        type={isPassword ? "password" : "text"}
                        />
                        {password.length > 0 && 
                            <span 
                            className="absolute cursor-pointer text-xs top-10 right-3 text-textBlack border rounded-md bg-white"
                            onClick={passwordToggle}
                            ><p className="px-1">
                                {isPassword ? "Show" : "Hide"}
                            </p>
                            </span>
                        }
                    </div>
                    <Button 
                    onClick={handleSubmit} // Handle form submission
                    className="w-full h-12 rounded-lg bg-loginBlue text-white dark:bg-loginBlueDark dark:text-white hover:text-base hover:font-bold ease-in-out"
                    >{loading ? "Logging..." : "Login"}</Button>
                </div>
            </div>
        </>
    )
}