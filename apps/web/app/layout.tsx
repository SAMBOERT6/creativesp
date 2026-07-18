import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'CreativeSP',
  description: 'Enterprise competition management and voting platform',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
