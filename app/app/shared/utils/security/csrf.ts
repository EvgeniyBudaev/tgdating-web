import cryptoJS from "crypto-js";
import { cookies } from "next/headers";
import { COOKIE_CSRF_NAME } from "@/app/shared/constants";

interface CSRFOptions {
  /**
   * A secret to use for signing the CSRF token
   *  */
  secret?: string;
}

export class CSRF {
  private secret?: string;

  constructor(options: CSRFOptions) {
    this.secret = options.secret;
  }

  /**
   * Generates a random string in Base64URL to be used as an authenticity token
   * for CSRF protection.
   * @param bytes The number of bytes used to generate the token
   * @returns A random string in Base64URL
   */
  generate = (bytes = 32) => {
    // @ts-ignore
    const token = cryptoJS.lib.WordArray.random(bytes).toString(
      cryptoJS.enc.Base64url,
    );
    if (!this.secret) return token;
    const signature = this.sign(token);
    return [token, signature].join(".");
  };

  private sign(token: string) {
    if (!this.secret) return token;
    return (
      cryptoJS
        // @ts-ignore
        .HmacSHA256(token, this.secret)
        .toString(cryptoJS.enc.Base64url)
    );
  }
}

const validateCsrfToken = async (
  csrfToken: string,
  cookieCsrfToken?: string,
) => {
  if (csrfToken !== cookieCsrfToken) {
    const responseError = new Error("errorBoundary.common.unexpectedError");
    // @ts-ignore
    responseError.status = 403;
    throw responseError;
  }
};

export const checkCsrfToken = async (csrfToken: string) => {
  const cookieStore = await cookies();
  const cookieCsrfToken = cookieStore.get(COOKIE_CSRF_NAME)?.value;
  try {
    await validateCsrfToken(csrfToken, cookieCsrfToken);
    return { ok: true, error: undefined };
  } catch (error) {
    return { ok: false, error: error };
  }
};
