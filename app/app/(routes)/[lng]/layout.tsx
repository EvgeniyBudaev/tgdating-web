import type { Metadata } from "next";
import { cookies } from "next/headers";
import Script from "next/script";
import type { ReactNode } from "react";
import { Environment } from "@/app/environment";
import { I18nContextProvider } from "@/app/i18n/context";
import { InitClient } from "@/app/shared/components/init";
import { Layout as LayoutComponent } from "@/app/shared/components/layout";
import { COOKIE_CSRF_NAME } from "@/app/shared/constants";
import { ELanguage } from "@/app/shared/enums";
import { ClientOnly } from "@/app/uikit/components/clientOnly";
import "@/app/styles/reset.css";
import "@/app/styles/_index.scss";

export const metadata: Metadata = {
  title: "Telegram dating",
  description: "Telegram dating",
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: ReactNode;
  params: Promise<{ lng: ELanguage }>;
}>) {
  const { lng } = await params;
  const isProduction = Environment?.NEXT_PUBLIC_NODE_ENV === "production";
  const cookiesStore = await cookies();
  const csrfToken: string | undefined =
    cookiesStore.get(COOKIE_CSRF_NAME)?.value;

  return (
    <html lang={lng}>
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
        {/*<meta name="viewport" content="viewport-fit=cover"/>*/}
        {isProduction && (
          <Script
            src="https://telegram.org/js/telegram-web-app.js"
            strategy="beforeInteractive"
          />
        )}
        <title>Love</title>
      </head>
      <body>
        {csrfToken && (
          <I18nContextProvider lng={lng}>
            <ClientOnly>
              <InitClient />

              <LayoutComponent lng={lng} csrfToken={csrfToken}>
                {children}
              </LayoutComponent>
            </ClientOnly>
          </I18nContextProvider>
        )}
      </body>
    </html>
  );
}
