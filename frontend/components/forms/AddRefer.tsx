'use client';

import * as React from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/lib/useAuth';

export function AddReferForm() {
    const [referCode, setReferCode] = React.useState(null);
    const { toast } = useToast();
    const { token } = useAuth();

    const handleSubmit = React.useCallback((e: React.SyntheticEvent) => {
        e.preventDefault();
        setReferCode(null);
        const { name, phone, receipt } = e.target;

        fetch(`${process.env.NEXT_PUBLIC_API_URL}/addRefercustomer/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                referCustomer_name: name.value,
                referCustomer_phone: phone.value,
                referCustomer_receipt: receipt.value,
            }),
        })
            .then((res) => Promise.all([res.json(), !res.ok]))
            .then(([res, error]) => {
                if (error) {
                    const description = res.Error || Object.values(res)[0][0];

                    toast({
                        title: 'Something went wrong!',
                        description,
                        variant: 'destructive',
                    });
                    return;
                }

                setReferCode(() => res.referCustomer_code);
            });
    }, []);

    return (
        <div className="grid w-full max-w-sm items-center gap-2 m-auto mt-20">
            <h1 className="font-extrabold text-3xl text-center mb-16">
                Refer Customer
            </h1>
            <form onSubmit={handleSubmit} className="grid items-center gap-1.5">
                <Input name="name" placeholder="Name" required />
                <Input
                    name="phone"
                    placeholder="Phone Number"
                    type="tel"
                    required
                />
                <Input
                    name="receipt"
                    placeholder="Receipt Value"
                    type="number"
                    required
                />
                <Button className="mt-2" type="submit">
                    Add Refer
                </Button>
            </form>
            {referCode ? (
                <p className="text-lg text-center font-bold">
                    Refer Code: {referCode}
                </p>
            ) : null}
        </div>
    );
}
