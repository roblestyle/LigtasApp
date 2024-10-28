import { Inter, Play } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const play = Play({ weight: ["400", "700"], subsets: ["latin"] });


export const metadata = {
  title: "SafeSpartan - Batangas State University",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
