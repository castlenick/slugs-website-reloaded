import React from "react";
import { Link } from 'react-router-dom';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useWallet } from '@solana/wallet-adapter-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faDiscord } from '@fortawesome/free-brands-svg-icons';

import Logo from './img/Logo-Small.png';
import DigitalEyes from './img/marketplace-icons/DigitalEyes.png'
import ExchangeArt from './img/marketplace-icons/ExchangeArt.png'
import MagicEden from './img/marketplace-icons/MagicEden.png'
import Solanart from './img/marketplace-icons/Solanart.png'
import Solsea from './img/marketplace-icons/Solsea.png'

// Default styles that can be overridden by your app
require('@solana/wallet-adapter-react-ui/styles.css');

export interface IHeaderProps {
    slugCount?: number;
}

export function Header(props: IHeaderProps) {
    const {
        slugCount,
    } = props;

    const {
        connected,
        autoConnect,
    } = useWallet();

    console.log(connected, autoConnect);

    const header = React.useMemo(() => {
        return (
            <div className="flex justify-center items-center flex-col">
                <div className="grid grid-cols-9 w-4/5 mt-20 2xl:w-5/6">
                    <div className="flex justify-end gap-x-6 text-3xl w-full col-span-9 items-end 2xl:col-span-4 2xl:col-start-6 2xl:row-start-2">
                        <Link to='/'>Home</Link>
                        <Link to='/faq'>FAQ</Link>
                        <Link to='/rarity'>Rarity</Link>
                        <Link to='/designer'>Designer</Link>
                        <Link to='/partners'>Partners</Link>
                        <Link to='/leaderboard'>Burn-Leaderboard</Link>
                    </div>

                    <div className="flex flex-col justify-center items-center border-2 border-slugGreen my-4 py-3 relative w-full col-span-9">
                        <img
                            src={Logo}
                            className="absolute top-0 left-0 -mt-16 -ml-2 w-44 2xl:w-56 2xl:-mt-20 2xl:-ml-3"
                        />

                        <span className="text-slugGreen text-5xl 2xl:text-6xl">
                            It's SLUGS on SOLANA!
                        </span>

                        <span className="text-2xl mt-2 text-center w-3/5 2xl:text-3xl">
                            {`Solana Slugs is a deflationary collection of ${slugCount || 9362} slugs on the Solana blockchain`}
                        </span>
                    </div>

                    <div className="flex col-span-2 2xl:col-start-2 2xl:row-start-2 2xl:col-span-2 2xl:items-end 2xl:justify-center">
                        <WalletMultiButton
                            className="!border-solid !border-2 !border-slugGreen !w-52 !h-12 !font-sans !text-2xl !p-1 !font-normal text-center justify-center items-center"
                            startIcon={undefined}
                            endIcon={undefined}
                        >
                            <div className={`rounded-full w-3 h-3 mx-1 ${connected ? 'bg-green-500' : 'bg-red-500'}`}>
                            </div>
                            <span className="mx-1">
                                {connected ? 'Wallet Connected' : 'Connect Wallet'}
                            </span>
                        </WalletMultiButton>
                    </div>

                    <div className="flex flex-col justify-center items-center col-span-5 gap-y-3 2xl:col-start-3 2xl:col-span-4 2xl:row-span-2 2xl:row-start-1 2xl:justify-end">
                        <span className="text-2xl text-center 2xl:text-3xl">
                            Buy Slugs At These Marketplaces!
                        </span>

                        <div className="flex flex-row justify-center items-center col-span-5 gap-x-3">
                            <a href="https://magiceden.io/marketplace/sol_slugs">
                                <img
                                    src={MagicEden}
                                    className="w-8 2xl:w-9"
                                />
                            </a>

                            <a href="https://solanart.io/collections/solanaslugs">
                                <img
                                    src={Solanart}
                                    className="w-8 2xl:w-9"
                                />
                            </a>

                            <a href="https://digitaleyes.market/collections/Sol%20Slugs">
                                <img
                                    src={DigitalEyes}
                                    className="w-8 2xl:w-9"
                                />
                            </a>

                            <a href="https://exchange.art/collections/Generation%201">
                                <img
                                    src={ExchangeArt}
                                    className="w-8 2xl:w-9"
                                />
                            </a>

                            <a href="https://solsea.io/collection/6174889e35bdfa7fd24932c5">
                                <img
                                    src={Solsea}
                                    className="w-8 2xl:w-9"
                                />
                            </a>
                        </div>
                    </div>

                    <div className="flex flex-row justify-end items-start col-span-2 gap-x-4 2xl:col-start-9 2xl:row-start-1">
                        <a href="https://twitter.com/SolSlugsNFT">
                            <FontAwesomeIcon
                                icon={faTwitter}
                                size="1x"
                                className="text-4xl"
                            />
                        </a>

                        <a href="https://discord.gg/zqdrguPfUa">
                            <FontAwesomeIcon
                                icon={faDiscord}
                                className="text-4xl"
                            />
                        </a>
                    </div>
                </div>
            </div>
        );
    }, [slugCount, connected]);

    return header;
}
