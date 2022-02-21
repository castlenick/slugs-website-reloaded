import * as React from 'react';

import { Menu, Listbox } from '@headlessui/react';

export interface DropdownOption {
    value: any;

    label: string;
}

export interface DropdownProps {
    label: string;

    options: DropdownOption[];

    value: any;

    onChange: (value: any) => void;
}

export function Dropdown(props: DropdownProps) {
    const {
        label,
        options,
        value,
        onChange,
    } = props;

    const [selectedOption, setSelectedOption] = React.useState<DropdownOption | undefined>();

    React.useEffect(() => {
        setSelectedOption(options.find((o) => o.value === value));
    }, [value]);

    function handleOptionChange(option: DropdownOption) {
        setSelectedOption(option);
        console.log(`calling on change with ${option.value}`);
        onChange(option.value);
    }

    return (
        <div className="flex flex-col items-end w-52">
            <span className="text-3xl uppercase">
                {label}
            </span>

            <Listbox value={selectedOption} onChange={handleOptionChange}>
                <div className="relative mt-1">
                    <Listbox.Button className="flex items-center gap-x-3 relative w-full uppercase cursor-default">
                        <span className="text-xl">
                            ▼
                        </span>
                        <span className="text-4xl">
                            {selectedOption?.label}
                        </span>
                    </Listbox.Button>
                    
                    <Listbox.Options className="absolute w-48 py-1 mt-3 overflow-auto bg-gray-800 rounded-md max-h-60">
                        {options.map((option) => (
                            <Listbox.Option
                                value={option}
                                key={option.label}
                                as="div"
                                className="cursor-default select-none relative px-4 py-2 hover:bg-slugGreenDark"
                            >
                                <li>
                                    {option.label}
                                </li>
                            </Listbox.Option>
                        ))}
                    </Listbox.Options>
                </div>
            </Listbox>
        </div>
    );
}
