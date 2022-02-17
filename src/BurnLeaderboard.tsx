import * as React from 'react';

import { BurnStats } from './Types';
import Crown from './img/statistics-icons/Crown.png';

export interface BurnLeaderboardProps {
    burnStats?: BurnStats;
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
        if (!burnStats || !rows) {
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

            return (
                <tr key={burn.address}>
                    <td className="text-center w-16">
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

                    <td className={`${tableText} uppercase w-32`}>
                        {rank}
                    </td>

                    <td className={`${tableText} w-2/5 break-words`}>
                        {burn.address}
                    </td>

                    <td className={`${tableText} w-20`}>
                        <div className="flex flex-row items-center justify-center gap-x-4" onClick={() => handleExpand(burn.address)}>
                            {burn.burns}
                            <span className="text-base text-white">
                                {burn.expanded ? '▲' : '▼'}
                            </span>
                        </div>
                    </td>
                </tr>
            );
        });
    }, [rows, burnStats]);

    return (
        <div className="flex flex-col items-center justify-center gap-y-5">
            <table className="border-separate [border-spacing:0.75rem] table-fixed w-6/7">
                <thead className="mb-10">
                    <tr>
                        <th className="w-16">
                            <span className="uppercase text-3xl">
                                Rank
                            </span>
                        </th>

                        <th className="w-32">
                            <span className="uppercase text-3xl">
                                Title
                            </span>
                        </th>

                        <th className="w-2/5">
                            <span className="uppercase text-3xl">
                                Address
                            </span>
                        </th>

                        <th className="w-20">
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
