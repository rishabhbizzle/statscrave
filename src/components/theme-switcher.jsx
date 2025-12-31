"use client";

import * as React from "react";
import { Palette, Check, Sun, Moon, Sparkles } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

const themes = [
  // Current & Recommended
  { id: "default", name: "Original Green", description: "Current StatsCrave theme", color: "hsl(142.1, 76.2%, 36.3%)", category: "current" },
  { id: "midnight-teal", name: "Midnight Teal", description: "Spotify-esque cool vibes", color: "hsl(190, 95%, 50%)", category: "recommended" },
  { id: "electric-purple", name: "Electric Purple", description: "Vibrant & youthful", color: "hsl(262.1, 83.3%, 57.8%)", category: "recommended" },
  { id: "glass-blue", name: "Glass Blue", description: "Apple-inspired elegance", color: "hsl(210, 100%, 62%)", category: "recommended" },
  { id: "liquid-glass", name: "Liquid Glass", description: "iOS 26 futuristic trend", color: "hsl(211, 100%, 55%)", category: "recommended" },
  
  // Music Platforms
  { id: "apple-music", name: "Apple Music", description: "Signature red pink", color: "hsl(350, 89%, 55%)", category: "music" },
  { id: "soundcloud", name: "SoundCloud", description: "Vibrant orange", color: "hsl(25, 100%, 50%)", category: "music" },
  { id: "tidal", name: "Tidal", description: "Premium teal", color: "hsl(178, 75%, 45%)", category: "music" },
  { id: "youtube-music", name: "YouTube Music", description: "Bold red", color: "hsl(0, 100%, 50%)", category: "music" },
  { id: "deezer", name: "Deezer", description: "Purple vibes", color: "hsl(280, 70%, 50%)", category: "music" },
  
  // Tech Companies
  { id: "vercel", name: "Vercel", description: "Sleek black & white", color: "hsl(0, 0%, 50%)", category: "tech" },
  { id: "linear", name: "Linear", description: "SaaS purple-blue", color: "hsl(245, 58%, 51%)", category: "tech" },
  { id: "stripe", name: "Stripe", description: "Elegant indigo", color: "hsl(250, 85%, 63%)", category: "tech" },
  { id: "discord", name: "Discord", description: "Signature blurple", color: "hsl(235, 86%, 65%)", category: "tech" },
  { id: "github", name: "GitHub", description: "Developer green", color: "hsl(137, 55%, 36%)", category: "tech" },
  { id: "slack", name: "Slack", description: "Purple aubergine", color: "hsl(283, 68%, 34%)", category: "tech" },
  { id: "notion", name: "Notion", description: "Warm minimal", color: "hsl(37, 5%, 20%)", category: "tech" },
  { id: "twitter", name: "Twitter/X", description: "Modern social vibes", color: "hsl(204, 88%, 53%)", category: "tech" },
  
  // Developer Favorites
  { id: "catppuccin", name: "Catppuccin", description: "Popular dev favorite", color: "hsl(267, 84%, 81%)", category: "dev" },
  { id: "dracula", name: "Dracula", description: "Classic dark theme", color: "hsl(265, 89%, 78%)", category: "dev" },
  { id: "nord", name: "Nord", description: "Calm Scandinavian", color: "hsl(193, 43%, 67%)", category: "dev" },
  { id: "tokyo-night", name: "Tokyo Night", description: "Japanese city aesthetic", color: "hsl(190, 95%, 50%)", category: "dev" },
  { id: "gruvbox", name: "Gruvbox", description: "Retro warm tones", color: "hsl(27, 61%, 50%)", category: "dev" },
  { id: "one-dark", name: "One Dark Pro", description: "VS Code favorite", color: "hsl(207, 82%, 66%)", category: "dev" },
  { id: "ayu", name: "Ayu Mirage", description: "Soft yellows & teals", color: "hsl(35, 90%, 60%)", category: "dev" },
  { id: "solarized", name: "Solarized", description: "Eye-friendly classic", color: "hsl(175, 59%, 40%)", category: "dev" },
  { id: "palenight", name: "Palenight", description: "Rich purple & cyan", color: "hsl(261, 90%, 68%)", category: "dev" },
  
  // 2026 Trends
  { id: "neo-brutal", name: "Neo Brutalist", description: "Bold 2026 trend", color: "hsl(47, 100%, 50%)", category: "trendy" },
  { id: "rose-gold", name: "Rose Gold", description: "Warm & premium", color: "hsl(12, 76%, 61%)", category: "trendy" },
  { id: "sunset", name: "Sunset Orange", description: "Warm & energetic", color: "hsl(24, 95%, 53%)", category: "trendy" },
  { id: "synthwave", name: "Synthwave", description: "Retro 80s neon", color: "hsl(318, 91%, 63%)", category: "trendy" },
  { id: "aurora", name: "Aurora", description: "Dreamy gradients", color: "hsl(280, 70%, 60%)", category: "trendy" },
  { id: "monochrome", name: "Monochrome", description: "Pure black & white", color: "hsl(0, 0%, 50%)", category: "trendy" },
  { id: "coral", name: "Coral Sunset", description: "Trendy warm coral", color: "hsl(16, 85%, 65%)", category: "trendy" },
  { id: "forest", name: "Forest", description: "Nature inspired", color: "hsl(152, 55%, 35%)", category: "trendy" },
  { id: "bento", name: "Bento", description: "Playful pastels", color: "hsl(339, 70%, 65%)", category: "trendy" },
  { id: "y3k", name: "Y3K Chrome", description: "Futuristic metallic", color: "hsl(280, 80%, 55%)", category: "trendy" },
];

export function ThemeSwitcher() {
  const { theme: darkMode, setTheme: setDarkMode } = useTheme();
  const [colorTheme, setColorTheme] = React.useState("default");
  const [mounted, setMounted] = React.useState(false);

  // Prevent hydration mismatch
  React.useEffect(() => {
    setMounted(true);
    // Load saved color theme
    const saved = localStorage.getItem("statscrave-color-theme");
    if (saved) {
      setColorTheme(saved);
      applyTheme(saved);
    }
  }, []);

  const applyTheme = (themeId) => {
    const html = document.documentElement;
    // Remove all theme data attributes
    themes.forEach((t) => {
      if (t.id !== "default") {
        html.removeAttribute("data-theme");
      }
    });
    // Apply new theme
    if (themeId !== "default") {
      html.setAttribute("data-theme", themeId);
    }
  };

  const handleThemeChange = (themeId) => {
    setColorTheme(themeId);
    localStorage.setItem("statscrave-color-theme", themeId);
    applyTheme(themeId);
  };

  const toggleDarkMode = () => {
    setDarkMode(darkMode === "dark" ? "light" : "dark");
  };

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="w-9 px-0">
        <Palette className="h-5 w-5" />
      </Button>
    );
  }

  const currentTheme = themes.find((t) => t.id === colorTheme);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="w-9 px-0 relative">
          <Palette className="h-5 w-5" />
          <span
            className="absolute bottom-1 right-1 h-2 w-2 rounded-full border border-background"
            style={{ backgroundColor: currentTheme?.color }}
          />
          <span className="sr-only">Theme Switcher</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-72">
        <DropdownMenuLabel className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            <span>2026 Theme Preview</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="h-7 w-7 p-0"
            onClick={toggleDarkMode}
          >
            {darkMode === "dark" ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </Button>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <ScrollArea className="h-[400px]">
          <div className="p-1">
            {themes.map((t) => (
              <DropdownMenuItem
                key={t.id}
                onClick={() => handleThemeChange(t.id)}
                className={cn(
                  "flex items-center gap-3 cursor-pointer py-2.5 rounded-md mb-0.5",
                  colorTheme === t.id && "bg-accent"
                )}
              >
                <div
                  className="h-6 w-6 rounded-full border-2 border-background shadow-md shrink-0 ring-1 ring-border/50"
                  style={{ backgroundColor: t.color }}
                />
                <div className="flex flex-col flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="font-medium text-sm">{t.name}</span>
                    {t.category === "recommended" && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-primary/10 text-primary font-medium">
                        ★
                      </span>
                    )}
                    {t.category === "music" && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-pink-500/10 text-pink-500 font-medium">
                        🎵
                      </span>
                    )}
                    {t.category === "tech" && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-blue-500/10 text-blue-500 font-medium">
                        💻
                      </span>
                    )}
                    {t.category === "dev" && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 font-medium">
                        {"</>"}
                      </span>
                    )}
                    {t.category === "trendy" && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-orange-500/10 text-orange-500 font-medium">
                        🔥
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-muted-foreground truncate">
                    {t.description}
                  </span>
                </div>
                {colorTheme === t.id && (
                  <Check className="h-4 w-4 text-primary shrink-0" />
                )}
              </DropdownMenuItem>
            ))}
          </div>
        </ScrollArea>
        <DropdownMenuSeparator />
        <div className="px-3 py-2 flex items-center justify-between">
          <span className="text-xs text-muted-foreground">
            {themes.length} themes available
          </span>
          <span className="text-xs text-primary font-medium">
            {currentTheme?.name}
          </span>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

