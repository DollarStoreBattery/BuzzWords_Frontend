import type { NextPage, GetStaticProps } from "next";
import Head from "next/head";
import { getDailyGame } from "../lib/fetchDailyGame";
import { Puzzle } from "../lib/gameTypes";
import PageContainer from "../components/basic/PageContainer";
import { dummyPuzzle } from "../lib/dummy";
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
import numSecondsTilNewGame from "../lib/getTimeTilNewGame";
import usePlaySessionStore from "../lib/usePlaySessionStore";
interface DailyPuzzleProps {
  game: Puzzle;
}

const MainPage: NextPage<DailyPuzzleProps> = ({ game }) => {
  const {
    pangrams,
    puzzleLetters,
    solutionsWithScores,
    centralLetter,
    rankingScheme,
  } = game;

  const resetFunction = usePlaySessionStore((state) => state.resetGame);
  const gameSessionID = usePlaySessionStore((state) => state.gameID);
  const setGameSessionID = usePlaySessionStore((state) => state.setGameID);

  useEffect(() => {
    // detect if getStaticProps has made a new game and reset the play session state accordingly
    if (game.gameId != gameSessionID) {
      resetFunction();
      setGameSessionID(game.gameId);
    }
  }, [game.gameId]);

  const centralLetterUpper = centralLetter.toUpperCase();
  const puzzleLettersUpper = puzzleLetters.map((letter) =>
    letter.toUpperCase()
  );

  const [isInstructionsVisible, setIsInstructionsVisible] =
    useState<boolean>(false);

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
      <NavBar toggleInstructions={setIsInstructionsVisible} />
      <PageContainer>
        <InstructionModal
          isOpened={isInstructionsVisible}
          setIsOpened={setIsInstructionsVisible}
        />

        <Head>
          <title>{gameName}</title>
          <meta name="description" content="Spelling Bee Game" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

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

export const getStaticProps: GetStaticProps = async () => {
  // temporarily commented out to avoid fetching from redis every time, just using a fixed game rn
  const dailyGame = await getDailyGame();
  // const dailyGame = dummyPuzzle;

  if (!dailyGame) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      game: dailyGame,
    },
    revalidate: numSecondsTilNewGame(),
  };
};
