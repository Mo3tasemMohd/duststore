"use client";

import * as React from "react";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";

export function AddReceiptForm() {
    const [referCode, setReferCode] = React.useState(null)
    const { toast } = useToast()

    const handleSubmit = React.useCallback((e: React.SyntheticEvent) => {
        e.preventDefault();
        const { name, phone, receipt, referCode, description } = e.target;

        fetch("http://localhost:8000/dust/addReceit/", {
            method: "POST",
            headers: { "Content-Type": "application/json",
            'Authorization': `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjg5NTM2MzgxLCJpYXQiOjE2ODk1MjQzODEsImp0aSI6Ijk1YmRlOWVmYzA3ODQ0MDM4ZDcwMWIwNDcxMzdlNGE1IiwidXNlcl9pZCI6MX0.uvbro9KWN5-c5EmdSbp9xH0Aw2xzNfomH7KoAV4M8r0`,
            },
            body: JSON.stringify({
                receipt_owner_name: name.value,
                receipt_owner_phone: phone.value,
                receit_description: description.value || '',
                receipt_price: receipt.value,
                receipt_owner_referalcode: referCode.value
            }),
        }).then(res => Promise.all([res.json(), !res.ok])).then(([res, error]) => {            
            if (error) {

                const description = res.Error || Object.values(res)[0][0]

                toast({
                    title: "Something went wrong!",
                    description,
                    variant: "destructive"
                })
            } 
        })
    }, [toast]);

    return (
        <>
            <form onSubmit={handleSubmit} className="grid w-full max-w-sm items-center gap-1.5 m-auto">
            <input name="name" placeholder="Name" required />
            <input name="phone" placeholder="Phone Number" type="tel" required />
            <input
                name="receipt"
                placeholder="Receipt Value"
                type="number"
                required
                />
            <input name='referCode' placeholder="Refer Code" required />
            <input name="description" placeholder="Description" />
            <Button type="submit">Add Receipt</Button>
            </form>
            {referCode ? <p>Refer Code: {referCode}</p> : null} 
        </>
    );
}

// {
//     "receipt_owner_name": [
//         "This field is required."
//     ],
//     "receipt_owner_phone": [
//         "This field is required."
//     ],
//     "receit_description": [
//         "This field is required."
//     ],
//     "receipt_price": [
//         "This field is required."
//     ]
// }