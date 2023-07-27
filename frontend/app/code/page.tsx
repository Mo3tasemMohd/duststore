import { AuthStatus } from '@/components/AuthStatus';
import Link from 'next/link';

import './style.css'

export default function Home() {
    return (
        <main >
            <div className="max-w-5xl mx-auto mt-12 main-card">

                <div className="flex gap-2 flex-col text-xl font-bold">
                    <Link href="/refer/add">REFER CUSTOMER</Link>
                    <Link href="/receipt/add">RECEIPT</Link>
                    <Link href="/receipt/get">PROMO RECEITS</Link>
                </div>
            </div>
        </main>
    );
}
