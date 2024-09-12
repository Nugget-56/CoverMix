import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css";

export const metadata = {
  title: "CoverMix",
  description: "Generate custom Spotify playlist cover art",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
      <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            {children}
      </ThemeProvider>
      </body>
    </html>
  );
}
