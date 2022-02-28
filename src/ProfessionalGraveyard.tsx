import * as React from 'react';
import LazyLoad from 'react-lazyload';

import { BurntSlug } from './Types';
import { SizeOptions, LoadingImage } from './LoadingImage';
import { shortenAddress } from './Utilities';

import Burned from './img/statistics-icons/Burned.png';

export interface GraveyardProps {
    burntSlugs: BurntSlug[];
}

export function ProfessionalGraveyard(props: GraveyardProps) {
    const {
        burntSlugs,
    } = props;

    const data = React.useMemo(() => {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-12 mt-14 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
                {burntSlugs.map((slug) => (
                    <LazyLoad>
                        <div className="flex flex-col items-center justify-center">
                            <LoadingImage
                                src={slug.image}
                                alt={`Sol Slug ${slug.name}`}
                                size={SizeOptions.Small}
                            />

                            <div className="flex flex-col items-start w-48">
                                <span className="uppercase text-3xl mt-2">
                                    {`Former Rank ${slug.rank}`}
                                </span>

                                <span className="uppercase text-xl" title={slug.burntBy}>
                                    {`By ${shortenAddress(slug.burntBy)}`}
                                </span>
                            </div>
                        </div>
                    </LazyLoad>
                ))}
            </div>
        );
    }, [burntSlugs]);

    return (
        <div className="flex flex-col items-center justify-center mt-10">
            <div className="flex flex-row items-center justify-center gap-x-4">
                <img
                    className="w-14"
                    src={Burned}
                    alt='Fire'
                />

                <span className="uppercase text-slugGreen text-5xl">
                    The Slug Graveyard
                </span>

                <img
                    className="w-14"
                    src={Burned}
                    alt='Fire'
                />
            </div>

            <span className="uppercase text-2xl">
                RIP you slimey bastards
            </span>

            {data}
        </div>
    );
}
