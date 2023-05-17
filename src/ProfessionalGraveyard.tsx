import * as React from 'react';
import LazyLoad, { forceCheck } from 'react-lazyload';

import { BurntSlug } from './Types';
import { SizeOptions, LoadingImage } from './LoadingImage';
import { shortenAddress } from './Utilities';

import Burned from './img/statistics-icons/Burned.png';

import { Trait, Attribute } from './Types';

import { Filter, Traits } from './Filter';

export interface GraveyardProps {
    burntSlugs: BurntSlug[];
    traitNameMap?: Map<string, Trait>;
    attributes?: Attribute[];
}

export function ProfessionalGraveyard(props: GraveyardProps) {
    const {
        burntSlugs,
        traitNameMap,
        attributes,
    } = props;

    const [dataFromFilter, setDataFromFilter] = React.useState<Traits>();

    const handleDataFromFilter = React.useCallback((data: Traits) => {
        setDataFromFilter(data);
    }, []);

    const filteredSlugs = React.useMemo(() => {
        if (!dataFromFilter) { 
            return burntSlugs;
        }

        const keys = Object.keys(dataFromFilter) as Array<keyof Traits>;
        return burntSlugs.filter((slug) =>
            keys.every((key) =>
                !dataFromFilter[key] ||
                    slug.attributes.some((attr) =>
                        attr.trait_type === key && attr.value === dataFromFilter[key]
                    )
            )
        );
    }, [burntSlugs, dataFromFilter]);

    const slugElements = React.useMemo(() => {
        const noMatches  = (
            <div className="flex flex-col items-center justify-center w-full">
                No matching slugs
            </div>
        );

        const matches = (
            filteredSlugs.map((slug: any) => (
                <LazyLoad key={slug.name}>
                    <div className="flex flex-col items-center justify-center w-full">
                        <LoadingImage
                            src={slug.image}
                            alt={`Sol Slug ${slug.name}`}
                            size={SizeOptions.Small}
                        />
                        <div className="flex flex-col items-start">
                            <span className="uppercase text-3xl mt-2">
                                {`Former Rank ${slug.rank}`}
                            </span>
                            <span className="uppercase text-xl" title={slug.burntBy}>
                                {`By ${shortenAddress(slug.burntBy)}`}
                            </span>
                        </div>
                    </div>
                </LazyLoad>
            ))
        );

        return (
            <div className="flex justify-center w-full">
                <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
                    {filteredSlugs.length === 0 ? noMatches : matches}
                </div>
            </div>
        );
    }, [filteredSlugs]);

    React.useEffect(() => {
        forceCheck();
    }, [filteredSlugs]);


    return (
        <div className="flex flex-col items-center justify-center mt-10">
            <div className="flex flex-row items-center justify-center gap-x-4">
                <img
                    className="w-14"
                    src={Burned}
                    alt='Fire'
                />

                <span className="uppercase text-slugGreen text-5xl text-center">
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
            <div className="grid mt-20 xs:grid-cols-2 sm:grid-cols-4">
                <div className="col-span-1">
                    <Filter
                        traitNameMap={traitNameMap}
                        attributes={attributes}
                        onChange={handleDataFromFilter}
                    />
                </div>
                <div className="col-span-1 sm:col-span-2 md:col-span-3">
                    {slugElements}
                </div>
            </div>
        </div>
    );
}
