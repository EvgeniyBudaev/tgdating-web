import acceptLanguage from "accept-language";
import helmet from "helmet";
import { IncomingMessage, ServerResponse } from "http";
import { NextRequest, NextResponse } from "next/server";
import { Environment } from "@/app/environment";
import { COOKIE_CSRF_NAME } from "@/app/shared/constants";
import { CSRF } from "@/app/shared/utils/security/csrf";
import { fallbackLng, languages, cookieName } from "./app/i18n/settings";

acceptLanguage.languages(languages);

export const config = {
  // matcher: "/:lng*"
  matcher: [
    "/((?!api|_next/static|static|_next/image|assets|favicon.ico|sw.js).*)",
  ],
};

const makeHelmetAdapter = (response: NextResponse) => {
  const req: Partial<IncomingMessage> = {};

  const res: Partial<ServerResponse<IncomingMessage>> = {
    setHeader(name: string, value: string | number | readonly string[]) {
      if (Array.isArray(value)) {
        response.headers.delete(name);
        value.forEach((v) => response.headers.append(name, v));
      } else {
        response.headers.set(name, value.toString());
      }

      return this as ServerResponse<IncomingMessage>;
    },
    removeHeader(name: string) {
      response.headers.delete(name);

      return this as ServerResponse<IncomingMessage>;
    },
  };

  return [
    req as IncomingMessage,
    res as ServerResponse<IncomingMessage>,
    () => {},
  ] as const;
};

export const getContentSecurityPolicy = (nonce?: string): string => {
  let script_src = "'self'";
  let script_src_elem = "'self'";

  if (process.env.NEXT_PUBLIC_NODE_ENV === "development") {
    script_src += " 'unsafe-inline' 'unsafe-eval'";
    script_src_elem += " 'unsafe-inline'";
  } else if (typeof nonce === "string" && nonce.length > 40) {
    script_src += ` 'nonce-${nonce}'`;
    script_src_elem += ` 'nonce-${nonce}'`;
  }

  const connect_src =
    process.env.NEXT_PUBLIC_NODE_ENV !== "development"
      ? "'self' ws:"
      : "'unsafe-inline' ws://localhost:*";

  const domainGetLocation = process?.env?.NEXT_PUBLIC_DOMAIN_GET_LOCATION;
  const s3Domain = `https://${process?.env?.S3_BUCKET_PUBLIC_DOMAIN}`;

  // Add CORS headers
  const cors_headers =
    process.env.NEXT_PUBLIC_NODE_ENV !== "development"
      ? domainGetLocation
      : "'self'";

  return (
    "" +
    "default-src 'self' data:; " +
    // `script-src https://telegram.org https://api-maps.yandex.ru https://suggest-maps.yandex.ru http://*.maps.yandex.net https://yandex.ru https://yastatic.net ${script_src}; ` +
    `script-src https://telegram.org https://suggest-maps.yandex.ru ${script_src}; ` +
    // `script-src-elem https://telegram.org https://api-maps.yandex.ru https://suggest-maps.yandex.ru http://*.maps.yandex.net https://yandex.ru https://yastatic.net ${script_src_elem};` +
    `script-src-elem https://telegram.org https://suggest-maps.yandex.ru ${script_src_elem};` +
    `style-src 'self' https: 'unsafe-inline'; ` +
    "base-uri 'self'; " +
    "child-src https://api-maps.yandex.ru 'self'; " +
    // `connect-src https://geocode-maps.yandex.ru https://api.ipify.org https://api-maps.yandex.ru https://suggest-maps.yandex.ru https://*.maps.yandex.net https://yandex.ru https://*.taxi.yandex.net ${connect_src}; `
    `connect-src ${domainGetLocation} 'self';` +
    // "img-src 'unsafe-inline' blob: data: https://*.maps.yandex.net https://api-maps.yandex.ru https://yandex.ru;" +
    `img-src ${s3Domain} 'self' blob: data:;` +
    "font-src 'self' https: data:; " +
    "form-action 'self'; " +
    "frame-ancestors 'self'; " +
    // "frame-src https://api-maps.yandex.ru 'self'; " +
    "frame-src 'self'; " +
    "manifest-src 'self'; " +
    "media-src 'self'; " +
    "object-src 'none'; " +
    "script-src-attr 'none';" +
    "worker-src 'self' blob:; " +
    "upgrade-insecure-requests"
  );
  // `access-control-allow-origin ${cors_headers};`
};

const policies = [
  helmet.crossOriginEmbedderPolicy({
    policy: "credentialless",
  }),
  helmet.crossOriginOpenerPolicy(),
  helmet.crossOriginResourcePolicy(),
  helmet.dnsPrefetchControl(),
  helmet.frameguard(),
  helmet.hidePoweredBy(),
  helmet.hsts(),
  helmet.ieNoOpen(),
  helmet.noSniff(),
  helmet.originAgentCluster(),
  helmet.permittedCrossDomainPolicies(),
  helmet.referrerPolicy(),
  helmet.xssFilter(),
];

export async function middleware(request: NextRequest) {
  let lng;
  if (request.cookies.has(cookieName))
    lng = acceptLanguage.get(request.cookies.get(cookieName)?.value);
  if (!lng) lng = acceptLanguage.get(request.headers.get("Accept-Language"));
  if (!lng) lng = fallbackLng;

  if (
    !languages.some((loc) => request.nextUrl.pathname.startsWith(`/${loc}`)) &&
    !request.nextUrl.pathname.startsWith("/_next")
  ) {
    return NextResponse.redirect(
      new URL(`/${lng}${request.nextUrl.pathname}`, request.url),
    );
  }

  const referrer = request.headers.get("referrer");
  if (referrer) {
    const refererUrl = new URL(referrer);
    const lngInReferer = languages.find((l) =>
      refererUrl.pathname.startsWith(`/${l}`),
    );
    const response = NextResponse.next();
    if (lngInReferer) response.cookies.set(cookieName, lngInReferer);
    return response;
  }

  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");
  const cspHeader = getContentSecurityPolicy(nonce);

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-nonce", nonce);
  requestHeaders.set("Content-Security-Policy", cspHeader);

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
  response.headers.set("Content-Security-Policy", cspHeader);

  // CSRF
  const csrf = new CSRF({ secret: Environment.NEXT_PUBLIC_CRYPTO_SECRET_KEY });
  const hasCookie = request.cookies.has(COOKIE_CSRF_NAME);
  let csrfToken;
  if (hasCookie) {
    csrfToken = request.cookies.get(COOKIE_CSRF_NAME)?.value;
  } else {
    csrfToken = csrf.generate();
    response.cookies.set({
      name: COOKIE_CSRF_NAME,
      value: csrfToken,
      httpOnly: true,
      path: "/",
      sameSite: "strict",
      secure: true,
    });
  }

  const helmetAdapter = makeHelmetAdapter(response);
  policies.forEach((policy) => policy(...helmetAdapter));

  return response;
}
