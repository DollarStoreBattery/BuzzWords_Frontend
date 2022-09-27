export enum ScoreRankings {
  BEGINNER = "Beginner",
  GOOD_START = "Good Start",
  MOVING_UP = "Moving Up",
  GOOD = "Good",
  SOLID = "Solid",
  NICE = "Nice",
  GREAT = "Great",
  AMAZING = "Amazing",
  GENIUS = "Genius",
  QUEEN_BEE = "Queen Bee",
}

export type Pangrams = Array<string>;
export type SolutionAndScore = { [key: string]: number };

export default interface PuzzleInput {
  puzzleLetters: Array<string>;
  centralLetter: string;
}

export interface BasePuzzle extends PuzzleInput {
  date: string;
  rankingScheme: { [key in ScoreRankings]: number };
  pangrams: Pangrams;
  solutionsWithScores: SolutionAndScore;
}

export interface Puzzle extends BasePuzzle {
  gameId: string;
}
