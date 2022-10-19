const numSecondsTilNewGame = (): number => {
  const now = new Date();

  const easternTimeZoneOffsetHours = 4;
  const midnightESTtimestamp =
    new Date(now).setUTCHours(24, 0, 0, 0) + easternTimeZoneOffsetHours * 3.6e6;

  const msTillMidnight = midnightESTtimestamp - now.getTime();

  // console.log(msTillMidnight / 1000 / 60 / 60, "hours to midnight EST");

  return Math.ceil(msTillMidnight / 1000);
};

export default numSecondsTilNewGame;
