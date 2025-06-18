"use client";

import LoginForm from "@/components/ui/LoginForm";
import { useEffect, useState } from "react";

export default function Home() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Trigger the animation after first mount
    setVisible(true);
  }, []);

  return (
    //<main className="relative h-screen w-full [&>div]:absolute [&>div]:top-0 [&>div]:left-0 [&>div]:z-[-2] [&>div]:h-full [&>div]:w-full [&>div]:bg-gradient-to-r [&>div]:from-red-200 [&>div]:to-yellow-200">
    <main className="h-screen w-full bg-linear-to-bl/longer from-yellow-200 via-orange-200 to-indigo-300">
      <div className="text-black p-5 font-primary font-light">HALO</div>
      <div
        className={`transition-opacity duration-700 ease-in-out ${
          visible ? "opacity-100" : "opacity-0"
        }`}
      >
        <LoginForm />
      </div>
    </main>
  );
}
