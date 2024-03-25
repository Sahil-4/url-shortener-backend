// function to generate a random index 0 to 62
const getRandomIndex = () => Math.floor(Math.random() * 62);

// function to generate a random hash of 6 length for short url
const getHash = () => {
  const characterSet = "A012BC3456bcdefhijkQRSTnoHIJKLpqUVlmrstDWXYZagEFwxyNOGMPuvz789";
  let hash = "";

  for (let i = 0; i < 7; i++) hash += characterSet[getRandomIndex()];

  return hash;
};

// function to generate short URL
export const getShortURL = () => {
  return `${process.env.DOMAIN}/${getHash()}`;
};

// function to generate string of 6 numbers for otp 
export const generateOTP = () => {
  let otp = "";

  for (let i = 0; i < 6; i++) otp += Math.floor(Math.random() * 10);

  return otp;
};
