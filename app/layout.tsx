import { ClerkProvider } from '@clerk/nextjs';
import './globals.css';

export const metadata = { title: 'Tier-Based Event Showcase' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ClerkProvider>
          {children}
        </ClerkProvider>
      </body>
    </html>
  );
}
