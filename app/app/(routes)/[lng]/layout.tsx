import type { Metadata } from "next";
import Script from "next/script";
import type { ReactNode } from "react";
import { Environment } from "@/app/environment";
import { I18nContextProvider } from "@/app/i18n/context";
import { InitClient } from "@/app/shared/components/init";
import { Layout as LayoutComponent } from "@/app/shared/components/layout";
import { ELanguage } from "@/app/shared/enums";
import { ToastContainer } from "@/app/uikit/components/toast/toastContainer";
import "react-toastify/dist/ReactToastify.css";
import "@/app/styles/_index.scss";

export const metadata: Metadata = {
  title: "Love",
  description: "Love assistant",
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

  return (
    <html lang={lng}>
      <head>
        {isProduction && (
          <Script
            src="https://telegram.org/js/telegram-web-app.js"
            strategy="beforeInteractive"
          />
        )}
        <title>Love</title>
      </head>
      <body>
        <I18nContextProvider lng={lng}>
          <InitClient />
          <ToastContainer />
          <LayoutComponent lng={lng}>{children}</LayoutComponent>
        </I18nContextProvider>
      </body>
    </html>
  );
}
