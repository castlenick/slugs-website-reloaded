import React from "react";
import { HashRouter as Router } from 'react-router-dom';
import {
    ConnectionProvider,
    WalletProvider,
} from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import {
    PhantomWalletAdapter,
    SlopeWalletAdapter,
    SolflareWalletAdapter,
    SolletExtensionWalletAdapter,
    SolletWalletAdapter,
    GlowWalletAdapter,
} from '@solana/wallet-adapter-wallets';
import {
    WalletModalProvider,
} from '@solana/wallet-adapter-react-ui';

import { Header } from './Header';
import { Footer } from './Footer';
import { Routes } from './Routes';

import { RPC_URL } from './Constants';
import { sleep } from './Utilities';
import { APIData, UnburntSlug, BurntSlug, Trait } from './Types';

function App() {
    const [data, setData] = React.useState<APIData | undefined>();

    /* Mapping from mint hash to slug, all slugs */
    const [allSlugsMap, setAllSlugsMap] = React.useState<Map<string, BurntSlug> | undefined>();

    /* Mapping from slug rank to slug, only unburnt ones */
    const [unburntSlugRankMap, setUnburntSlugRankMap] = React.useState<Map<number, UnburntSlug> | undefined>();

    /* Mapping from slug number to slug, only unburnt ones */
    const [unburntSlugNameMap, setUnburntSlugNameMap] = React.useState<Map<string, UnburntSlug> | undefined>();

    /* Mapping from slug number to slug, only burnt ones */
    const [burntSlugNameMap, setBurntSlugNameMap] = React.useState<Map<string, BurntSlug> | undefined>();

    /* Mapping from trait attribute-value to trait rarity etc */
    const [traitNameMap, setTraitNameMap] = React.useState<Map<string, Trait> | undefined>();

    const network = WalletAdapterNetwork.Mainnet;

    const endpoint = RPC_URL;

    const wallets = React.useMemo(() => [
        new PhantomWalletAdapter(),
        new SlopeWalletAdapter(),
        new SolflareWalletAdapter({ network }),
        new SolletWalletAdapter({ network }),
        new SolletExtensionWalletAdapter({ network }),
        new GlowWalletAdapter({ network }),
    ], [network]);

    const fetchData = React.useCallback(async () => {
        const url = 'https://letsalllovelain.com/slugs/';

        try {
            const data = await fetch(url);
            const raw = await data.json();

            setData(raw);

            const allMap = new Map();
            const rankMap = new Map();
            const nameMap = new Map();
            const burntNameMap = new Map();
            const traitMap = new Map();

            for (const slug of raw.slugs.burnt) {
                allMap.set(slug.mint, slug);
                burntNameMap.set(slug.name, slug);
            }

            for (const slug of raw.slugs.unburnt) {
                allMap.set(slug.mint, slug);
                rankMap.set(slug.rank, slug);
                nameMap.set(slug.name, slug);
            }

            for (const attribute of raw.attributes) {
                for (const trait of attribute.values) {
                    traitMap.set(`${attribute.name}-${trait.name}`, trait);
                }
            }

            setAllSlugsMap(allMap);

            setUnburntSlugRankMap(rankMap);

            setUnburntSlugNameMap(nameMap);

            setBurntSlugNameMap(burntNameMap);

            setTraitNameMap(traitMap);
        } catch (err) {
            await sleep(5 * 1000);
            fetchData();
        }
    }, []);

    React.useEffect(() => {
        if (window.location.hash.length > 0) {
            const urlArgs = new URLSearchParams(window.location.hash.slice(1));

            if (urlArgs.get('state') === 'verify') {
                window.location.href = `/#/verify?${urlArgs.toString()}`;
            }
        }

        fetchData();
    }, [fetchData]);

    return (
        <Router>
            <ConnectionProvider endpoint={endpoint}>
                <WalletProvider wallets={wallets} autoConnect>
                    <WalletModalProvider>
                        <div className="flex items-center flex-col min-h-screen text-white text-3xl">
                            <div className="w-4/5 2xl:w-5/6 mb-20">
                                <Header
                                    slugCount={data?.slugStats?.slugCount}
                                    burnCount={data?.burnStats?.slugsBurnt}
                                    biggestBurner={data?.burnStats?.biggestBurner?.address}
                                />

                                <Routes
                                    data={data}
                                    allSlugsMap={allSlugsMap}
                                    unburntSlugNameMap={unburntSlugNameMap}
                                    unburntSlugRankMap={unburntSlugRankMap}
                                    burntSlugNameMap={burntSlugNameMap}
                                    traitNameMap={traitNameMap}
                                />

                                <Footer/>
                            </div>
                        </div>
                    </WalletModalProvider>
                </WalletProvider>
            </ConnectionProvider>
        </Router>
    );
}

export default App;
