import type { Metadata } from 'next';
import { Outfit, Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CustomCursor } from '@/components/ui/CustomCursor';
import { ScrollProgress } from '@/components/ui/ScrollProgress';
import { PageIntro } from '@/components/ui/PageIntro';
import { PageTransition } from '@/components/ui/PageTransition';
import { AuthProvider } from '@/context/AuthContext';

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  weight: ['600', '700', '800', '900'],
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['400', '500', '600', '700', '800', '900'],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  weight: ['500', '700'],
});

export const metadata: Metadata = {
  title: 'RAYU — Thinking as it happens | Raw. Awareness. Unfiltered.',
  description:
    "Tech. World. Life. Whatever's actually on my mind — posted as it happens, not after it's been cleaned up.",
  keywords: [
    'RAYU',
    'Unfiltered Commentary',
    'Tech',
    'World',
    'Life',
    'AI',
    'Independent Journal',
  ],
  authors: [{ name: 'RAYU' }],
  openGraph: {
    title: 'RAYU — Thinking as it happens',
    description:
      'RAW AWARENESS. STRAIGHT TO YOU. UNFILTERED. An independent running commentary on tech, the world, life, and ideas.',
    url: 'https://rayu.com',
    siteName: 'RAYU',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RAYU — Thinking as it happens',
    description: 'RAW AWARENESS. STRAIGHT TO YOU. UNFILTERED.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${inter.variable} ${jetbrainsMono.variable} dark`}
    >
      <body className="bg-[#050505] text-[#EBEBEB] antialiased selection:bg-[#CCFF00] selection:text-[#050505] font-sans min-h-screen flex flex-col relative bg-grain-animated">
        <AuthProvider>
          <PageIntro />
          <ScrollProgress />
          <CustomCursor />
          <Header />
          <PageTransition>
            <main className="flex-grow">{children}</main>
          </PageTransition>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
