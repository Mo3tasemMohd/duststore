'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/lib/useAuth';

export function AddReceiptForm() {
    const { toast } = useToast();
    const { token } = useAuth();

    console.log(token);

    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();
        // @ts-expect-error
        const { name, phone, receipt, referCode, description } = e.target;

        fetch(`${process.env.NEXT_PUBLIC_API_URL}/dust/addReceit/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({
                receipt_owner_name: name.value,
                receipt_owner_phone: phone.value,
                receit_description: description.value || '',
                receipt_price: receipt.value,
                receipt_owner_referalcode: referCode.value,
            }),
        })
            .then((res) => {
                if (res.ok) {
                    toast({
                        title: 'Receipt added successfully!',
                        variant: 'default',
                    });
                } else {
                    return res.json().then((data) => {
                        const description = data.Error || Object.values(data)[0][0];

                        toast({
                            title: 'Something went wrong!',
                            description,
                            variant: 'destructive',
                        });
                    });
                }
            })
            .catch((error) => {
                console.log(error);
                toast({
                    title: 'Something went wrong!',
                    description: 'Unable to add receipt.',
                    variant: 'destructive',
                });
            });
    };

    return (
        <div className="grid w-full max-w-sm items-center gap-2 m-auto mt-20 main-card">
        <h1 className="font-extrabold text-3xl text-center mb-16">
        RECEIPT
        </h1>

        <form
            onSubmit={handleSubmit}
            className="grid w-full max-w-sm items-center gap-2 m-auto"
        >
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
            <Input name="referCode" placeholder="Refer Code" required />
            <Input name="description" placeholder="Description" />
            <button type="submit" className="mt-2">
                ADD RECEIPT
            </button>
        </form>
    </div>    );
}