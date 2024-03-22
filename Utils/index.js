// function to generate a random index 0 to 62
const getRandomIndex = () => Math.floor(Math.random() * 62);

const getHash = () => {
  const characterSet = "A012BC3456bcdefhijkQRSTnoHIJKLpqUVlmrstDWXYZagEFwxyNOGMPuvz789";
  let hash = "";

  for (let i = 0; i < 7; i++) hash += characterSet[getRandomIndex()];

  return hash;
}

// function to generate short URL
export const getShortURL = () => {
  return `${process.env.DOMAIN}/${getHash()}`;
};
