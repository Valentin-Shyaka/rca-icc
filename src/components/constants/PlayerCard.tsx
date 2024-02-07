import React from 'react';
import Image from 'next/image';
import { Player } from '../../utils/types/types1';
import PlayerStatModel from './PlayerStatModel';
import { useState } from 'react';

const PlayerCard = ({ displayName, profile, fullName, _id }: Player) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div
      onClick={() => setIsOpen(true)}
      className="w-[120px] flex flex-col items-center cursor-pointer border-2 border-gray"
    >
      <Image
        src={profile || '/images/player.png'}
        width={120}
        height={100}
        className="bg-gray object-cover w-[120px] h-[120px]"
        alt={displayName}
      />
      <p className="text-left font-bold ">{displayName}</p>
      {/* {position?.map((pos, key) => ( */}
      <p key={'key'} className="text-left capitalize font-bold text-slate-600 text-xs">
        {fullName}
      </p>
      {/* ))} */}
      {/* {isOpen && <PlayerStatModel isOpen={isOpen} closeModal={() => setIsOpen(false)} playerid={_id} />} */}
    </div>
  );
};

export default PlayerCard;
