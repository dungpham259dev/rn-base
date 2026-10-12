import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { ThemeProvider } from "~/components/ui/theme";
import { Toaster } from "~/components/ui/toast";
import { cn } from "~/components/ui/utils";
import { AppProviders } from "~/core/providers";

import "~/app/styles.css";

export const metadata: Metadata = {
  title: { default: "RN Base", template: "%s | RN Base" },
  description: "Expo + Next.js monorepo boilerplate",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});
const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body
        className={cn(
          "bg-background text-foreground min-h-screen font-sans antialiased",
          geistSans.variable,
          geistMono.variable,
        )}
      >
        <ThemeProvider>
          <AppProviders>{props.children}</AppProviders>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
