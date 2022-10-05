import type { NextPage, GetStaticProps } from "next";
import Head from "next/head";
import { getDailyGame } from "../lib/fetchDailyGame";
import { Puzzle } from "../lib/gameTypes";
import PageContainer from "../components/basic/PageContainer";
import { dummyPuzzle } from "../lib/dummy";
import GameGrid from "../components/GameGrid";
import Guess from "../components/Guess";
import FoundWordsList from "../components/FoundWordsList";
import FeedbackMessage from "../components/FeedbackMessage";
import ProgressBar from "../components/ProgressBar";
import ScoreBoard from "../components/ScoreBoard";
import ControlsPanel from "../components/ControlsPanel";
import NavBar from "../components/NavBar";
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

  const centralLetterUpper = centralLetter.toUpperCase();
  const puzzleLettersUpper = puzzleLetters.map((letter) =>
    letter.toUpperCase()
  );
  return (
    <>
      <NavBar />
      <PageContainer>
        <Head>
          <title>Spelling Bee Game</title>
          <meta name="description" content="Spelling Bee Game" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <FoundWordsList pangrams={pangrams} />

        <ScoreBoard rankingScheme={rankingScheme} />

        <ProgressBar rankingScheme={rankingScheme} />

        <FeedbackMessage
          pangrams={pangrams}
          scoringScheme={solutionsWithScores}
        />
        <Guess centralLetter={centralLetterUpper} />

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
      </PageContainer>
    </>
  );
};

export default MainPage;

export const getStaticProps: GetStaticProps = async () => {
  // temporarily commented out to avoid fetching from redis every time, just using a fixed game rn
  // const dailyGame = await getDailyGame();
  const dailyGame = dummyPuzzle;

  if (!dailyGame) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      game: dailyGame,
    },
    revalidate: 3600,
  };
};
