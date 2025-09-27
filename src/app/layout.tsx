import AnimatedBackground from "@/components/ui/AnimatedBackground";
import { DarkModeProvider } from "@/components/DarkModeProvider";
import './globals.css';
import TwinklingStars from "./settings/twinkle";
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="font-satoshi">
      <head>
        <link href="https://api.fontshare.com/v2/css?f[]=satoshi@900,700,500,400&display=swap" rel="stylesheet" />
      </head>
      <body>
        <DarkModeProvider>
          <TwinklingStars />
          <div className="relative z-10">{children}</div>
        </DarkModeProvider>
      </body>
    </html>
  )
}
