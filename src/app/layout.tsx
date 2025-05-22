import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import './globals.css';
import { AppProviders } from '@/components/providers';
import AppLayout from '@/components/layout/app-layout';

export const metadata: Metadata = {
  title: 'Conta Clara - Controle Financeiro',
  description: 'Seu aplicativo de controle financeiro simples e completo.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${GeistSans.variable} font-sans antialiased`}>
        <AppProviders>
          <AppLayout>{children}</AppLayout>
        </AppProviders>
      </body>
    </html>
  );
}
