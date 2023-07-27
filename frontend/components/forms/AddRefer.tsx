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

    console.log(token);

    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();
        setReferCode(null);
        // @ts-expect-error
        const { name, phone, receipt } = e.target;
      
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/dust/addRefercustomer/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({
            referCustomer_name: name.value,
            referCustomer_phone: phone.value,
            referCustomer_receipt: receipt.value,
          }),
        })
          .then((res) => res.json())
          .then((res) => {
            if (res.referCustomer_code) {
              setReferCode(res.referCustomer_code);
            } else {
              const description = res.Error || Object.values(res)[0];
      
              toast({
                title: 'Something went wrong!',
                description,
                variant: 'destructive',
              });
            }
          })
          .catch((error) => {
            console.log(error);
            toast({
              title: 'Something went wrong!',
              description: 'Unable to add refer.',
              variant: 'destructive',
            });
          });
      };

    return (
        <div className="grid w-full max-w-sm items-center gap-2 m-auto mt-20 main-card">
            <h1 className="font-extrabold text-3xl text-center mb-16">
                REFER CUSTOMER
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
                <button type="submit">
                    ADD REFER CUSTOMER
                </button>
            </form>
            {referCode ? (
                <p className="text-lg text-center font-bold code">
                    REFERAL CODE: {referCode}
                </p>
            ) : null}
        </div>
    );
}
