import React from 'react'
import team from '../../../cms/schemas/documents/team'

const Table = () => {
    const teams=[
        {
            name:'Y2 Coding F.C',
            number:1
        },
        {
            name:'Y3 Coding F.C',
            number:2
        },
        {
            name:'L5 Food Processing F.C',
            number:3
        },
        {
            name:'Y2 Coding F.C',
            number:4
        },
        {
            name:'Y2 Coding F.C',
            number:5
        }
    ]
   
  return (
    <div className='w-full h-fit relative '>
        <div className='float-left font-bold text-lg  '>
            <h3>Standings</h3>
        </div>
        <div className='flex float-right p-2 mt-8 gap-[01.5rem]'>
            <span className='text-sm font-bold '>P</span>
            <span className='text-sm font-bold'>W</span>
            <span className='text-sm font-bold'>D</span>
            <span className='text-sm font-bold'>GF</span>
            <span className='text-sm font-bold'>GA</span>
            <span className='text-sm font-bold'>GD</span>
            <span className='text-sm font-bold'>PTS</span>

        </div>
        {teams.map((team)=>{
           return(
            <div className='w-full border-b-2 border-gray  flex  gap-2 mt-5 justify-between'>
            <span className='text-sm font-bold'>{team.number}</span>
            <p className='text-sm font-bold absolute left-8'>{team.name}</p>
            <div className='flex gap-[2.15rem]'>
            <span className='text-sm font-bold text-slate-500'>6</span>
            <span className='text-sm font-bold  text-slate-500'>8</span>
            <span className='text-sm font-bold  text-slate-500'>0</span>
            <span className='text-sm font-bold  text-slate-500'>7</span>
            <span className='text-sm font-bold  text-slate-500'>2</span>
            <span className='text-sm font-bold  text-slate-500'>8</span>
            <span className='text-sm font-bold  text-slate-500'>17</span>

            </div>
            </div>
           )
        })
        }

       

    </div>
  )
}

export default Table