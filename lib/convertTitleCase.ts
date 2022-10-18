/**
 * Assuming word is allcaps
 * @param word
 * @returns
 */
const convertTitleCase = (word: string) => {
  return word.slice(0, 1) + word.toLowerCase().slice(1, word.length);
};

export default convertTitleCase;
