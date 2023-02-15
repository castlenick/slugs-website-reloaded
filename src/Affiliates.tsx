import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faDiscord, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';

import UndervaluedNFTs from './img/partner-logos/Undervalued.jpg';
import DegenCoinFlip from './img/partner-logos/DCF.png';
import Netrunner from './img/partner-logos/Netrunner.png';
import P2 from './img/partner-logos/P2.png';
import SolanaFM from './img/partner-logos/SolanaFM.png';

interface AffiliateLink {
    url: string;

    icon: any;
}

interface AffiliatedItemProps {
    links: AffiliateLink[];

    header: string;

    info: string;

    image: string;
}

function AffiliateItem(props: AffiliatedItemProps) {
    const {
        links,
        header,
        info,
        image,
    } = props;

    return (
        <div className="flex flex-wrap sm:flex-nowrap flex-row justify-center items-start gap-x-10 gap-y-6">
            <div className="w-60 flex grow-0 shrink-0">
                <img
                    alt='affiliate-logo'
                    src={image}
                    className="w-60 h-60 border-slugGreen border-2 self-center object-contain"
                />
            </div>

            <div className="flex flex-col justify-start items-start gap-y-4">
                <span className="text-5xl">
                    {header}
                </span>

                <span className="text-2xl">
                    {info}
                </span>

                <div className="flex flex-row justify-start items-start gap-x-5">
                    {links.map((link) => (
                        <a href={link.url} key={link.url}>
                            <FontAwesomeIcon
                                icon={link.icon}
                                className="text-4xl"
                            />
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
}

export function Affiliates() {
    return (
        <div className="grid grid-cols-1 gap-x-20 gap-y-20 2xl:grid-cols-2">
            <div className="flex flex-col justify-start items-start gap-y-3">
                <span className="text-7xl text-slugGreen">
                    Checkout our Affiliates!
                </span>
                <span className="text-2xl w-4/5">
                    The projects or people listed here are associates of the Solana Slugs team - whether through official collaborations, or more informal alliances.
                </span>
            </div>

            <AffiliateItem
                links={[
                    {
                        url: 'https://twitter.com/NetrunnerNFT',
                        icon: faTwitter,
                    },
                    {
                        url: 'https://discord.com/invite/hhscUUv5er',
                        icon: faDiscord,
                    },
                    {
                        url: 'https://www.solnetrunner.io/',
                        icon: faGlobe,
                    },
                ]}
                header={'Netrunner'}
                info={'Netrunner is a suite of portfolio management & tax reporting tools for NFT & DeFi traders on Solana. They list the Sol Incinerator on their site as a recommended burn tool, due to the fact that many consider burning to be a disposal event for NFTs.'}
                image={Netrunner}
            />

            <AffiliateItem
                links={[
                    {
                        url: 'https://twitter.com/player2world',
                        icon: faTwitter,
                    },
                    {
                        url: 'https://discord.com/invite/player2',
                        icon: faDiscord,
                    },
                    {
                        url: 'https://player2.world/',
                        icon: faGlobe,
                    },
                ]}
                header={'Player2'}
                info={'Player2 is a gamified world where communities and businesses meet. Their platform provides the infrastructure for businesses to launch, bringing genuine revenue into the ecosystem. Additionally, their token, DEO, seeks to solve the issues of modern currency and become \'perfect money\'.'}
                image={P2}
            />

            <AffiliateItem
                links={[
                    {
                        url: 'https://twitter.com/SolanaSanctuary',
                        icon: faTwitter,
                    },
                    {
                        url: 'https://twitter.com/degencoinflip',
                        icon: faDiscord,
                    },
                    {
                        url: 'https://degencoinflip.com/solslugs',
                        icon: faGlobe,
                    }
                ]}
                header={'Degen Coin Flip'}
                info={'DCF is a smart contract that allows users to play Double or Nothing with their Solana tokens. DCF collects a 3.5% fee on every game and distributes it to their holders.'}
                image={DegenCoinFlip}
            />

            <AffiliateItem
                links={[
                    {
                        url: 'https://twitter.com/solanafm',
                        icon: faTwitter,
                    },
                    {
                        url: 'http://discord.gg/3SqREprDJN',
                        icon: faDiscord,
                    },
                    {
                        url: 'https://solana.fm/?cluster=mainnet-solanafmbeta',
                        icon: faGlobe,
                    },
                ]}
                header={'SolanaFM'}
                info={'SolanaFM is a blockchain explorer implementing a plethora of tools and features for user convenience.'}
                image={SolanaFM}
            />

            <AffiliateItem
                links={[
                    {
                        url: 'https://twitter.com/undervaluednfts',
                        icon: faTwitter,
                    },
                    {
                        url: 'https://discord.gg/YjGA6hmjGf',
                        icon: faDiscord,
                    },
                    {
                        url: 'https://www.youtube.com/channel/UCMGlDrVYhvVZChwZklHX8eg',
                        icon: faYoutube,
                    }
                ]}
                header={'UnderValuedNFTs'}
                info={'From providing alpha, to exposing rug rings - Undervalued NFTs is a youtuber who gives transparent and honest reviews regarding all things in the Solana NFT space.'}
                image={UndervaluedNFTs}
            />
        </div>
    );
}
