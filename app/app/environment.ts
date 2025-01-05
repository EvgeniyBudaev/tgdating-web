import invariant from "tiny-invariant";

export type EnvironmentType = {
  NEXT_PUBLIC_API_URL: string;
  NEXT_PUBLIC_NODE_ENV: string;
  NEXT_PUBLIC_YANDEX_API_KEY: string;
  NEXT_PUBLIC_CRYPTO_SECRET_KEY: string;
  NEXT_PUBLIC_DOMAIN_GET_LOCATION: string;
  S3_BUCKET_PUBLIC_DOMAIN: string;
};

const {
  NEXT_PUBLIC_API_URL,
  NEXT_PUBLIC_NODE_ENV,
  NEXT_PUBLIC_YANDEX_API_KEY,
  NEXT_PUBLIC_CRYPTO_SECRET_KEY,
  NEXT_PUBLIC_DOMAIN_GET_LOCATION,
  S3_BUCKET_PUBLIC_DOMAIN,
} = process.env;

invariant(NEXT_PUBLIC_API_URL, "NEXT_PUBLIC_API_URL must be set in env file");
invariant(NEXT_PUBLIC_NODE_ENV, "NEXT_PUBLIC_NODE_ENV must be set in env file");
invariant(
  NEXT_PUBLIC_YANDEX_API_KEY,
  "NEXT_PUBLIC_YANDEX_API_KEY must be set in env file",
);
invariant(
  NEXT_PUBLIC_CRYPTO_SECRET_KEY,
  "NEXT_PUBLIC_CRYPTO_SECRET_KEY must be set in env file",
);
invariant(
  NEXT_PUBLIC_DOMAIN_GET_LOCATION,
  "NEXT_PUBLIC_DOMAIN_GET_LOCATION must be set in env file",
);
invariant(
  S3_BUCKET_PUBLIC_DOMAIN,
  "S3_BUCKET_PUBLIC_DOMAIN must be set in env file",
);

/**
 * Переменные окружения
 */
export const Environment: EnvironmentType = {
  NEXT_PUBLIC_API_URL,
  NEXT_PUBLIC_NODE_ENV,
  NEXT_PUBLIC_YANDEX_API_KEY,
  NEXT_PUBLIC_CRYPTO_SECRET_KEY,
  NEXT_PUBLIC_DOMAIN_GET_LOCATION,
  S3_BUCKET_PUBLIC_DOMAIN,
};
