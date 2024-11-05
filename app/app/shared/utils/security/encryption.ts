import AES from "crypto-js/aes";

export const encrypt = (text: string) => {
  const secretKey = process.env.NEXT_PUBLIC_CRYPTO_SECRET_KEY;
  return AES.encrypt(text, secretKey).toString();
};
