import { Dialog, Transition } from '@headlessui/react';
import Image from 'next/image';
import { Fragment, useEffect, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';

import { sanityClient } from '../../lib/sanity';
import { Match } from '../../utils/types/types1';
import PredictionDropdown from './PredictionDropdown';
import { useApp } from '@/contexts/AppProvider';
import { fetchMatchByIdQuery } from '../../lib/queries';
import { useSanity } from '@/contexts/SanityProvider';

interface Props {
  isOpen: boolean;
  closeModal: () => void;
  matchid: string
}

const PredictionModal = ({ isOpen, closeModal, matchid }: Props) => {
  const [match, setMatch] =useState<Match | null>(null);
 const {client}=useSanity()
 

  const getMatch= async ()=>{
   try{
    const match= await client?.fetch(fetchMatchByIdQuery(matchid))
    setMatch(match)
   }catch(error){
    console.log(error)
   }
    
  } 

 console.log(match)

    useEffect(() => {
    if (matchid) {
      getMatch();
      
    }
  }, [matchid]);

  // const awayTeam= match?.awayTeam
  // const homeTeam= match?.homeTeam

  // console.log(match?.awayTeam)


  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-out duration-300"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto transform rounded-2xl bg-white p-6 text-left shadow-xl transition-all flex flex-col gap-5">
                  <AiOutlineClose
                    className="absolute top-4 right-4 z-10 w-fit font-extrabold text-2xl rounded-lg cursor-pointer "
                    onClick={closeModal}
                  />

                  <div className="flex-1 flex flex-col gap-3 justify-center">
                    <div className="flex gap-2 justify-center items-center ">
                      <div className="flex gap-3 align-middle text-center flex-col">
                        <div className="flex items-center gap-x-2">
                          <Image src={'/images/teamImage.svg'} alt="team1" width={30} height={20} />
                          <p className="text-md text-slate-700">{match?.homeTeam?.name}</p>
                        </div>
                      </div>

                      <input
                        type="text"
                        name=""
                        id=""
                        className="border-2 border-blue w-10 h-10 rounded-lg outline-none text-center font-bold"
                      />

                      <input
                        type="text"
                        name=""
                        id=""
                        className="border-2 border-blue w-10 h-10 rounded-lg outline-none text-center font-bold"
                      />

                      <div className="flex gap-3 align-middle text-center flex-col">
                        <div className="flex items-center gap-x-2">
                          <p className="text-md text-slate-700">{match?.awayTeam?.name}</p>
                          <Image src={'/images/teamImage2.svg'} alt="team1" width={30} height={20} />
                        </div>
                      </div>
                    </div>
                    <h3 className="text-center mt-2 font-bold text-warmGray-700 text-sm">Popular Predictions</h3>
                    <div className="flex justify-center gap-2 mt-2">
                      <div className="flex text-white font-bold justify-center align-middle text-sm rounded-xl bg-[#2076F8] w-10">
                        <p>3</p>
                        <span>-</span>
                        <p>2</p>
                      </div>
                      <div className="flex text-white font-bold justify-center align-middle text-sm rounded-xl bg-[#2076F8] w-10">
                        <p>2</p>
                        <span>-</span>
                        <p>1</p>
                      </div>
                      <div className="flex text-white font-bold justify-center align-middle text-sm rounded-xl bg-[#2076F8] w-10">
                        <p>1</p>
                        <span>-</span>
                        <p>0</p>
                      </div>
                    </div>
                    <div className="w-full mt-2">
                      <PredictionDropdown match={match} />
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default PredictionModal;
