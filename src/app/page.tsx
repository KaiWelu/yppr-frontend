"use client";

import LoginForm from "@/components/ui/LoginForm";
import YpprBanner from "@/components/ui/YpprBanner";
import { useEffect, useState } from "react";

export default function Home() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Trigger the animation after first mount
    setVisible(true);
  }, []);

  return (
    <main className="">
      <div
      /*  className={`transition-opacity duration-1200 ease-in-out ${
          visible ? "opacity-100" : "opacity-0"
        }`} */
      >
        <YpprBanner />
        <LoginForm />
      </div>
    </main>
  );
}
