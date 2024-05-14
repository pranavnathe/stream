import React from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../../slices/authSlice'
import { Button } from '../index'
import authService from '../../services/auth'
import { useNavigate } from 'react-router-dom'

function LogoutButton() {
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
            className="rounded-lg hover:border-red1 hover:dark:border-red1 hover:text-red1 hover:dark:text-red1"
            onClick={logoutHandeler}
        >
            Logout
        </Button>
    )
}

export default LogoutButton