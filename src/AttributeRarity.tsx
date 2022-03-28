import * as React from 'react';

import { Trait, Attribute, Generation } from './Types';
import { Dropdown } from './Dropdown';
import { LoadingImage, SizeOptions } from './LoadingImage';
import { ATTRIBUTES_PER_PAGE } from './Constants';
import { chunk, shortenValue } from './Utilities';
import { renderSlug, generatePreviewTraits } from './GenerateSlug';
import HowRare from './img/social-media-icons/HowRare.is.png';

export interface AttributeRarityProps {
    traitNameMap?: Map<string, Trait>;

    attributes?: Attribute[];
}

export function AttributeRarity(props: AttributeRarityProps) {
    const {
        traitNameMap,
        attributes,
    } = props;

    const [traitSelected, setTraitSelected] = React.useState('Background');
    const [generationSelected, setGenerationSelected] = React.useState<Generation>(Generation.All);
    const [page, setPage] = React.useState<number>(0);

    const attributeValues = React.useMemo(() => {
        if (!attributes) {
            return [];
        }

        for (const attribute of attributes) {
            if (attribute.name === traitSelected) {
                return attribute.values;
            }
        }

        return [];
    }, [
        attributes,
        traitSelected
    ]);

    const traitOptions = React.useMemo(() => {
        if (!attributes) {
            return [];
        }

        return attributes.map((a) => (
            {
                label: a.name,
                value: a.name,
            }
        ));
    }, [attributes]);

    const pages = React.useMemo(() => {
        const filtered = attributeValues.filter((a) => {
            if (generationSelected === Generation.All) {
                return true;
            }

            return a.generations.includes(generationSelected);
        });

        return chunk(filtered, ATTRIBUTES_PER_PAGE);
    }, [
        attributeValues,
        generationSelected,
    ]);

    const pageData = React.useMemo(() => {
        if (!traitNameMap) {
            return [];
        }

        const attributes = [];

        for (const item of pages[page] || []) {
            const exampleTraits = generatePreviewTraits({
                trait_type: traitSelected,
                value: item.name,
            });

            attributes.push({
                exampleImage: renderSlug(exampleTraits, traitNameMap),
                ...item,
            });
        }

        return attributes;
    }, [
        page,
        pages,
        traitNameMap,
        traitSelected,
    ]);

    const pageCount = React.useMemo(() => pages.length, [pages]);

    React.useEffect(() => {
        setPage(0);
    }, [pageCount]);

    function changePage(pages: number) {
        setPage((currentPage) => {
            if (currentPage + pages < 0) {
                return currentPage;
            }

            if (currentPage + pages >= pageCount) {
                return currentPage;
            }

            return currentPage + pages;
        });
    }

    if (!traitNameMap || !attributes) {
        return (
            <div className="flex items-center justify-center">
                <span className="text-6xl">
                    Loading....
                </span>
            </div>
        );
    }

    return (
        <div className="flex flex-col">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-4">
                <div className="flex flex-col items-start justify-center">
                    <span className="text-6xl uppercase">
                        Attribute Rarity
                    </span>

                    <span className="text-2xl mt-1">
                        Traits change between generations of slugs.
                    </span>

                    <span className="text-2xl">
                        Some are retired while others are introduced.
                    </span>
                </div>

                <div className="flex flex-row items-end justify-end gap-y-3 w-full 2xl:gap-x-16">
                    <Dropdown
                        label={'Generation'}
                        value={generationSelected}
                        onChange={(generation) => setGenerationSelected(generation)}
                        options={[
                            {
                                value: Generation.All,
                                label: 'All',
                            },
                            {
                                label: 'Generation 1',
                                value: Generation.GenerationOne,
                            },
                            {
                                label: 'Generation 2',
                                value: Generation.GenerationTwo,
                            },
                        ]}
                    />

                    <Dropdown
                        label={'Trait'}
                        value={traitSelected}
                        onChange={(trait) => setTraitSelected(trait)}
                        options={traitOptions}
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 mt-10 gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
                {pageData.map((attribute) => {
                    const traitData = traitNameMap.get(`${traitSelected}-${attribute.name}`)!;

                    return (
                        <div className="flex flex-col items-center justify-center" key={attribute.name}>
                            <LoadingImage
                                asyncSrc={attribute.exampleImage}
                                alt={attribute.name}
                                size={SizeOptions.Medium}
                            />

                            <div className="flex flex-col items-start w-56">
                                <span
                                    className="uppercase text-3xl mt-2"
                                    title={attribute.name}
                                >
                                    {shortenValue(attribute.name, 16)}
                                </span>

                                <span className="text-2xl">
                                    Rarity: {traitData.rarity}
                                </span>

                                <span className="text-2xl">
                                    Burnt: {traitData.burnt}
                                </span>
                            </div>
                        </div>
                    )
                })}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 mt-10 gap-y-2">
                <div>
                </div>

                <div className="flex items-center justify-center">
                    <div
                        onClick={() => changePage(-1)}
                        className="cursor-pointer"
                    >
                        ◀
                    </div>

                    <span className="text-xl mx-4">
                        {`Page ${page+1} of ${pageCount}`}
                    </span>

                    <div onClick={() => changePage(1)} style={{ cursor: 'pointer' }}>
                        ▶
                    </div>
                </div>

                <div className="flex flex-col items-end justify-center gap-y-2">
                    <span>
                        We're also on
                    </span>

                    <a href={'https://howrare.is/solslugs'}>
                        <img
                            src={HowRare}
                            alt='HowRare'
                        />
                    </a>
                </div>
            </div>
        </div>
    );
}
