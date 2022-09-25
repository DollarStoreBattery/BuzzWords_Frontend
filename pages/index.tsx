import type { NextPage, GetStaticProps } from "next";
import Head from "next/head";
import { getDailyGame } from "../lib/fetchDailyGame";
import { Puzzle } from "../lib/gameTypes";
import PageContainer from "../components/PageContainer";
import { dummyPuzzle } from "../lib/dummy";
import TextElement from "../components/TextElement";
import GameGrid from "../components/GameGrid";
interface DailyPuzzleProps {
  game: Puzzle;
}
const MainPage: NextPage<DailyPuzzleProps> = ({ game }) => {
  const { pangrams, puzzleLetters, solutionsWithScores } = game;
  return (
    <PageContainer>
      <Head>
        <title>Spelling Bee Game</title>
        <meta name="description" content="Spelling Bee Game" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <TextElement>{puzzleLetters}</TextElement>
      <TextElement size="lg">{Object.keys(solutionsWithScores)[0]}</TextElement>
      <GameGrid />
      <TextElement textColour="Rust">{pangrams[0]}</TextElement>
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
