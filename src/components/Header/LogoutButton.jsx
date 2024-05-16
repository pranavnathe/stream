import React from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../../slices/authSlice'
import { Button } from '../index'
import authService from '../../services/auth'
import { useNavigate } from 'react-router-dom'

function LogoutButton({className = ""}) {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const logoutHandeler = () => {
        authService.logout()
        .then(() => {
            dispatch(logout())
            navigate("/")
        })
    }

    return (
        <Button
            size = "small"
            className={`rounded-lg hover:border-red-600 hover:dark:border-red-600 hover:text-red-600 hover:dark:text-red-600 ${className}`}
            onClick={logoutHandeler}
        >
            Logout
        </Button>
    )
}

export default LogoutButton