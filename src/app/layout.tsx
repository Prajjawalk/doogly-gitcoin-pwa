import type { Metadata } from "next";
import { Itim } from "next/font/google";
import "./globals.css";
import Providers from "./providers";

export const metadata: Metadata = {
  title: "Doogly",
  description:
    "Doogly is a mobile-friendly donation platform for gitcoin projects",
};

const itim = Itim({
  weight: "400",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* <Head>
        <title>Doogly App</title>
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#ebedff" />
      </Head> */}

      <body className={itim.className}>
        {" "}
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
