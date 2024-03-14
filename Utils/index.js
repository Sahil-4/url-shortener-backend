// function to generate a random index 0 to 62
const getRandomIndex = () => Math.floor(Math.random() * 62);

// function to generate short URL
export const getShortURL = () => {
  const characterSet = "A012BC3456bcdefhijkQRSTnoHIJKLpqUVlmrstDWXYZagEFwxyNOGMPuvz789";
  let shortURL = "";

  for (let i = 0; i < 7; i++) shortURL += characterSet[getRandomIndex()];

  return shortURL;
};
