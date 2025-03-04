"use client";

import { formatter } from "@/lib/utils";

import { useEffect , useState } from "react";



interface CurrencyProps {
    value: string | number;

}

const Currency: React.FC<CurrencyProps> = ({ value }) => {

    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    if (!isMounted) {
        return null
    }

    return (
        <span className='font-semibold text-lg text-gray-900'>
            {formatter.format(Number(value))}
        </span>
    )

}

export default Currency