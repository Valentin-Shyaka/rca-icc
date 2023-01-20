import React from 'react'
import { compNavs } from '../../utils/data';

type Props = {
    active: string;
}

const CompNavBar = ({active}: Props) => {
  return (
    <div className=' w-full flex items-center overflow-x-auto'>
        {compNavs.map((nav, i) => {
            const isActive = nav.name === active;
            return(
            <div className={`flex items-center justify-center border-b-2 p-3 ${isActive?'text-orange border-orange':'border-slate-300'} w-full cursor-pointer min-w-fit`}>
                <span className='text-sm'>{nav.name}</span>
            </div>
        )})}
    </div>
  )
}

export default CompNavBar