import React from "react";
import { Link } from 'react-router-dom';

import Logo from './img/Logo-Small.png';

export interface IHeaderProps {
    slugCount?: number;
}

export function Header(props: IHeaderProps) {
    const {
        slugCount,
    } = props;

    const header = React.useMemo(() => {
        return (
            <div className="flex justify-center items-center flex-col">
                <div className="grid grid-cols-3 w-4/5">
                    <div className="flex justify-end gap-x-6 text-3xl mt-20 w-full col-span-3">
                        <Link to='/'>Home</Link>
                        <Link to='/faq'>FAQ</Link>
                        <Link to='/rarity'>Rarity</Link>
                        <Link to='/designer'>Designer</Link>
                        <Link to='/partners'>Partners</Link>
                        <Link to='/leaderboard'>Burn-Leaderboard</Link>
                    </div>

                    <div className="flex flex-col justify-center items-center border-2 border-slugGreen mt-4 py-3 relative w-full col-span-3">
                        <img
                            src={Logo}
                            className="absolute top-0 left-0 -mt-16 -ml-2 w-44"
                        />

                        <span className="text-slugGreen text-5xl">
                            It's SLUGS on SOLANA!
                        </span>

                        <span className="text-2xl mt-2 text-center w-3/5">
                            {`Solana Slugs is a deflationary collection of ${slugCount || 9362} slugs on the Solana blockchain`}
                        </span>
                    </div>
                </div>
            </div>
        );
    }, [slugCount]);

    return header;
}
