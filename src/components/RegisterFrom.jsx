import React, { useEffect, useState } from "react"
import { Button, Input, Uploader } from "./index"
import authService from "../services/auth"
import { login, logout } from "../slices/authSlice"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { toast } from "react-toastify"

export const RegisterFrom = () => {
    const [fullName, setFullName] = useState("")
    const [userName, setUserName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [checkUsername, setCheckUsername] = useState(false)
    const [avatar, setAvatar] = useState(null)
    const [coverImage, setCoverImage] = useState(null)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    // console.log(typeof avatar, avatar);
    // console.log(typeof coverImage, coverImage);

    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent default form submission behavior

        // Validate input fields
        if (!fullName.trim()) {
            return toast.error("Full name is required");
        }
        if (!userName.trim()) {
            return toast.error("Username is required");
        }
        if (!email.trim()) {
            return toast.error("Email is required");
        }
        const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
        if (!gmailRegex.test(email.toLowerCase())) {
            return toast.error("Enter a valid Gmail address");
        }
        if (!password.trim()) {
            return toast.error("Password is required");
        }
        if (!avatar) {
            return toast.error("Avatar is required");
        }
    
        // Construct form data object
        const formData = new FormData();
        formData.append("fullName", fullName);
        formData.append("username", userName);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("avatar", avatar);
        formData.append("coverImage", coverImage);

        const toastId = toast.loading("Creating new Account..." , {className:"border-2"})
        try {
            await authService.register(formData)
            .then((userData) => {
                if (userData) {
                    toast.update(toastId, { render: `Welcome ${userData.data.user.username}`, type: "success", isLoading: false, autoClose: 2000 });
                    const user = userData.data.user
                    dispatch(login({userData: user}))
                } else {
                    dispatch(logout())
                }
            })
            .then(() => {
                navigate("/home");
                // window.location.reload(); // Reload the page
            })
        } catch (error) {
            toast.update(toastId, { render: error, type: "error", isLoading: false, autoClose: 2000 });
            console.error("Login failed:", error);
        }
    };

    const [isPassword, setIsPassword] = useState(true)
    const passwordToggle = () => setIsPassword(!isPassword)

    useEffect(() => {
        authService.checkUsername({ username: userName.trim() })
        .then((response) => {
            setCheckUsername(response.data.usernameMatched)
        })
        .catch((error) => toast.error(error))
    }, [userName])

    return (
        <>
            <div className="grid m-4 sm:grid-cols-1 max-w-[480px] text-textBlack dark:text-white">
                <div className="w-full p-5 gap-3 flex flex-col justify-center items-center sm:justify-start sm:gap-6 sm:px-10" >
                    <h2 className="font-bold text-2xl p-3">New to Stream+</h2>
                    <p className="pb-3">Easily create new account to enjoy all features</p>
                    <Input 
                    value={fullName} 
                    onChange={(e) => setFullName(e.target.value)} 
                    label="Full name" 
                    placeholder="Full Name"/>
                    <div className="w-full">
                        <Input 
                        value={userName} 
                        onChange={(e) => setUserName(e.target.value)} label="Username" 
                        placeholder="UserName"/>
                        {
                        userName.trim().length > 0 &&
                        <>
                            {
                            checkUsername ?
                            <p className="mt-2 text-red-500">username is already taken</p>
                            :
                            <p className="mt-2 text-green-500">username is available</p>
                            }
                        </>
                        }
                    </div>
                    <Input 
                    value={email} 
                    onChange={(e) => setEmail((e.target.value).toLowerCase())} 
                    label="Email" 
                    placeholder="Email"/>
                    <div className="flex items-center w-full relative">
                        <Input 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        label="Password"
                        placeholder="Password" 
                        type={isPassword ? "password" : "text"}
                        />
                        {password.length > 0 && 
                            <span 
                            className="absolute cursor-pointer text-xs bottom-2.5 right-3 text-textBlack border rounded-md bg-white"
                            onClick={passwordToggle}
                            ><p className="px-1">
                                {isPassword ? "Show" : "Hide"}
                            </p>
                            </span>
                        }
                    </div>
                </div>
                <div className=" w-full p-5 flex flex-col justify-center items-center gap-3 sm:px-10" >
                    <Uploader 
                    value={avatar} 
                    onChange={(file) => {
                        // console.log(file); // Check if file data is received in the Uploader component
                        setAvatar(file); // Update avatar state with the file data
                    }} 
                    name="Avatar"
                    maxImageSize={1}
                    />
                    <Uploader 
                    value={coverImage} 
                    onChange={(file) => {
                        // console.log(file); // Check if file data is received in the Uploader component
                        setCoverImage(file); // Update coverImage state with the file data
                    }} 
                    name="Cover Image"
                    />
                    <Button 
                    onClick={handleSubmit} // Handle form submission
                    className="w-full h-12 rounded-lg bg-loginBlue text-white dark:bg-loginBlueDark dark:text-white hover:text-base hover:font-bold ease-in-out"
                    >Create Account</Button>
                </div>
            </div>
        </>
    )
}