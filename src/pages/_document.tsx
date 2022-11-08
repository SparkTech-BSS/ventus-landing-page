import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="pt-ao" style={{ scrollBehavior: "smooth" }}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Koulen&family=Passion+One:wght@400;700;900&display=swap"
          rel="stylesheet"
        />

        <link rel="shortcut icon" href="/favicon.svg" type="image/svg+xml" />
      </Head>
      <body>
        <Main />

        <NextScript />
      </body>
    </Html>
  );
}
