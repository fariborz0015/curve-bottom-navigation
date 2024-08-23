import Image from "next/image";
import { Inter } from "next/font/google";
import BottomNavigation from "@/components/BottomNavigation";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className={`  overflow-hidden max-w-md w-full bg-white mx-auto h-screen  ${inter.className}`}>
      <BottomNavigation />
    </main>
  );
}
