import { RankingScheme, ScoreRankings } from "./gameTypes";

const getRankingBounds = (
  currentScore: number,
  rankingScheme: RankingScheme
): {
  pointsToNextRank: number | null;
  percent: number;
  currentRank: `${ScoreRankings}`;
  nextRank: `${ScoreRankings}` | null;
} => {
  const NUM_SEGMENTS = 8;

  let scoreThresholds = Object.values(rankingScheme);
  let rankTitles = Object.keys(rankingScheme) as Array<`${ScoreRankings}`>;

  // queen bee doesn't get considered as a visible rank
  scoreThresholds.pop();
  rankTitles.pop();

  // if we're at the highest possible rank
  if (currentScore >= scoreThresholds[scoreThresholds.length - 1]) {
    return {
      pointsToNextRank: null,
      percent: 100,
      currentRank: rankTitles[rankTitles.length - 1],
      nextRank: null,
    };
  }

  const nextRankIndex = scoreThresholds.findIndex(
    (score) => score > currentScore
  );

  const relativeUpperBound = scoreThresholds[nextRankIndex];

  let relativeLowerBound: number;
  let activeRankIndex: number;

  if (nextRankIndex === 0) {
    relativeLowerBound = 0;
    activeRankIndex = 0;
  } else {
    relativeLowerBound = scoreThresholds[nextRankIndex - 1];
    activeRankIndex = nextRankIndex - 1;
  }

  let segmentPercent: number;

  if (relativeUpperBound === 0) {
    segmentPercent = 0;
  } else {
    segmentPercent =
      (currentScore - relativeLowerBound) /
      (relativeUpperBound - relativeLowerBound);
  }

  const scaledSegmentPercent = segmentPercent * (100 / NUM_SEGMENTS);
  const scaledFullPercent =
    activeRankIndex * (100 / NUM_SEGMENTS) + scaledSegmentPercent;

  return {
    pointsToNextRank: scoreThresholds[nextRankIndex] - currentScore,
    percent: scaledFullPercent,
    currentRank: rankTitles[activeRankIndex],
    nextRank: rankTitles[nextRankIndex],
  };
};

export default getRankingBounds;
