import * as React from 'react';
import LazyLoad from 'react-lazyload';

import { BurntSlug } from './Types';
import { SizeOptions, LoadingImage } from './LoadingImage';
import { shortenAddress } from './Utilities';

import Burned from './img/statistics-icons/Burned.png';

import Filter from './Filter';

import { Trait, Attribute } from './Types';

import { Traits } from './Filter';

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

    const [showFilter, setShowFilter] = React.useState<boolean>();

    const handleToggleFilter = () => {
      setShowFilter((val) => !val);
      }

      const [dataFromFilter, setDataFromFilter] = React.useState<Traits>();

      if (!dataFromFilter) {
            setDataFromFilter({
                Background: "",
                Slug: "",
                Chest: "",
                Mouth: "",
                Head: "",
                Eyes: "",
                Tail:"",
                Back: "",
                Hands: "",
        } as Traits)
    }

    const handleDataFromFilter = React.useCallback((data: Traits) => {
        setDataFromFilter(data);
    }, []);

    const filteredSlugs = React.useMemo(() => {
        if (!dataFromFilter) return burntSlugs;

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
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-12 mt-14 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
                {filteredSlugs.map((slug) => (
                    <LazyLoad key={slug.name} >
                        <div className="flex flex-col items-center justify-center">
                            <LoadingImage src={slug.image} alt={`Sol Slug ${slug.name}`} size={SizeOptions.Small} />
                            <div className="flex flex-col items-start w-48">
                                <span className="uppercase text-3xl mt-2">{`Former Rank ${slug.rank}`}</span>
                                <span className="uppercase text-xl" title={slug.burntBy}>{`By ${shortenAddress(slug.burntBy)}`}</span>
                            </div>
                        </div>
                    </LazyLoad>
                ))}
            </div>
        )}, [filteredSlugs]);;


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
            <button onClick={handleToggleFilter}>Filter ▼</button>
            {showFilter && <Filter traitNameMap={traitNameMap} attributes={attributes} onChange={handleDataFromFilter}/>}
            {slugElements}
        </div>
    );
}
