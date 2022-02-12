import React from "react";
import { HashRouter as Router } from 'react-router-dom';

import { Header } from './Header';
import { Footer } from './Footer';
import { Routes } from './Routes';

import {
    fetchBurntData,
    createBurntMap,
    calculateRanks,
} from './Rankings';

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
            <Header
                slugCount={burntData ? burntData.currentTokenCount : undefined}
            />

            <Routes/>

            <Footer/>
        </Router>
    );
}

export default App;
