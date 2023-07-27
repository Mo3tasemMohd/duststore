'use client';

import * as React from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/lib/useAuth';
import { useRouter } from 'next/navigation';

export function LoginForm() {
    const { toast } = useToast();
    const { saveToken, saveUser } = useAuth();
    const router = useRouter();

    const handleSubmit = React.useCallback(
        (e: React.SyntheticEvent) => {
            e.preventDefault();
            // @ts-expect-error
            const { username, password } = e.target;

            fetch(`${process.env.NEXT_PUBLIC_API_URL}/dust/login/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username.value,
                    password: password.value,
                }),
            })
                .then((res) => Promise.all([res.json(), !res.ok]))
                .then(([res, error]) => {
                    if (error) {
                        const description = res.Error || Object.values(res)[0];

                        toast({
                            title: 'Something went wrong!',
                            description,
                            variant: 'destructive',
                        });
                        return;
                    }
                    saveUser(res.user);
                    saveToken(res.access);
                    console.log(res.access);

                    location.replace('/')
                });
        },
        [router, saveToken, saveUser, toast]
    );

    return (
        <div className="grid w-full max-w-sm items-center gap-2 m-auto mt-20 main-card">
            <h1 className="font-extrabold text-3xl text-center mb-16">LOGIN</h1>
            <form onSubmit={handleSubmit} className="grid items-center gap-1.5">
                <Input name="username" placeholder="Username" required />
                <Input
                    name="password"
                    placeholder="Password"
                    type="password"
                    required
                />
                <button className="mt-2" type="submit">
                    LOG-IN
                </button>
            </form>
        </div>
    );
}
