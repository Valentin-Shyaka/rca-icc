import React from 'react'
import { useApp } from '../../../contexts/AppProvider'
import MatchCard from '../../../components/MatchCard'
import GamingLayout from '../../../layouts/GamingLayout'
const index = () => {
    const { matches}= useApp()
    const basketballMatchNS= matches?.filter(
        (match)=>match?.status==="NS" && match?.category==="basketball"
    )
  return (
    <GamingLayout>
    <div>
        { 
            basketballMatchNS?.map((match)=>(
                    <MatchCard key={match._id} {...match}/>
            ))
        }
        {
            basketballMatchNS?.length==0 &&(
                <h1 className='font-bold text-center align-middle'>There's no more matches to predict for Basketball</h1>
            )
        }
    </div>
    </GamingLayout>
  )
}

export default index