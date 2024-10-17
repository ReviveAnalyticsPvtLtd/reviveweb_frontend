import { Inter } from "next/font/google";
import "./globals.css";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Revive Analytics",
  description: "Revive Analytics",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ background: '#EAEAEA' }} className={inter.className}>{children}</body>
    </html>
  );
}
