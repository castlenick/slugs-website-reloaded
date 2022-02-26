import * as React from 'react';

import { Listbox } from '@headlessui/react';
import { Align } from './Types';

export interface DropdownOption {
    value: any;

    label: string;
}

export interface DropdownProps {
    label: string;

    options: DropdownOption[];

    value: any;

    onChange: (value: any) => void;

    headerStyle?: string;

    align?: Align;

    valueStyle?: string;

    dropdownWidth?: string;
}

export function Dropdown(props: DropdownProps) {
    const {
        label,
        options,
        value,
        onChange,
        headerStyle = `text-3xl uppercase`,
        valueStyle = `text-4xl`,
        align = Align.End,
        dropdownWidth = 'w-full',
    } = props;

    const [selectedOption, setSelectedOption] = React.useState<DropdownOption | undefined>();

    React.useEffect(() => {
        setSelectedOption(options.find((o) => o.value === value));
    }, [value, options]);

    function handleOptionChange(option: DropdownOption) {
        setSelectedOption(option);
        onChange(option.value);
    }

    const alignFlex = React.useMemo(() => {
        if (align === Align.Start) {
            return 'items-start';
        }

        if (align === Align.Center) {
            return 'items-center';
        }

        return 'items-end';
    }, [align]);

    return (
        <div className={`flex flex-col ${alignFlex} w-52`}>
            <span className={headerStyle}>
                {label}
            </span>

            <Listbox value={selectedOption} onChange={handleOptionChange}>
                <div className="relative mt-1">
                    <Listbox.Button className={`flex items-center gap-x-3 relative uppercase cursor-default ${dropdownWidth}`}>
                        <span className="text-xl" title={selectedOption?.label}>
                            ▼
                        </span>
                        <span className={valueStyle} title={selectedOption?.label}>
                            {selectedOption?.label}
                        </span>
                    </Listbox.Button>
                    
                    <Listbox.Options className="absolute w-48 py-1 mt-3 overflow-auto bg-gray-800 rounded-md max-h-60 z-10">
                        {options.map((option) => (
                            <Listbox.Option
                                value={option}
                                key={`${option.label}-${option.value}`}
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
