'use client';

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Color, Size } from "@/types";
import { useRouter ,  useSearchParams } from "next/navigation";
import qs from "query-string";

interface FilterProps {
    data: (Size|Color)[];
    name: string;
    valueKey: string;
}

export const Filter: React.FC<FilterProps> = ({ data, name, valueKey }) => {
    const router = useRouter()
    const searchParams = useSearchParams()

    const selectedValue = searchParams.get(valueKey)

    const onClick = (id: string) => {

        const current = qs.parse(searchParams.toString())
        const  query = {
            ...current,
            [valueKey]: id
        }
        if (current[valueKey] === id) {
            query[valueKey] = null
        }

        const url = qs.stringifyUrl(
            {
                url: window.location.href,
                query
            },

            {
               skipNull: true 
            }
        )

        router.push(url)
    }


    return (
        <div className="mb-8">
           <h3 className="text-lg font-semibold ">{name}</h3>
           <hr className="my-4" />
           <div className="flex flex-wrap gap-2">
                {data.map((item) => (
                     <Button
                      key={item.id}
                      onClick={() => onClick(item.id)}
                      className={cn(
                            'text-sm',
                            selectedValue === item.id ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'
                      )}
                     >
                          {item.name}
                     </Button>
                ))}
           </div>
        </div>
    )
}