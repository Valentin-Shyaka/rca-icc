// 'use client'
// import React from 'react'
// import { Modal } from '@mantine/core'
// import { Player } from '@/utils/types/types1';
// import { fetchPlayersAllQuery } from '@/lib/queries';

// import { sanityClient } from '@/lib/sanity';

// interface Props {
//   isOpen: boolean;
//   closeModal: () => void;
//   playerid: string
// }

// const PlayerStatModel = ({isOpen,closeModal,playerid}: Props) => {
//     const client= sanityClient
//     const [playerToShow, setPlayerToShow] = useState<Player | null>(null);

//     const getPlayer= async ()=>{
//         const player= await client?.fetch(fetchPlayersAllQuery);
//         const playerToShow= player.filter((player)=>player?._id == playerid )
//         setPlayerToShow(playerToShow
//             )
//     }

//   return (
//     <Modal
//       centered
//       size={'lg'}
//       opened={isOpen}
//       onClose={()=>closeModal}
//       title={
//         <span className=" font-semibold w-full justify-center text-xl text-center">
//           {player?.fullName}
//         </span>
//       }
//     ></Modal>
//   );
// }

// export default PlayerStatModel
