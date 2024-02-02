import { useSanity } from '@/contexts/SanityProvider';
import { useUser } from '@/contexts/UserProvider';
import { getResError } from '@/utils/funcs/fetch';
import { getYearFromDataSet } from '@/utils/funcs/func1';
import { Button, Modal } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import axios from 'axios';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { fetchMatchByIdQuery } from '../../lib/queries';
import { Match } from '../../utils/types/types1';
import FirstToScore from './prediction-dropdowns/FirstToScore';
import HighScorer from './prediction-dropdowns/HighScorer';
import ManOfTheMatch from './prediction-dropdowns/ManOfTheMatch';
import { useApp } from '@/contexts/AppProvider';

interface Props {
  isOpen: boolean;
  closeModal: () => void;
  matchId: string;
}

const PredictionModal = ({ isOpen, closeModal, matchId }: Props) => {
  const [match, setMatch] = useState<Match | null>(null);
  const { client, dataSet } = useSanity();
  const { user } = useUser();
  const [predData, setPredData] = useState({
    userId: user?.id,
    season: getYearFromDataSet(dataSet!),
  });
  const [prediction, setPrediction] = useState({
    matchId: matchId,
    manOfTheMatch: '',
    matchCategory: '',
    firstTeamToScore: '',
    homeScore: 0,
    awayScore: 0,
    highestScoringPlayer: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { userPredictions, setUserPredictions } = useApp();
  const [hasPredicted, setHasPredicted] = useState(false);

  const getMatch = async () => {
    try {
      const match = await client?.fetch<Match[] | null>(fetchMatchByIdQuery(matchId));
      if (!match) return;
      setMatch(match[0]);
      // set math category
      setPrediction((prevState) => ({ ...prevState, matchCategory: match[0].category.toLowerCase() }));
    } catch (error) {
      console.log(error);
    }
  };

  console.log('match', match);

  const sendPrediction = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await axios.post('/api/fantasy/predictions', { ...predData, prediction });
      const data = await res.data;
      console.log(data);
      if (res.status !== 201) {
        throw new Error('Failed to send predictions');
      }
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
        message: getResError(error) ?? 'An error occurred',
        color: 'red',
      });
    }
    setLoading(false);
  };

  const updatePrediction = async () => {
    setLoading(true);
    try {
      const res = await axios.put('/api/fantasy/predictions', { ...predData, prediction });
      const data = await res.data;
      console.log(data);
      notifications.show({
        title: 'Success',
        message: 'Prediction updated successfully',
        color: 'green',
      });
      // replace the old user prediction with the new one
      // remove the old prediction first
      const newPredictions = userPredictions?.filter((pred) => pred.matchId !== matchId);
      if (!newPredictions) return;
      setUserPredictions?.([...newPredictions, data.data]);
      closeModal();
    } catch (error: any) {
      console.log(error);
      notifications.show({
        title: 'Error',
        message: error?.message ?? 'An error occurred',
        color: 'red',
      });
    }
    setLoading(false);
  };

  // find in user_prediction
  const getPrevPrediction = () => {
    const userPrevPrediction = userPredictions?.find((pred) => pred.matchId === matchId);
    console.log('userPredictions', userPredictions);
    console.log('userPrevPrediction', userPrevPrediction);
    if (userPrevPrediction) setHasPredicted(true);
    setPrediction({
      ...prediction,
      manOfTheMatch: userPrevPrediction?.prediction?.manOfTheMatch ?? '',
      matchCategory: userPrevPrediction?.matchCategory ?? '',
      firstTeamToScore: userPrevPrediction?.prediction?.firstTeamToScore ?? '',
      homeScore: userPrevPrediction?.prediction.homeScore ?? 0,
      awayScore: userPrevPrediction?.prediction.awayScore ?? 0,
      highestScoringPlayer: userPrevPrediction?.prediction.highestScoringPlayer ?? '',
    });
  };

  useEffect(() => {
    if (matchId) {
      getMatch();
      getPrevPrediction();
    }
  }, [matchId]);

  const isFootball = match?.category.toLowerCase() === 'football';
  const isBasketball = match?.category.toLowerCase() === 'basketball';
  const isVolleyball = match?.category.toLowerCase() === 'volleyball';

  // TODO: Add Popular Predictions
  return (
    <>
      <Modal
        centered
        size={'lg'}
        opened={isOpen}
        onClose={closeModal}
        title={
          <span className=" font-semibold text-xl text-center">
            {match?.homeTeam?.name} vs {match?.awayTeam?.name} Prediction
          </span>
        }
      >
        <div className="flex-1 flex flex-col gap-3 justify-center">
          {/* error */}
          <span className="text-red-500 text-center">{error}</span>
          {match?.status.status !== 'NS' && (
            <span className="text-red-500 text-center font-semibold text-lg">Game is Closed</span>
          )}
          <div className="flex gap-2 justify-center items-center ">
            <div className="flex gap-3 align-middle text-center flex-col">
              <div className="flex items-center gap-x-2">
                <Image src={'/images/teamImage.svg'} alt="team1" width={50} height={30} />
                <p className="text-md text-slate-700 font-semibold text-lg">{match?.homeTeam?.name}</p>
              </div>
            </div>
            <input
              type="text"
              name=""
              value={prediction.homeScore}
              id=""
              className="border-2 border-blue w-10 h-10 rounded-lg outline-none text-center font-bold"
              onChange={(e) => setPrediction((prevState) => ({ ...prevState, homeScore: Number(e.target.value) }))}
              disabled={match?.status.status !== 'NS'}
            />
            <input
              type="text"
              name=""
              value={prediction.awayScore}
              id=""
              className="border-2 border-blue w-10 h-10 rounded-lg outline-none text-center font-bold"
              onChange={(e) => setPrediction((prevState) => ({ ...prevState, awayScore: Number(e.target.value) }))}
              disabled={match?.status.status !== 'NS'}
            />
            <div className="flex gap-3 align-middle text-center flex-col">
              <div className="flex items-center gap-x-2">
                <p className="text-md text-slate-700 font-semibold text-lg">{match?.awayTeam?.name}</p>
                <Image src={'/images/teamImage2.svg'} alt="team1" width={50} height={30} />
              </div>
            </div>
          </div>
          {/* <h3 className="text-center mt-2 font-bold text-warmGray-700 text-sm">Popular Predictions</h3>
          <div className="flex justify-center gap-2 mt-2">
            <div className="flex text-white font-bold justify-center align-middle text-sm rounded-xl bg-[#3076F8] w-10">
              <p>3</p>
              <span>-</span>
              <p>2</p>
            </div>
          </div> */}
          <div className="w-full mt-2">
            {match && (
              <ManOfTheMatch
                match={match}
                onChange={(player) => {
                  setPrediction((prevState) => ({ ...prevState, manOfTheMatch: player._id }));
                }}
                prevData={[...match.homeTeam.players, ...match.awayTeam.players].find(
                  (t) => t._id === prediction.manOfTheMatch,
                )}
                disabled={match?.status.status !== 'NS'}
              />
            )}
          </div>
          <div className="w-full mt-2">
            {match && isFootball && (
              <FirstToScore
                match={match}
                onChange={(team) => {
                  setPrediction((prevState) => ({ ...prevState, firstTeamToScore: team._id }));
                }}
                prevData={[match.homeTeam, match.awayTeam].find((t) => t._id === prediction.firstTeamToScore)}
                disabled={match?.status.status !== 'NS'}
              />
            )}
          </div>
          <div className="w-full mt-2">
            {match && isBasketball && (
              <HighScorer
                match={match}
                onChange={(player) => {
                  setPrediction((prevState) => ({ ...prevState, highestScoringPlayer: player._id }));
                }}
                prevData={[...match.homeTeam.players, ...match.awayTeam.players].find(
                  (t) => t._id === prediction.manOfTheMatch,
                )}
                disabled={match?.status.status !== 'NS'}
              />
            )}
          </div>
          <div className="flex items-center justify-center py-3 w-full">
            <Button
              onClick={hasPredicted ? updatePrediction : sendPrediction}
              color="#2075f8"
              className="w-full"
              disabled={loading || match?.status.status !== 'NS'}
              loading={loading}
              variant="filled"
              size="md"
            >
              {hasPredicted ? 'Update' : 'Submit'}
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default PredictionModal;
