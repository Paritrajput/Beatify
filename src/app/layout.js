import { Inter } from "next/font/google";
import "./globals.css";

import MainLayout from "@/Components/MainLayout/Layout";
import { UserProvider } from "@/ContextApi/userContext";
import { MusicPlayerProvider } from "@/ContextApi/playContext";

import { LanguagePopup } from "@/Components/LanguagePage/Language";
import { PolicyPopup } from "@/Components/TermsandPrivacy/PrivacyPolicy";
import { TermsPopup } from "@/Components/TermsandPrivacy/Terms";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata = {
  title: "Beatify",
  description: "Music streaming app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased bg-black text-white`}>
        <UserProvider>
          <MusicPlayerProvider>
            <PolicyPopup />
            <LanguagePopup />
            <TermsPopup />

            <MainLayout>{children}</MainLayout>
          </MusicPlayerProvider>
        </UserProvider>
      </body>
    </html>
  );
}
