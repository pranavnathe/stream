import React, { useEffect, useState } from 'react'
import { Container, Spinner} from '../components/'
import subscriptionService from '../services/subscription'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

function Subscription() {

    const [subscriptionData, setSubscriptionData] = useState([])
    const [loading, setLoading] = useState(true)
    const userData = useSelector((state) => state.auth.userData)
    const navigate = useNavigate()

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
        subscriptionService.userSubscribedChannels(userData._id)
        .then((response) => {
            setSubscriptionData(response.data)
        })
        .catch((error) => toast.error(error))
        .finally(() => setLoading(false))
    }, [])

    return (
        <div className='dark:text-white'>
            {
            loading ? 
            <Spinner fullScreen />
            :
            <Container>
                <h2 className='flex justify-center items-center text-xl font-bold mt-6'>Subscriptions</h2>
                {
                subscriptionData.length > 0 ?
                <div className='mx-2 my-4 w-full flex flex-col gap-4 justify-center items-center'>
                    {subscriptionData.map((data) => (
                        <div 
                        key={data._id}
                        className='w-full flex flex-col justify-center items-center'
                        >
                            <div 
                            onClick={() => navigate(`/channel/${data.channel.username}`)}
                            className='w-full max-w-80 flex justify-between items-center hover:bg-slate-300 dark:hover:bg-slate-700 px-4 py-2 rounded-xl cursor-pointer'
                            >
                                <img 
                                src={data.channel.avatar} 
                                className='h-12 w-12 rounded-full cursor-pointer' 
                                alt={`profile photo of ${data.channel.usermane}`} 
                                />
                                <p className='text-base'>{data.channel.username}</p>
                            </div>
                        </div>
                    ))}
                </div>
                :
                <div className='w-full min-h-[30vh] flex justify-center items-center text-2xl font-bold mx-3 my-3'>
                    Not Subscribed to any Channel!
                </div>
                }
            </Container>
            }
        </div>
    )
}

export default Subscription