import { ThemeProvider } from "@/components/theme/theme-provider"
import { AuthProvider } from "@/context/authContext"
import { Toaster } from "sonner"
import "./globals.css";

export const metadata = {
  title: "CoverMix",
  description: "Generate custom Spotify playlist cover art",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body suppressHydrationWarning={true}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            {children}
          </AuthProvider>
        </ThemeProvider>
        <Toaster richColors={true} duration={3000} />
      </body>
    </html>
  );
}
