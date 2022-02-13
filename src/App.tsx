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
} from '@solana/wallet-adapter-wallets';
import {
    WalletModalProvider,
} from '@solana/wallet-adapter-react-ui';

import { Header } from './Header';
import { Footer } from './Footer';
import { Routes } from './Routes';

import {
    fetchBurntData,
    createBurntMap,
    calculateRanks,
} from './Rankings';
import { RPC_URL } from './Constants';

function App() {
    /* Mapping of mint hash to whether slug is burnt */
    const [burntMap, setBurntMap] = React.useState<Map<string, boolean>>(new Map());

    /* Mapping of ranks to slugs, pre burns */
    const [preBurnRankMap, setPreBurnRankMap] = React.useState<Map<string, any>>(new Map());

    /* Mapping of ranks to slugs, post burns */
    const [rankMap, setRankMap] = React.useState<Map<number, any>>(new Map());

    /* Mapping of slug name to slug data */
    const [slugRankMap, setSlugRankMap] = React.useState<Map<string, any>>(new Map());

    /* Raw data we get back from the /burntslugs api */
    const [burntData, setBurntData] = React.useState<any | undefined>(undefined);

    const network = WalletAdapterNetwork.Mainnet;

    const endpoint = RPC_URL;

    const wallets = React.useMemo(() => [
        new PhantomWalletAdapter(),
        new SlopeWalletAdapter(),
        new SolflareWalletAdapter({ network }),
        new SolletWalletAdapter({ network }),
        new SolletExtensionWalletAdapter({ network }),
    ], [network]);

    async function fetchData() {
        const data = await fetchBurntData();

        if (!data) {
            return;
        }

        const burntMap = createBurntMap(data);

        let nonBurnt = [];

        for (const item of data.tokenInfo) {
            if (!burntMap.get(item.mint)) {
                nonBurnt.push(item);
            }
        }

        setBurntData(data);
        setBurntMap(burntMap);
        setPreBurnRankMap(calculateRanks(data.tokenInfo, 'name'));
        setRankMap(calculateRanks(nonBurnt, 'rank'));
        setSlugRankMap(calculateRanks(nonBurnt, 'name'));
    }

    React.useEffect(() => {
        fetchData();
    }, []);

    return (
        <Router>
            <ConnectionProvider endpoint={endpoint}>
                <WalletProvider wallets={wallets} autoConnect>
                    <WalletModalProvider>
                        <Header
                            slugCount={burntData ? burntData.currentTokenCount : undefined}
                        />

                        <Routes/>

                        <Footer/>
                    </WalletModalProvider>
                </WalletProvider>
            </ConnectionProvider>
        </Router>
    );
}

export default App;
