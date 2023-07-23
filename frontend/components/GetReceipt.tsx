'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/lib/useAuth';

export function GetReceipt() {
    const { toast } = useToast();
    //const { token } = useAuth();

    const getReceipt = React.useCallback(
        (e: React.SyntheticEvent) => {
            e.preventDefault();

            fetch(
                // @ts-expect-error
                `${process.env.NEXT_PUBLIC_API_URL}/dust/receits/${e.target.code.value}`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                       // Authorization: `Bearer ${token}`,
                    },
                }
            )
                .then((res) => Promise.all([res.json(), !res.ok]))
                .then(([res, error]) => {
                    if (error) {
                        const description =
                            res.Error || Object.values(res)[0][0];

                        toast({
                            title: 'Something went wrong!',
                            description,
                            variant: 'destructive',
                        });
                    }
                });
        },
        [toast]//, token]
    );

    return (
        <form
            onSubmit={getReceipt}
            className="grid w-full max-w-sm items-center gap-2 m-auto mt-20"
        >
            <Input name="code" placeholder="Code" required />
            <Button className="mt-2" type="submit">
                Get Receipt
            </Button>
        </form>
    );
}
