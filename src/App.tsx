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

import { RPC_URL } from './Constants';
import { sleep } from './Utilities';
import { APIData } from './Types';

function App() {
    const [data, setData] = React.useState<APIData | undefined>();

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
        const url = 'https://letsalllovelain.com/slugs/';

        try {
            const data = await fetch(url);
            const raw = await data.json();
            setData(raw);
        } catch (err) {
            await sleep(5 * 1000);
            fetchData();
        }
    }

    React.useEffect(() => {
        fetchData();
    }, []);

    return (
        <Router>
            <ConnectionProvider endpoint={endpoint}>
                <WalletProvider wallets={wallets} autoConnect>
                    <WalletModalProvider>
                        <div className="flex justify-center items-center flex-col">
                            <div className="w-4/5 2xl:w-5/6">
                                <Header
                                    slugCount={data?.slugStats?.slugCount}
                                    burnCount={data?.burnStats?.slugsBurnt}
                                    biggestBurner={data?.burnStats?.biggestBurner?.address}
                                />

                                <Routes/>

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
