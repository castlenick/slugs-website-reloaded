import { Routes as RoutesWrapper, Route } from 'react-router-dom';

import { Home } from './Home';
import { AttributeRarity } from './AttributeRarity';
import { SlugRarity } from './SlugRarity';
import { Designer } from './Designer';
import { Incinerator } from './Incinerator';
import { WalletTracker } from './WalletTracker';
import { MSolStaking } from './MSolStaking';
import { Collabs } from './Collabs';
import { Affiliates } from './Affiliates';
import { BurnLeaderboard } from './BurnLeaderboard';

export function Routes() {
    return (
        <RoutesWrapper>
            <Route path='/' element={<Home/>}/>
            <Route path='/attribute-rarity' element={<AttributeRarity/>}/>
            <Route path='/slug-rarity' element={<SlugRarity/>}/>
            <Route path='/designer' element={<Designer/>}/>
            <Route path='/incinerator' element={<Incinerator/>}/>
            <Route path='/wallet-tracker' element={<WalletTracker/>}/>
            <Route path='/mSol-staking' element={<MSolStaking/>}/>
            <Route path='/collabs' element={<Collabs/>}/>
            <Route path='/affiliates' element={<Affiliates/>}/>
            <Route path='/burn-leaderboard' element={<BurnLeaderboard/>}/>
        </RoutesWrapper>
    );
}
