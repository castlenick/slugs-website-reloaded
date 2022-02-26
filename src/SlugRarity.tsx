import * as React from 'react';
import { Switch } from '@headlessui/react';

import { UnburntSlug, BurntSlug, Trait } from './Types';
import { SizeOptions, LoadingImage } from './LoadingImage';

export interface SlugRarityProps {
    unburntSlugNameMap?: Map<string, UnburntSlug>;

    unburntSlugRankMap?: Map<number, UnburntSlug>;

    burntSlugNameMap?: Map<string, BurntSlug>;

    traitNameMap?: Map<string, Trait>;
}

export function SlugRarity(props: SlugRarityProps) {
    const {
        unburntSlugNameMap,
        unburntSlugRankMap,
        burntSlugNameMap,
        traitNameMap,
    } = props;

    /* Slug that the user looked up */
    const [slug, setSlug] = React.useState<UnburntSlug | undefined>();

    const [image, setImage] = React.useState<string | undefined>();

    /* Slug # that the user input */
    const [slugNumberSearch, setSlugNumberSearch] = React.useState<string>('');

    const [error, setError] = React.useState<string | undefined>();

    const [showTraitRarity, setShowTraitRarity] = React.useState<boolean>(true);

    const requiredProperties = React.useMemo(() => [
        unburntSlugNameMap,
        unburntSlugRankMap,
        burntSlugNameMap,
        traitNameMap,
    ], [
        unburntSlugNameMap,
        unburntSlugRankMap,
        burntSlugNameMap,
        traitNameMap,
    ]);

    React.useEffect(() => {
        if (requiredProperties.includes(undefined) || slugNumberSearch === '') {
            setImage(undefined);
            setSlug(undefined);
            setError(undefined);

            return;
        }

        const num = Number(slugNumberSearch);

        if (Number.isNaN(num)) {
            handleMissingImage();
            return;
        }

        const padded = num.toString().padStart(5, '0');

        const slug = unburntSlugNameMap!.get(padded);

        if (slug) {
            console.log(slug.image);
            handleExistingSlug(slug);
        } else {
            const burntSlug = burntSlugNameMap!.get(padded);

            if (burntSlug) {
                handleBurntSlug();
            } else {
                handleMissingImage();
            }
        }
    }, [
        slugNumberSearch,
        unburntSlugNameMap,
        burntSlugNameMap,
        traitNameMap,
        requiredProperties,
    ]);

    function handleExistingSlug(slug: UnburntSlug) {
        setSlug(slug);
        setImage(slug.image);
        setError(undefined);
    }

    function handleBurntSlug() {
        setImage(undefined);
        setError(`This slug was burnt to a crisp!`);
    }

    function handleMissingImage() {
        setImage(undefined);
        setError(`We weren't able to find that slug. Check your input!`);
    }

    function handleSlugNumberChange(e: React.ChangeEvent<HTMLInputElement>) {
        setSlugNumberSearch(e.target.value);
    }

    function handleToggleAttributeRarity() {
        setShowTraitRarity((val) => !val);
    }

    const data = React.useMemo(() => {
        if (requiredProperties.includes(undefined)) {
            return (
                <div className="flex items-center justify-center">
                    <span className="text-6xl">
                        Loading....
                    </span>
                </div>
            );
        }

        const compactClasses = `grid-cols-1 lg:grid-cols-2`;
        const expandedClasses = `grid-cols-1 md:grid-cols-2 xl:grid-cols-3`;

        const attributeDivClasses = showTraitRarity ? 'w-40' : 'w-56';
        const attributeDivBigClasses = showTraitRarity ? 'w-56' : 'w-64';

        const gridClasses = showTraitRarity ? expandedClasses : compactClasses;

        return (
            <div>
                <div className="flex flex-row items-center justify-center gap-x-2">
                    <span className="text-5xl uppercase">
                        Input Slug:
                    </span>

                    <input
                        className="border-slugGreen border-2 bg-transparent rounded h-full w-36 px-2 text-5xl text-center placeholder:text-gray-700"
                        placeholder="1234"
                        value={slugNumberSearch}
                        onChange={handleSlugNumberChange}
                    >
                    </input>
                </div>

                {error && (
                    <div className="mt-8 flex items-center justify-center">
                        <span className="text-4xl text-incinerator">
                            {error}
                        </span>
                    </div>
                )}

                {image && slug && (
                    <div className="flex flex-col items-center justify-center gap-x-4 gap-y-4 mt-8">
                        <div className="flex flex-row items-start justify-center w-full h-full">
                            <span className="text-slugGreen uppercase text-7xl">
                                Slug Rarity Rank:
                                <span className="text-white ml-3">
                                    {slug.rank}
                                </span>
                            </span>
                        </div>

                        <div className="flex flex-row items-start justify-center w-full h-full gap-x-8 mt-4">
                            <LoadingImage
                                src={image}
                                alt={'Slug'}
                                size={showTraitRarity ? SizeOptions.Large : SizeOptions.Giant}
                            />

                            <div className={`grid items-center justify-center gap-x-20 gap-y-4 ${gridClasses}`}>
                                {slug.attributes.map((a) => (
                                    <div className={`flex flex-col items-start justify-center ${attributeDivClasses} 2xl:${attributeDivBigClasses}`} key={a.trait_type}>
                                        <span className="text-2xl text-slugGreen uppercase">
                                            {a.trait_type}
                                        </span>

                                        <span
                                            className={`text-4xl uppercase truncate ${attributeDivClasses} 2xl:${attributeDivBigClasses}`}
                                            title={a.value}
                                        >
                                            {a.value}
                                        </span>

                                        {showTraitRarity && (
                                            <span
                                                className="text-2xl uppercase"
                                            >
                                                {traitNameMap!.get(`${a.trait_type}-${a.value}`)!.rarity}
                                            </span>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex items-center justify-center mt-10 gap-x-4">
                            <span>
                                Toggle Trait Rarity
                            </span>

                            <Switch
                                checked={showTraitRarity}
                                onChange={handleToggleAttributeRarity}
                                className={`${
                                    showTraitRarity ? 'bg-slugGreen' : 'bg-gray-200'
                                } relative inline-flex items-center h-6 rounded-full w-11`}
                            >
                                <span
                                    className={`${
                                        showTraitRarity ? 'translate-x-6' : 'translate-x-1'
                                    } inline-block w-4 h-4 transform bg-black rounded-full`}
                                />
                            </Switch>
                        </div>
                    </div>
                )}
            </div>
        );
    }, [
        traitNameMap,
        slugNumberSearch,
        slug,
        image,
        showTraitRarity,
        error,
        requiredProperties,
    ]);

    return data;
}
