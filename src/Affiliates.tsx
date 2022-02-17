import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faDiscord, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';

import RugSceneInvestigation from './img/partner-logos/RSI.png';
import UndervaluedNFTs from './img/partner-logos/Undervalued.jpg';
import Sanctuary from './img/partner-logos/Sanctuary Gate.png';

export function Affiliates() {
    return (
        <div className="grid grid-cols-1 gap-x-10 gap-y-10 xl:grid-cols-2">
            <div className="flex flex-col justify-start items-start gap-y-3">
                <span className="text-7xl text-slugGreen">
                    Checkout our Affiliates!
                </span>
                <span className="text-2xl w-4/5">
                    Projects or people listed here are actively involved in making the Solana ecosystem a better place
                </span>
            </div>

            <div className="flex flex-row justify-center items-start gap-x-10">
                <div className="w-60 flex grow-0 shrink-0">
                    <img
                        src={RugSceneInvestigation}
                        className="w-60 h-60 border-slugGreen border self-center object-contain"
                    />
                </div>

                <div className="flex flex-col justify-start items-start gap-y-4">
                    <span className="text-5xl">
                        Rug Scene Investigation
                    </span>

                    <span className="text-2xl">
                        A discord to allow people in the community to provide information about bad actors in the space, and to stay informed. They strive to protect the Solana community.
                    </span>

                    <a href="https://discord.gg/YjGA6hmjGf">
                        <FontAwesomeIcon
                            icon={faDiscord}
                            className="text-4xl"
                        />
                    </a>
                </div>
            </div>

            <div className="flex flex-row justify-center items-start gap-x-10">
                <div className="w-60 flex grow-0 shrink-0">
                    <img
                        src={UndervaluedNFTs}
                        className="w-60 h-60 border-slugGreen border self-center object-contain"
                    />
                </div>

                <div className="flex flex-col justify-start items-start gap-y-4">
                    <span className="text-5xl">
                        UnderValuedNFTs
                    </span>

                    <span className="text-2xl">
                        From providing alpha, to exposing rug rings - Undervalued NFTs is a youtuber who gives transparent and honest reviews regarding all things in the Solana NFT space.
                    </span>

                    <div className="flex flex-row justify-start items-start gap-x-5">
                        <a href="https://twitter.com/undervaluednfts">
                            <FontAwesomeIcon
                                icon={faTwitter}
                                className="text-4xl"
                            />
                        </a>

                        <a href="https://discord.gg/YjGA6hmjGf">
                            <FontAwesomeIcon
                                icon={faDiscord}
                                className="text-4xl"
                            />
                        </a>

                        <a href="https://www.youtube.com/channel/UCMGlDrVYhvVZChwZklHX8eg">
                            <FontAwesomeIcon
                                icon={faYoutube}
                                className="text-4xl"
                            />
                        </a>
                    </div>
                </div>
            </div>

            <div className="flex flex-row justify-center items-start gap-x-10">
                <div className="w-60 flex grow-0 shrink-0">
                    <img
                        src={Sanctuary}
                        className="w-60 h-60 border-slugGreen border self-center object-contain"
                    />
                </div>

                <div className="flex flex-col justify-start items-start gap-y-4">
                    <span className="text-5xl">
                        Solana Sanctuary
                    </span>

                    <span className="text-2xl">
                        The Sanctuary is a DAO dedicated to provide resources, community, and organization to Solana NFT communities that have been rugged, abandoned, or otherwise broken.
                    </span>

                    <div className="flex flex-row justify-start items-start gap-x-5">
                        <a href="https://twitter.com/SolanaSanctuary">
                            <FontAwesomeIcon
                                icon={faTwitter}
                                className="text-4xl"
                            />
                        </a>

                        <a href="http://discord.gg/solsanctuary">
                            <FontAwesomeIcon
                                icon={faDiscord}
                                className="text-4xl"
                            />
                        </a>

                        <a href="https://www.solsanctuary.io/">
                            <FontAwesomeIcon
                                icon={faGlobe}
                                className="text-4xl"
                            />
                        </a>
                    </div>
                </div>
            </div>

        </div>
    );
}
