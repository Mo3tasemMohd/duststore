'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/lib/useAuth';

export function AddReceiptForm() {
    const { toast } = useToast();
    const { token } = useAuth();

    console.log({ token });

    const handleSubmit = React.useCallback(
        (e: React.SyntheticEvent) => {
            e.preventDefault();
            const { name, phone, receipt, referCode, description } = e.target;

            fetch(`${process.env.NEXT_PUBLIC_API_URL}/dust/addReceit/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    receipt_owner_name: name.value,
                    receipt_owner_phone: phone.value,
                    receit_description: description.value || '',
                    receipt_price: receipt.value,
                    receipt_owner_referalcode: referCode.value,
                }),
            })
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
        [toast]
    );

    return (
        <div className="grid w-full max-w-sm items-center gap-2 m-auto mt-20">
            <h1 className="font-extrabold text-3xl text-center mb-16">
                Add Receipt
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
                <Button type="submit" className="mt-2">
                    Add Receipt
                </Button>
            </form>
        </div>
    );
}
