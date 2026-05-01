import type { Metadata } from 'next';
import { Kumbh_Sans } from 'next/font/google';
import './globals.css';
import Providers from './providers'; 

// Kumbh Sans is a variable font, so we don't need the weight array!
const kumbhSans = Kumbh_Sans({ 
    subsets: ['latin'],
    display: 'swap' 
});

export const metadata: Metadata = {
    title: 'Orbit Product Dashboard',
    description: 'High-performance product management interface',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body suppressHydrationWarning className={kumbhSans.className}>
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}