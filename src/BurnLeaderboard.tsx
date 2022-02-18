import * as React from 'react';

import { BurnStats, BurntSlug } from './Types';
import Crown from './img/statistics-icons/Crown.png';
import { shortenAddress, shortenValue } from './Utilities';

export interface BurnLeaderboardProps {
    burnStats?: BurnStats;

    allSlugsMap?: Map<string, BurntSlug>;
}

const textColors = {
    'Slug Reaper Acolyte': 'text-acolyte',
    'Slug Incinerator': 'text-incinerator',
    'Slug Pyro': 'text-pyro',
    'Slug Scorcher': 'text-scorcher',
    'Keeper of the Flame': 'text-slugGreen',
};

export function BurnLeaderboard(props: BurnLeaderboardProps) {
    const {
        burnStats,
        allSlugsMap,
    } = props;

    const [rows, setRows] = React.useState<any[]>([]);

    React.useEffect(() => {
        if (!burnStats) {
            return;
        }

        setRows([...burnStats.users].map((u) => {
            (u as any).expanded = false;
            return u;
        }));
    }, [burnStats]);

    function handleExpand(address: string) {
        const dupe = [...rows];

        for (let row of dupe) {
            if (row.address === address) {
                row.expanded = !row.expanded;
            }
        }

        setRows(dupe);
    }

    const tableBody = React.useMemo(() => {
        if (!burnStats || !rows || !allSlugsMap) {
            return (
                <tr>
                    <td colSpan={4} className="text-center">
                        Loading...
                    </td>
                </tr>
            );
        }

        return rows.map((burn, i) => {
            let rank = burn.rank;

            const bigBurner = i === 0;

            if (bigBurner) {
                rank = 'Keeper of the Flame';
            }

            const color = (textColors as any)[rank];
            const tableText = `${color} text-center`;

            const row = (
                <tr key={burn.address}>
                    <td className={`${tableText} w-28 2xl:w-36`}>
                        <div className="flex flex-row items-center justify-center gap-x-1">
                            {bigBurner && (
                                <img
                                    src={Crown}
                                    className="w-12"
                                />
                            )}
                            {i+1}
                        </div>
                    </td>

                    <td className={`${tableText} uppercase w-64 2xl:w-72`}>
                        {rank}
                    </td>

                    <td className={`${tableText} w-64 break-words 2xl:w-[36rem]`}>
                        <span className="block 2xl:hidden">
                            {shortenAddress(burn.address)}
                        </span>

                        <span className="hidden 2xl:block">
                            {burn.address}
                        </span>
                    </td>

                    <td className={`${tableText} w-20 2xl:w-36`}>
                        <div className="flex flex-row items-center justify-center gap-x-4" onClick={() => handleExpand(burn.address)}>
                            {burn.burns}
                            <span className="text-base text-white">
                                {burn.expanded ? '▲' : '▼'}
                            </span>
                        </div>
                    </td>
                </tr>
            );

            if (burn.expanded) {
                const burntTraitMap = new Map();

                for (const tx of burn.transactions) {
                    for (const mint of tx.slugsBurnt) {
                        const slugData = allSlugsMap.get(mint);

                        if (!slugData) {
                            continue;
                        }

                        for (const attribute of slugData.attributes) {
                            if (attribute.value === 'None') {
                                continue;
                            }

                            const existingCount = burntTraitMap.get(`${attribute.trait_type}-${attribute.value}`) || {
                                count: 0,
                                attribute: attribute.trait_type,
                                value: attribute.value,
                            };

                            existingCount.count++;

                            burntTraitMap.set(`${attribute.trait_type}-${attribute.value}`, existingCount);
                        }
                    }
                }

                const sorted = [...burntTraitMap.values()].sort((a, b) => b.count - a.count).slice(0, 10);

                return (
                    <>
                        {row}

                        <tr key={`${burn.address}-expanded m-4`}>
                            <td colSpan={4} className="text-center border-slugGreen border-2 p-4">
                                <div className="flex flex-col gap-y-4">
                                    <span className="uppercase text-4xl">
                                        Most Burned Traits
                                    </span>

                                    <div className="grid grid-cols-5 grid-rows-2 gap-x-12 gap-y-8 items-center justify-center">
                                        {sorted.map((trait) => (
                                            <div
                                                key={`${trait.attribute}-${trait.value}`}
                                                className="flex flex-col items-center justify-center"
                                            >
                                                <span className="uppercase text-2xl -mb-1">
                                                    {trait.attribute}
                                                </span>

                                                <span className="uppercase text-2xl -mt-1">
                                                    {shortenValue(trait.value, 15)}
                                                </span>

                                                <span className="uppercase text-4xl">
                                                    {trait.count}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </td>
                        </tr>

                    </>
                );
            }

            return row;
        });
    }, [rows, burnStats]);

    return (
        <div className="flex flex-col items-center justify-center gap-y-5">
            <table className="border-separate [border-spacing:0.75rem] table-fixed w-6/7">
                <thead className="mb-10">
                    <tr>
                        <th className="w-28 2xl:w-36">
                            <span className="uppercase text-3xl">
                                Rank
                            </span>
                        </th>

                        <th className="w-64 2xl:w-72">
                            <span className="uppercase text-3xl">
                                Title
                            </span>
                        </th>

                        <th className="w-64 2xl:w-[36rem]">
                            <span className="uppercase text-3xl">
                                Address
                            </span>
                        </th>

                        <th className="w-20 2xl:w-36">
                            <span className="uppercase text-3xl">
                                Burns
                            </span>
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {tableBody}
                </tbody>
            </table>
        </div>
    );
}
