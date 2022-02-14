import { Link } from 'react-router-dom';
import { Menu } from '@headlessui/react';

export interface HeaderLink {
    link: string;
    name: string;
}

export interface HeaderDropdownProps {
    label: string;
    links: HeaderLink[];
}

export function HeaderDropdown(props: HeaderDropdownProps) {
    const {
        label,
        links,
    } = props;

    return (
        <Menu as="div" className="relative">
            <Menu.Button className="flex justify-center items-center gap-x-2">
                {label}
                <span className="text-base">
                    ▼
                </span>
            </Menu.Button>
            <Menu.Items className="absolute flex flex-col justify-center items-center right-0 w-60 mt-2 origin-top-right bg-black border-2 border-slugGreen rounded z-10 divide-y divide-slugGreen">
                {links.map(({ link, name }) => (
                    <Menu.Item as="div" className="w-full flex justify-center items-center py-2 hover:bg-slugGreenDark">
                        {({ active }) => (
                            <Link to={link} className="w-full flex justify-center items-center">
                                <span className="text-3xl">
                                    {name}
                                </span>
                            </Link>
                        )}
                    </Menu.Item>
                ))}
            </Menu.Items>
        </Menu>
    )
}
