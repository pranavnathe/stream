import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { login, logout } from "./slices/authSlice" 
import authService from "./services/auth"
import { ErrorModel, Footer, Header, MobileNavBar } from "./components"
import { Outlet } from "react-router-dom"
import { Spinner } from "./components"
import { ToastContainer, Slide, Zoom, Flip, Bounce, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import healthcheckService from "./services/healthcheck"
import { addMessage, clearMessage } from "./slices/serverErrorSlice"

function App() {
  const themeMode = useSelector((state) => state.theme.themeMode)
  const serverErrorMessage = useSelector((state) => state.serverError.errorMessage)
  const [serverErrorModel, SetServerErrorModel] = useState(false)
  const [loading ,setLoading] = useState(true)
  const dispatch = useDispatch()
  const restartTime = 30000 // in milliseconds

  const fetchCurrentUser = () => {
    authService.getCurrentUser()
    .then((userData) => {
      if (userData) {
        const user = userData.data
        // console.log(user);
        dispatch(login({userData: user}))
      } else {
        dispatch(logout())
      }
    })
    .catch((error) => console.log(error))
    .finally(() => setLoading(false))
  }

  const checkServerStatus = () => {
    dispatch(clearMessage())
    healthcheckService.getHealthCheckStatus()
    .then((response) => {
      // console.log(response);
      dispatch(clearMessage())
      SetServerErrorModel(false)
    })
    .catch((error) => {
      // console.log("checkServerStatus", error);
      SetServerErrorModel(true)
      dispatch(addMessage({message: "Server Connection Error"}))
      setTimeout(() => {
        // window.location.reload() // Reload the page
      }, restartTime);
    })
  }

  useEffect(() => {
    fetchCurrentUser()
    checkServerStatus()
  }, [])

  return !loading ? (
    <>
      <Header />
        <Outlet/>
        <ToastContainer
          position="top-center"
          autoClose={3000}
          limit={5}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme={themeMode}
          transition={Slide}
          stacked
          closeButton={true}
        />
        <MobileNavBar/>
        <ErrorModel 
        isOpen={serverErrorModel}
        time={restartTime}
        message={serverErrorMessage}
        onClose={() => SetServerErrorModel(false)}
        />
      <Footer />
    </>
  ) : <Spinner fullScreen/>
}

export default App
