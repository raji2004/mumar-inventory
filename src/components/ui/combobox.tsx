import React, { useEffect, useState } from 'react';
import { Autocomplete, AutocompleteItem } from '@nextui-org/autocomplete';

interface ComboboxFormProps {
    title: string;
    data: string[];
    allow_custom?: boolean; // Optional: set to false to avoid custom values
    default_v?: string;
    set_v: (value: string) => void;
    onQueryChange?: (query: string) => void; // Optional query change handler
}

const ComboboxForm: React.FC<ComboboxFormProps> = ({
    title,
    data,
    allow_custom = false,
    default_v,
    set_v,
    onQueryChange,
}) => {
    const [inputValue, setInputValue] = useState(default_v || "");

    useEffect(() => {
        setInputValue(default_v || "");
    }, [default_v]);

    const handleInputChange = (value: string) => {
        setInputValue(value);
        set_v(value);
        if (onQueryChange) {
            onQueryChange(value); // Update the query value
        }
    };

    return (
        <div className="flex w-full flex-wrap bg-white md:flex-nowrap gap-4">
            <Autocomplete
                onInputChange={handleInputChange}
                inputValue={inputValue} // Control input value
                allowsCustomValue={allow_custom} // Allow custom input
                aria-label={title}
                placeholder={title}
                isClearable={false}
                popoverProps={{
                    classNames: {
                        base: "bg-white", // Set dropdown background to white
                    },
                }}
                listboxProps={{
                    classNames: {
                        base: "bg-white", // Set listbox background to white
                    },
                }}
            >
                {data?.map((name) => (
                    <AutocompleteItem key={name} value={name} onClick={() => handleInputChange(name)}>
                        {name}
                    </AutocompleteItem>
                ))}
            </Autocomplete>
        </div>
    );
};

export default ComboboxForm;