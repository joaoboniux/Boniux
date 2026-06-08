import localFont from "next/font/local";

/**
 * Clash Display — headings grandes (display).
 * Fonte variável self-hosted (Fontshare).
 */
export const clashDisplay = localFont({
  src: "../fonts/ClashDisplay-Variable.woff2",
  variable: "--font-display",
  weight: "200 700",
  display: "swap",
});

/**
 * Satoshi — textos de apoio (sans).
 * Fonte variável self-hosted (Fontshare).
 */
export const satoshi = localFont({
  src: "../fonts/Satoshi-Variable.woff2",
  variable: "--font-sans",
  weight: "300 900",
  display: "swap",
});
