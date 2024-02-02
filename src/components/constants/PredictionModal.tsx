import { Dialog, Transition } from '@headlessui/react';
import Image from 'next/image';
import { Fragment, useEffect, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { useSanity } from '@/contexts/SanityProvider';
import { fetchMatchByIdQuery } from '../../lib/queries';
import { Match } from '../../utils/types/types1';
import PredictionDropdown from './PredictionDropdown';
import { Modal } from '@mantine/core';
import { useUser } from '@/contexts/UserProvider';
import { notifications } from '@mantine/notifications';

interface Props {
  isOpen: boolean;
  closeModal: () => void;
  matchId: string;
}

const PredictionModal = ({ isOpen, closeModal, matchId }: Props) => {
  const [match, setMatch] = useState<Match | null>(null);
  const { client } = useSanity();
  const { user } = useUser();
  const [predData, setPredData] = useState({
    matchId: matchId,
    userId: user?.id,
    matchCategory: '',
  });
  const [prediction, setPrediction] = useState({
    manOfTheMatch: '',
    firstTeamToScore: '',
    homeScore: 0,
    awayScore: 0,
    highestScoringPlayer: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const getMatch = async () => {
    try {
      const match = await client?.fetch<Match[] | null>(fetchMatchByIdQuery(matchId));
      if (!match) return;
      setMatch(match[0]);
      // set math category
      setPredData((prevState) => ({ ...prevState, matchCategory: match[0].category.toLowerCase() }));
    } catch (error) {
      console.log(error);
    }
  };

  console.log('match', match);

  const sendPrediction = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/fantasy/predictions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...predData, prediction }),
      });
      const data = await res.json();
      console.log(data);
      notifications.show({
        title: 'Success',
        message: 'Prediction sent successfully',
        color: 'green',
      });
      closeModal();
    } catch (error: any) {
      console.log(error);
      notifications.show({
        title: 'Error',
        message: error?.message ?? 'An error occurred',
        color: 'red',
      });
    }
  };

  useEffect(() => {
    if (matchId) {
      getMatch();
    }
  }, [matchId]);

  return (
    <>
      <Modal centered size={'lg'} opened={isOpen} onClose={closeModal}>
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
              value={prediction.homeScore}
              id=""
              className="border-2 border-blue w-10 h-10 rounded-lg outline-none text-center font-bold"
              onChange={(e) => setPrediction((prevState) => ({ ...prevState, homeScore: Number(e.target.value) }))}
            />
            <input
              type="text"
              name=""
              value={prediction.awayScore}
              id=""
              className="border-2 border-blue w-10 h-10 rounded-lg outline-none text-center font-bold"
              onChange={(e) => setPrediction((prevState) => ({ ...prevState, awayScore: Number(e.target.value) }))}
            />
            <div className="flex gap-3 align-middle text-center flex-col">
              <div className="flex items-center gap-x-2">
                <p className="text-md text-slate-700">{match?.awayTeam?.name}</p>
                <Image src={'/images/teamImage2.svg'} alt="team1" width={30} height={20} />
              </div>
            </div>
          </div>
          {/* <h3 className="text-center mt-2 font-bold text-warmGray-700 text-sm">Popular Predictions</h3>
          <div className="flex justify-center gap-2 mt-2">
            <div className="flex text-white font-bold justify-center align-middle text-sm rounded-xl bg-[#2076F8] w-10">
              <p>3</p>
              <span>-</span>
              <p>2</p>
            </div>
          </div> */}
          <div className="w-full mt-2">{match && <PredictionDropdown match={match} />}</div>
        </div>
      </Modal>
    </>
  );
};

export default PredictionModal;
