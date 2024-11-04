import Cryptr from "cryptr";

export const encrypt = (text: string) => {
  const secretKey = process.env.NEXT_PUBLIC_SECRET;
  const cr = new Cryptr(secretKey ?? "mySecretKey");
  return cr.encrypt(text);
};

export const decrypt = (encryptedString: string) => {
  const secretKey = process.env.NEXT_PUBLIC_SECRET;
  const cr = new Cryptr(secretKey ?? "mySecretKey");
  return cr.decrypt(encryptedString);
};
