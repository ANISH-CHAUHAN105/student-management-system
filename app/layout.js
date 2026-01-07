// app/layout.js

import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ChatbotWidget from "@/components/ChatBotWidget";

export const metadata = {
  title: "MyApp",
  description:
    "Next.js app with Tailwind and dark/light theme using CSS variables",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="transition-colors">
      <body className="bg-background text-foreground flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 max-w-7xl mx-auto px-6 py-12">{children}</main>
        <Footer />
        <ChatbotWidget />
      </body>
    </html>
  );
}
