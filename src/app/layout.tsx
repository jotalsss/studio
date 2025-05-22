import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import './globals.css';
import { AppProviders } from '@/components/providers';
import AppLayout from '@/components/layout/app-layout';

// GeistSans is an object with .variable and .className properties.
// It's not a function to be called like fonts from next/font/google.

export const metadata: Metadata = {
  title: 'Conta Clara - Financial Control',
  description: 'Your simple and complete financial control app.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${GeistSans.variable} font-sans antialiased`}>
        <AppProviders>
          <AppLayout>{children}</AppLayout>
        </AppProviders>
      </body>
    </html>
  );
}
