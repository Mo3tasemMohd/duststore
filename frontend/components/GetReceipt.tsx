'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/lib/useAuth';
import { useState } from 'react';

// export function GetReceipt() {
//     const { toast } = useToast();
//     const [receipts, setReceipts] = React.useState([]);

//     const getAllReceipts = () => {
//         fetch(`${process.env.NEXT_PUBLIC_API_URL}/dust/receits/MIDR002`, {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//         })
//             .then((res) => {
//                 if (res.ok) {
//                     return res.json();
//                 } else {
//                     throw new Error('Unable to retrieve receipts.');
//                 }
//             })
//             .then((data) => {
//                 setReceipts(data);
//             })
//             .catch((error) => {
//                 console.log(error);
//                 toast({
//                     title: 'Something went wrong!',
//                     description: 'Unable to retrieve receipts.',
//                     variant: 'destructive',
//                 });
//             });
//     };

//     React.useEffect(() => {
//         getAllReceipts();
//     }, []);

//     return (
//         <div className="grid w-full max-w-sm items-center gap-2 m-auto mt-20">
//             {receipts.length === 0 && (
//                 <p className="text-center">No receipts found.</p>
//             )}
//             {receipts.length > 0 && (
//                 <ul className="list-disc list-inside">
//                     {receipts.map((receipt) => (
//                         <li key={receipt.id}>
//                             <p>Receipt ID: {receipt.id}</p>
//                             <p>Name: {receipt.receipt_owner_name}</p>
//                             <p>Phone: {receipt.receipt_owner_phone}</p>
//                             <p>Description: {receipt.receit_description}</p>
//                             <p>Price: {receipt.receipt_price}</p>
//                             <p>Referral Code: {receipt.receipt_owner_referalcode}</p>
//                         </li>
//                     ))}
//                 </ul>
//             )}
//         </div>
//     );
// }

export function GetReceipt() {
    const { toast } = useToast();
    const [receipts, setReceipts] = useState({
        before15Days: [],
        after15Days: [],
    });
    const [customer, setCustomer] = useState(null);

    const getReceipts = async (e) => {
        e.preventDefault();

        try {
            const first15DayResponse = fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/dust/receits/${e.target.code.value}/first15days`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            const last15DayResponse = fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/dust/receits/${e.target.code.value}/last15days`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            const [first15DayPromise, last15DayPromise] = await Promise.all([
                first15DayResponse,
                last15DayResponse,
            ]);

            const {
                receipts: receipetsBefore15Days,
                refer_customer: customer,
            } = await first15DayPromise.json();
            const receipetsAfter15Days = await last15DayPromise.json();

            if (
                (receipetsBefore15Days &&
                    typeof receipetsBefore15Days[0] === 'string') ||
                (receipetsAfter15Days &&
                    typeof receipetsAfter15Days[0] === 'string')
            ) {
                toast({
                    title: 'Something went wrong!',
                    description: receipetsBefore15Days
                        ? receipetsBefore15Days[0]
                        : receipetsAfter15Days[0],
                    variant: 'destructive',
                });
                return;
            }

            if (receipetsBefore15Days || receipetsAfter15Days) {
                // Set the retrieved receipts in state
                setReceipts({
                    before15Days: receipetsBefore15Days,
                    after15Days: receipetsAfter15Days,
                });

                setCustomer(customer);
            }
        } catch (error) {
            toast({
                title: 'Something went wrong!',
                description: 'Please try again later.',
                variant: 'destructive',
            });
        }
    };

    return (
        <div className="grid w-full max-w-md items-center gap-4 m-auto mt-20 main-card">
            <h1 className="font-extrabold text-3xl text-center mb-16">
                RECEIPT
            </h1>

            <form
                onSubmit={getReceipts}
                className="grid w-full max-w-md items-center gap-4 m-auto"
            >
                <Input name="code" placeholder="Code" required />
                <button type="submit" className="mt-2">
                    GET RECEIPTS
                </button>
            </form>

            {customer ? <CustomerCard customer={customer} /> : null}

            {receipts?.before15Days.length > 0 && (
                <div className="grid gap-8 mt-8">
                    <h2 className="text-xl font-bold firstlast">
                        FIRST 15 DAYS DEALS
                    </h2>
                    {receipts?.before15Days.map((receipt) => (
                        <Receipt key={receipt.id} receipt={receipt} />
                    ))}
                </div>
            )}

            {receipts?.after15Days.length > 0 && (
                <div className="grid gap-8 mt-8">
                    <h2 className="text-xl">LAST 15 DAYS DEALS</h2>
                    {receipts?.after15Days.map((receipt) => (
                        <Receipt key={receipt.id} receipt={receipt} />
                    ))}
                </div>
            )}
        </div>
    );
}

function Receipt({ receipt }) {
    return (
        <div className=" rounded-lg shadow-md p-4 customer-card">
            <p>
                <strong>NAME:</strong> {receipt.receipt_owner_name}
            </p>
            <p>MOBILE: {receipt.receipt_owner_phone}</p>
            <p>RECEIPT: {receipt.receipt_price}</p>
            <p>DESCRIPTION: {receipt.receit_description}</p>
            <p>
                DEAL DATE: {new Date(receipt.created_at).toLocaleDateString()}
            </p>
        </div>
    );
}

function CustomerCard({ customer }) {
    const {
        ReferCustomer_deals_totalpricefirst15days,
        ReferCustomer_deals_totalpricelast15days,
        created_at,
        referCustomer_code,
        referCustomer_name,
        referCustomer_phone,
        referCustomer_receipt,
    } = customer;

    return (
        <div className="rounded-lg shadow-md p-4 customer-card">
            <p>NAME: {referCustomer_name}</p>
            <p>MOBILE: {referCustomer_phone}</p>
            <p>REFERAL CODE: {referCustomer_code}</p>
            <p>RECEIPT: {referCustomer_receipt}</p>
            <p>DEAL DATE: {new Date(created_at).toLocaleDateString()}</p>
            <p>
                FIRST 15 DAYS DEALS: {ReferCustomer_deals_totalpricefirst15days}
            </p>
            <p>
                LAST 15 DAYS DEALS: {ReferCustomer_deals_totalpricelast15days}
            </p>
            <p>
                CASHBACK:{' '}
                {(
                    Math.round(
                        (ReferCustomer_deals_totalpricefirst15days * 0.1 +
                            ReferCustomer_deals_totalpricelast15days * 0.05) *
                            100
                    ) / 100
                ).toFixed(2)}{' '}
                L.E
            </p>
        </div>
    );
}
