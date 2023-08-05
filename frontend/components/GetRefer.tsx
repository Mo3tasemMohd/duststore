'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/lib/useAuth';
import { useState } from 'react';

export function GetRefer() {
    const { toast } = useToast();
    const { token } = useAuth();


    console.log(token); 

    const [refers, setRefers] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);

    const getAllRefers = () => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/dust/refercustomers/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
                },
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                } else {
                    throw new Error('Unable To Retrieve Refers.');
                }
            })  
            .then((data) => {
                setRefers(data);
                setIsLoading(false);
            })
            .catch((error) => {
                console.log(error);
                toast({
                    title: 'Something went wrong!',
                    description: 'Unable to retrieve Refers.',
                    variant: 'destructive',
                });
            });
    }; 

    React.useEffect(() => {
        if(!token){return;}
        getAllRefers();
    }, [token]);

     
      
    if (isLoading){
        return null;
    }
    return (
        <div className="grid w-full max-w-sm items-center gap-2 m-auto mt-20 main-card">
            
            {refers.length === 0 &&(
                <p className="text-center">No Refers Found.</p>
            )}
            {refers.length > 0 && (
                <ul className="list-disc list-inside">
                    {refers.map((refer) => (
                        <h1 key={refer.id}>
        <div className="rounded-lg shadow-md p-4 customer-card">
            <p>NAME: {refer.referCustomer_name}</p>
            <p>MOBILE: {refer.referCustomer_phone}</p>
            <p>REFERAL CODE: {refer.referCustomer_code}</p>
            <p>RECEIPT: {refer.referCustomer_receipt}</p>
            <p>DEAL DATE: {new Date(refer.created_at).toLocaleDateString()}</p>
            <p>
                FIRST 15 DAYS DEALS: {refer.ReferCustomer_deals_totalpricefirst15days}
            </p>
            <p>
                LAST 15 DAYS DEALS: {refer.ReferCustomer_deals_totalpricelast15days}
            </p>
            <p>
                CASHBACK:{' '}
                {(
                    Math.round(
                        (refer.ReferCustomer_deals_totalpricefirst15days * 0.1 +
                            refer.ReferCustomer_deals_totalpricelast15days * 0.05) * 100) / 100
                ).toFixed(2)}{' '}
                L.E
            </p>
        </div>
                        </h1>
                    ))}
                </ul>
            )}
        </div>
    );
}
