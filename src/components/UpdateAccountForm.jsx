import React, { useState } from "react"
import { Button, Input, UpdatePasswordModel} from "./index"
import authService from "../services/auth"
import { toast } from "react-toastify"
import userService from "../services/user"

export const UpdateAccountForm = ({isOpen, onClose}) => {

    const [fullName, setFullName] = useState("")
    const [email, setEmail] = useState("")
    const [showPasswordModal, setShowPasswordModal] = useState(false)

    const handleSubmit = async () => {
        const toastId = toast.loading("updating..." , {className:"border-2"})
        userService.updateAccount({fullName, email})
        .then((response) => {
            if (response) {
                toast.update(toastId, { render: `${response.message}`, type: "success", isLoading: false, autoClose: 2000 })
            }
        })
        .catch((error) => toast.update(toastId, { render: error, type: "error", isLoading: false, autoClose: 2000 }))
        .finally(() => {
            setTimeout(() => {
                window.location.reload() // Reload the page
            }, 2000);
        })
    };

    const handleCancel = (event) => {
        event.preventDefault(); // Prevent default form submission behavior
        onClose();
    };

    const handlePasswordUpdate = ({oldPassword, newPassword}) => {
        const toastId = toast.loading("updating password..." , {className:"border-2"})
        authService.resetPassword({oldPassword, newPassword})
        .then((response) => {
            if (response) {
                toast.update(toastId, { render: `${response.message}`, type: "success", isLoading: false, autoClose: 2000 })
            }
        })
        .catch((error) => toast.update(toastId, { render: error, type: "error", isLoading: false, autoClose: 2000 }))
        .finally(() => setShowPasswordModal(false))
    }

    return (
        <>
        <div
        className={`fixed inset-0 flex items-center justify-center z-20 backdrop-blur-sm ${
            isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        } transition-opacity duration-300`}
        >
            <div className="grid m-4 sm:grid-cols-1 max-w-[480px] text-textBlack dark:text-white bg-slate-300 dark:bg-gray-800 scroll-smooth shadow-2xl rounded-xl border-2">
                <div className="w-full p-5 gap-3 flex flex-col justify-center items-center sm:justify-start sm:gap-6 sm:px-10" >
                    <h2 className="font-bold text-2xl p-3">Edit Account</h2>
                    <Input 
                    value={fullName} 
                    onChange={(e) => setFullName(e.target.value)} 
                    label="Full name" 
                    required="true"
                    placeholder="Full Name"
                    />
                    <Input 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    label="Email" 
                    placeholder="Email"
                    />
                    <Button
                    onClick={() => setShowPasswordModal(true)}
                    className="w-full rounded-xl text-white dark:text-white"
                    >
                        Change Password
                    </Button>
                    <div className="flex justify-between items-center gap-5 w-full">
                        <Button 
                        onClick={handleCancel} 
                        className="w-full rounded-xl text-red-500 border-red-500 hover:bg-slate-200 dark:hover:border-red-400 dark:border-red-500 dark:text-red-500"
                        >
                            Cancel
                        </Button>
                        <Button 
                        onClick={handleSubmit}
                        className="w-full rounded-xl bg-loginBlue text-white dark:bg-loginBlueDark dark:text-white"
                        >
                            Update
                        </Button>
                    </div>
                </div>
            </div>
            <UpdatePasswordModel
                isOpen={showPasswordModal}
                onClose={() => setShowPasswordModal(false)}
                onUpdate={handlePasswordUpdate}
            />
        </div>
        </>
    )
}