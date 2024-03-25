import { createTransport } from "nodemailer";

const getTransporter = () => {
  return createTransport({
    service: process.env.MAIL_SERVICE_NAME,
    host: process.env.MAIL_SERVICE_NAME,
    port: process.env.MAIL_SERVICE_PORT,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });
};

const getOTPMail = (receiver, PIN) => {
  return {
    from: {
      name: process.env.MAIL_USER_NAME,
      address: process.env.MAIL_USER,
    },
    to: receiver,
    subject: "Email Verification - URL Shortener App ",
    text: `${PIN} is the OTP for your email verification at ${process.env.DOMAIN} valid only for 5 minutes.\n\nNOTE: Please ignore this email if it is not requested by you. We never create or register any account without email verification.\nThanks\nFrom URL Shortener App`,
  };
};

export const sendOTPVerificationMail = (receiver, PIN) => {
  const mail = getOTPMail(receiver, PIN);

  getTransporter().sendMail(mail, (error, info) => {
    if (error) throw error;
    return info;
  });
};
