"use client";

import { useState, useEffect } from "react";
import { Sun, Moon, Sparkles, Zap } from "lucide-react";

const ThemeSwitcher = () => {
  const [theme, setTheme] = useState("cyber");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const themes = [
    { id: "cyber", icon: <Zap size={16} />, label: "CYBER" },
    { id: "luxury", icon: <Sparkles size={16} />, label: "LUXE" },
    { id: "vibrant", icon: <Sun size={16} />, label: "VIVID" },
  ];

  return (
    <div className="fixed bottom-10 right-10 z-[100] flex flex-col gap-3">
      {themes.map((t) => (
        <button
          key={t.id}
          onClick={() => setTheme(t.id)}
          className={`w-14 h-14 rounded-full flex flex-col items-center justify-center transition-all duration-500 shadow-2xl border ${
            theme === t.id 
              ? "bg-primary text-background scale-110 border-transparent" 
              : "bg-background text-foreground border-foreground/10 hover:border-primary"
          }`}
        >
          {t.icon}
          <span className="text-[8px] font-black mt-1 tracking-tighter">{t.label}</span>
        </button>
      ))}
    </div>
  );
};

export default ThemeSwitcher;
