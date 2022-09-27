import usePlaySessionStore from "../lib/usePlaySessionStore";

const NukeButtonDevOnly = () => {
  const nuke = usePlaySessionStore((state) => state.nukeWordsDevOnly);
  return <button onClick={nuke}>NUKE 💣</button>;
};

export default NukeButtonDevOnly;
