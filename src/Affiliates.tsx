import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faTwitter, faDiscord, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';

import RugSceneInvestigation from './img/partner-logos/RSI.png';
import UndervaluedNFTs from './img/partner-logos/Undervalued.jpg';
import Sanctuary from './img/partner-logos/Sanctuary Gate.png';
import DegenCoinFlip from './img/partner-logos/DCF.png';
import Infungibles from './img/partner-logos/Infungibles.png';

interface AffiliateLink {
    url: string;

    icon: IconProp;
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
        <div className="flex flex-wrap flex-row justify-center items-start gap-x-10 gap-y-6">
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
                        url: 'https://discord.gg/YjGA6hmjGf',
                        icon: faDiscord,
                    },
                ]}
                header={'Rug Scene Investigation'}
                info={'A discord to allow people in the community to provide information about bad actors in the space, and to stay informed. They strive to protect the Solana community.'}
                image={RugSceneInvestigation}
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

            <AffiliateItem
                links={[
                    {
                        url: 'https://twitter.com/SolanaSanctuary',
                        icon: faTwitter,
                    },
                    {
                        url: 'https://discord.gg/solsanctuary',
                        icon: faDiscord,
                    },
                    {
                        url: 'https://www.solsanctuary.io/',
                        icon: faGlobe,
                    }
                ]}
                header={'Solana Sanctuary'}
                info={'The Sanctuary is a DAO dedicated to provide resources, community, and organization to Solana NFT communities that have been rugged, abandoned, or otherwise broken.'}
                image={Sanctuary}
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
                        url: 'https://twitter.com/TheInfungibles',
                        icon: faTwitter,
                    },
                    {
                        url: 'http://discord.gg/infungibles',
                        icon: faDiscord,
                    },
                    {
                        url: 'https://infungibl.es/',
                        icon: faGlobe,
                    }
                ]}
                header={'The Infungibles'}
                info={'A P2E game you can play with any Solana NFT inside a mecha and win SOL. Rent your mecha for passive income.'}
                image={Infungibles}
            />
        </div>
    );
}
