"use client";

import Sidebar from "@/components/sidebar/page";
import "./globals.css";
import { Provider } from "react-redux";
import { store } from "@/redux/store";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-BgColor font-poppins">
        <div className="flex">
          <Sidebar />
          <main className="flex-1">
            <Provider store={store}>{children}</Provider>
          </main>
        </div>
      </body>
    </html>
  );
}
