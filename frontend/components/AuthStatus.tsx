'use client';

import { useAuth } from '@/lib/useAuth';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function AuthStatus() {
    const { user, logout } = useAuth();

    return (
        <div className="flex gap-2 align-center justify-end">
            {user ? (
                <div className="flex gap-2">
                    <p className="leading-9">{user.username}</p>
                    <Button onClick={logout}>Logout</Button>
                </div>
            ) : (
                <>
                    <Link href="/register">Register</Link>
                    <Link href="/login">Login</Link>
                </>
            )}
        </div>
    );
}
