import './globals.css';
import { Cormorant_Garamond, Manrope } from 'next/font/google';

const serif = Cormorant_Garamond({
  subsets: ['latin'], weight: ['400', '500', '600'], style: ['normal', 'italic'],
  display: 'swap', variable: '--font-serif',
});
const sans = Manrope({
  subsets: ['latin'], weight: ['400', '500', '600'],
  display: 'swap', variable: '--font-sans',
});

export const metadata = {
  title: 'aryma.rip — After the rain',
  description: 'A quiet rebellion against a world that forgot how to wonder. Original reflections, rain, and a song after the end.',
  icons: { icon: '/assets/favicon.svg' },
};
export const viewport = { themeColor: '#17192d' };

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
