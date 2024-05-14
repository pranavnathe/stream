import React, { useState } from "react"
import { Button, Input } from "./index"

export const UpdatePasswordModel = ({ isOpen, onClose, onUpdate }) => {

    const [oldPassword, setOldPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [isPassword, setIsPassword] = useState(true)
    const passwordToggle = () => setIsPassword(!isPassword)

    const handleUpdate = (event) => {
        event.preventDefault(); // Prevent default form submission behavior
        onUpdate({oldPassword, newPassword});
    };

    const handleCancel = (event) => {
        event.preventDefault(); // Prevent default form submission behavior
        onClose();
    };

    return (
        <div
        className={`fixed inset-0 flex items-center justify-center z-40 backdrop-blur-sm ${
            isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        } transition-opacity duration-300`}
        >
            <div className="flex flex-col justify-center items-center gap-4 max-w-[480px] rounded-xl p-6 bg-slate-300 dark:bg-gray-800 border-2">
                <h2 className="font-bold text-2xl p-3">Update Password</h2>
                    <Input 
                    value={oldPassword} 
                    onChange={(e) => setOldPassword(e.target.value)} 
                    label="Old Password"
                    placeholder="Enter your old password" 
                    type={isPassword ? "password" : "text"}
                    />
                <div className="flex items-center w-full relative">
                    <Input 
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)} 
                    label="New Password"
                    placeholder="Enter your new password" 
                    type={isPassword ? "password" : "text"}
                    />
                    {newPassword.length > 0 && 
                        <span 
                        className="absolute cursor-pointer text-xs bottom-2.5 right-3 text-textBlack border rounded-md bg-white"
                        onClick={passwordToggle}
                        ><p className="px-1">
                            {isPassword ? "Show" : "Hide"}
                        </p>
                        </span>
                    }
                </div>
                <div className="flex justify-between items-center gap-5 w-full pt-2">
                    <Button 
                    onClick={handleCancel} 
                    className="w-full rounded-xl text-red-500 border-red-500 hover:bg-slate-200 dark:hover:border-red-400 dark:border-red-500 dark:text-red-500"
                    >
                        Cancel
                    </Button>
                    <Button 
                    onClick={handleUpdate}
                    className="w-full rounded-xl"
                    >
                        Change
                    </Button>
                </div>
            </div>
        </div>
    )
}