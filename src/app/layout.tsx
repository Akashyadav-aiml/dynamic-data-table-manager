import type { Metadata } from 'next';
import './globals.css';
import ReduxProvider from '@/providers/ReduxProvider';
import ThemeProvider from '@/providers/ThemeProvider';

export const metadata: Metadata = {
  title: 'Dynamic Data Table Manager',
  description: 'A powerful data table manager with sorting, filtering, and CSV import/export',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
