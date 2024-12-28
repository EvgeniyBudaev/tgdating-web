import AES from "crypto-js/aes";

export const encrypt = (text: string) => {
  const secretKey: string =
    process.env.NEXT_PUBLIC_CRYPTO_SECRET_KEY ?? "s$cr$tK$y";
  return AES.encrypt(text, secretKey).toString();
};
