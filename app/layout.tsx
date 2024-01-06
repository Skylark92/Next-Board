import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import LoginBtn from "./LoginBtn";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import LogoutBtn from "./LogoutBtn";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Next Board",
  description: "Next로 만들어보는 게시판",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="navbar">
          <Link href="/" className="logo">
            Shine Forum
          </Link>
          <Link href="/list">List</Link>
          {session?.user ? (
            <span>
              {session?.user.name}님
              <LogoutBtn />
            </span>
          ) : (
            <LoginBtn />
          )}
        </div>
        {children}
      </body>
    </html>
  );
}
