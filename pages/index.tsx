import type { NextPage, GetStaticProps } from "next";
import Head from "next/head";
import { getDailyGame } from "../lib/fetchDailyGame";
import { Puzzle } from "../lib/gameTypes";
import PageContainer from "../components/basic/PageContainer";
import { dummyPuzzle } from "../lib/dummy";
import TextElement from "../components/basic/TextElement";
import GameGrid from "../components/GameGrid";
import Guess from "../components/Guess";
import ResetButton from "../components/ResetButton";
import EnterButton from "../components/EnterButton";
import FoundWordsList from "../components/FoundWordsList";
interface DailyPuzzleProps {
  game: Puzzle;
}
const MainPage: NextPage<DailyPuzzleProps> = ({ game }) => {
  const { pangrams, puzzleLetters, solutionsWithScores, centralLetter } = game;

  return (
    <PageContainer>
      <Head>
        <title>Spelling Bee Game</title>
        <meta name="description" content="Spelling Bee Game" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <TextElement>Welcome to the Spelling Bee Game 🐝</TextElement>
      <Guess />
      <GameGrid
        centralLetter={centralLetter.toUpperCase()}
        puzzleLetters={puzzleLetters.map((letter) => letter.toUpperCase())}
      ></GameGrid>
      <TextElement textColour="Rust">{pangrams[0]}</TextElement>
      <ResetButton />
      <EnterButton
        centralLetter={centralLetter.toUpperCase()}
        solutionsList={Object.keys(solutionsWithScores)}
      />
      <FoundWordsList />
    </PageContainer>
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
