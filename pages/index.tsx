import type { NextPage, GetStaticProps } from "next";
import Head from "next/head";
import { getDailyGame, getYesterDaysGame } from "../lib/fetchGame";
import { Puzzle } from "../lib/gameTypes";
import PageContainer from "../components/basic/PageContainer";
import { fallbackPuzzle } from "../lib/fallback";
import GameGrid from "../components/GameGrid";
import Guess from "../components/Guess";
import FoundWordsList from "../components/FoundWordsList";
import ProgressBar from "../components/ProgressBar";
import ScoreBoard from "../components/ScoreBoard";
import ControlsPanel from "../components/ControlsPanel";
import NavBar from "../components/basic/NavBar";
import { useEffect, useState } from "react";
import InstructionModal from "../components/InstructionModal";
import { gameName } from "../lib/constants";
import { GameElementsDiv, GameLayout } from "../components/basic/Layouts";
import usePlaySessionStore from "../lib/usePlaySessionStore";
import YesterdayModal from "../components/YesterdayModal";
interface DailyPuzzleProps {
  todaysGame: Puzzle;
  yesterdaysGame: Puzzle | null;
}

const MainPage: NextPage<DailyPuzzleProps> = ({
  todaysGame,
  yesterdaysGame,
}) => {
  const {
    pangrams,
    puzzleLetters,
    solutionsWithScores,
    centralLetter,
    rankingScheme,
  } = todaysGame;

  const resetGame = usePlaySessionStore((state) => state.resetGame);
  const gameSessionID = usePlaySessionStore((state) => state.gameID);
  const setGameSessionID = usePlaySessionStore((state) => state.setGameID);

  const [isInstructionsVisible, setIsInstructionsVisible] =
    useState<boolean>(false);

  const [isYesterdayVisibile, setIsYesterdayVisibile] =
    useState<boolean>(false);

  useEffect(() => {
    // detect if getStaticProps has made a new game and reset the play session state accordingly
    if (todaysGame.gameId != gameSessionID) {
      resetGame();
      setGameSessionID(todaysGame.gameId);
    }
  }, [todaysGame.gameId]);

  const centralLetterUpper = centralLetter.toUpperCase();
  const puzzleLettersUpper = puzzleLetters.map((letter) =>
    letter.toUpperCase()
  );

  const gameContents = (
    <>
      <Guess
        centralLetter={centralLetterUpper}
        pangrams={pangrams}
        scoringScheme={solutionsWithScores}
      />

      <GameGrid
        centralLetter={centralLetterUpper}
        boundaryLetters={puzzleLettersUpper.filter(
          (letter) => letter != centralLetterUpper
        )}
      ></GameGrid>

      <ControlsPanel
        centralLetter={centralLetterUpper}
        solutionsWithScores={solutionsWithScores}
        puzzleLetters={puzzleLettersUpper}
      ></ControlsPanel>
    </>
  );
  return (
    <>
      <Head>
        <title>{gameName}</title>
        <meta name="description" content={gameName} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NavBar
        toggleInstructions={setIsInstructionsVisible}
        toggleYesterday={setIsYesterdayVisibile}
      />
      <PageContainer>
        <InstructionModal
          isOpened={isInstructionsVisible}
          setIsOpened={setIsInstructionsVisible}
        />
        {yesterdaysGame && (
          <YesterdayModal
            isOpened={isYesterdayVisibile}
            setIsOpened={setIsYesterdayVisibile}
            yesterdayGame={yesterdaysGame}
          ></YesterdayModal>
        )}

        <ScoreBoard rankingScheme={rankingScheme} />

        <ProgressBar rankingScheme={rankingScheme} />

        <GameLayout>
          <GameElementsDiv>{gameContents}</GameElementsDiv>
          <FoundWordsList pangrams={pangrams} />
        </GameLayout>
      </PageContainer>
    </>
  );
};

export default MainPage;

export const getStaticProps: GetStaticProps<DailyPuzzleProps> = async () => {
  // temporarily commented out to avoid fetching from redis every time, just using a fixed game rn
  let yesterdaysGame: Puzzle | undefined | null = await getYesterDaysGame();
  let dailyGame: Puzzle | undefined = await getDailyGame();

  // let dailyGame = fallbackPuzzle;
  // let yesterdaysGame: Puzzle | null = fallbackPuzzle;

  if (!dailyGame) {
    dailyGame = fallbackPuzzle;
  }
  if (!yesterdaysGame) {
    yesterdaysGame = null;
  }

  return {
    props: {
      todaysGame: dailyGame,
      yesterdaysGame: yesterdaysGame,
    },
    // revalidate: 60,
  };
};
