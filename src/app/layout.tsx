import type { Metadata } from 'next';
import { Syne, DM_Sans } from 'next/font/google';
import './globals.css';
import { ToastProvider } from '@/components/ToastProvider';

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'AgriSense AI | Smart Crop Recommendations',
  description: 'AI-driven agriculture advisory platform for optimal crop yield and profitability.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${syne.variable} ${dmSans.variable}`}>
      <body style={{ fontFamily: 'var(--font-dm-sans)' }}>
        <ToastProvider>
          {children}
        </ToastProvider>
      </body>
    </html>
  );
}
