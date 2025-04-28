'use client'

import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";



export const Notifications: React.FC = () => {
    const searchParams = useSearchParams()
    const router = useRouter()

    React.useEffect(() => {
        let toastMessage = '';

        if (searchParams.has('verified')) {
            toastMessage = 'Почта успешно подтверждена!'
        }

        if (toastMessage) {
            toast.success(toastMessage)
            router.push('/')
        }
    },[])

    return (
        <></>
    );
}; 