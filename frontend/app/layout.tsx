import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from '@/components/ui/toaster';
import { Footer } from '@/components/Footer';
import { NavBar } from '@/components/Navbar';

import 'bootstrap/dist/css/bootstrap.css';


const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Dust Store',
    description: 'Clothing Store',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <div className=' min-h-screen flex flex-col gap-20 bg-dustPrimary'>
                    <NavBar/>
                    <div className='flex-1'>
                    {children}
                    </div>
                    <Footer/>
                </div>
                <Toaster />
            </body>
        </html>
    );
}
