import "./globals.css";
import { Providers } from "./providers";
import { Poppins, Merriweather } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-merriweather",
});

export const metadata = {
  title: "Fable",
  description: "Ebook Sharing Platform",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${merriweather.variable}`}
    >
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}