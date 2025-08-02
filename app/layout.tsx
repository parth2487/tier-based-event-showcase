import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "react-hot-toast";
import "./globals.css";

export const metadata = { title: "Tier-Based Event Showcase" };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ClerkProvider>
          {children}
          <Toaster position="top-right" reverseOrder={false} />
        </ClerkProvider>
      </body>
    </html>
  );
}
