import { AuthStatus } from '@/components/AuthStatus';
import Link from 'next/link';

import './style.css'

export default function Home() {
    return (
        <main >
            <div className="max-w-5xl mx-auto mt-12">

                <div className="flex gap-2 flex-col underline text-xl font-bold">
                    <Link href="/refer/add">Refer</Link>
                    <Link href="/receipt/add">Add Receipt</Link>
                    <Link href="/receipt/get">Get Receipt</Link>
                </div>
            </div>
        </main>
    );
}
