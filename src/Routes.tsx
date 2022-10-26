import { Routes as RoutesWrapper, Route } from 'react-router-dom';

import { Home } from './Home';
import { AttributeRarity } from './AttributeRarity';
import { SlugRarity } from './SlugRarity';
import { Designer } from './Designer';
import { Incinerator } from './Incinerator';
import { WalletTracker } from './WalletTracker';
import { MSolStaking } from './MSolStaking';
import { Affiliates } from './Affiliates';
import { BurnLeaderboard } from './BurnLeaderboard';
import { Graveyard } from './Graveyard';
import { Verifier } from './Verify/';
import { APIData, UnburntSlug, BurntSlug, Trait } from './Types';
import { Marketing } from './Marketing';

export interface RouteProps {
    data?: APIData;

    allSlugsMap?: Map<string, BurntSlug>;

    unburntSlugNameMap?: Map<string, UnburntSlug>;

    unburntSlugRankMap?: Map<number, UnburntSlug>;

    burntSlugNameMap?: Map<string, BurntSlug>;

    traitNameMap?: Map<string, Trait>;
}

export function Routes(props: RouteProps) {
    const {
        data,
        allSlugsMap,
        unburntSlugNameMap,
        unburntSlugRankMap,
        burntSlugNameMap,
        traitNameMap,
    } = props;

    return (
        <RoutesWrapper>
            <Route path='' element={<Home/>}/>

            <Route
                path='/attribute-rarity'
                element={
                    <AttributeRarity
                        traitNameMap={traitNameMap}
                        attributes={data?.attributes}
                    />
                }
            />

            <Route
                path='/slug-rarity'
                element={
                    <SlugRarity
                        unburntSlugNameMap={unburntSlugNameMap}
                        unburntSlugRankMap={unburntSlugRankMap}
                        burntSlugNameMap={burntSlugNameMap}
                        traitNameMap={traitNameMap}
                    />
                }
            />

            <Route
                path='/designer'
                element={
                    <Designer
                        traitNameMap={traitNameMap}
                        attributes={data?.attributes}
                    />
                }
            />

            <Route path='/incinerator' element={<Incinerator/>}/>

            <Route path='/wallet-tracker' element={<WalletTracker/>}/>

            <Route path='/mSol-staking' element={<MSolStaking/>}/>

            <Route path='/affiliates' element={<Affiliates/>}/>

            <Route
                path='/burn-leaderboard'
                element={
                    <BurnLeaderboard
                        burnStats={data?.burnStats}
                        allSlugsMap={allSlugsMap}
                    />
                }
            />

            <Route
                path='/graveyard'
                element={
                    <Graveyard
                        burntSlugs={data?.slugs.burnt}
                        burnCount={data?.burnStats?.slugsBurnt}
                    />
                }
            />

            <Route
                path='/verify'
                element={
                    <Verifier
                    />
                }
            />

            <Route
                path='/marketing'
                element={
                    <Marketing/>
                }
            />
        </RoutesWrapper>
    );
}
