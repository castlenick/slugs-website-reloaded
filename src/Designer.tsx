import * as React from 'react';
import { Switch } from '@headlessui/react';

import { Trait, Attribute, Align } from './Types';
import { SizeOptions, LoadingImage } from './LoadingImage';
import { renderSlug, pickRandomTrait } from './GenerateSlug';
import { Dropdown } from './Dropdown';

const canvasWidths = new Map([
    [256, 'w-[256px]'],
    [432, 'w-[256px] md:w-[432px]'],
    [512, 'w-[256px] md:w-[512px]'],
]);

const canvasHeights = new Map([
    [256, 'h-[256px]'],
    [432, 'h-[256px] md:h-[432px]'],
    [512, 'h-[256px] md:h-[512px]'],
]);

const canvasOptions = [
    {
        label: '256x256',
        value: 256,
    },
    {
        label: '432x432',
        value: 432,
    },
    {
        label: '512x512',
        value: 512,
    },
];

export interface DesignerProps {
    traitNameMap?: Map<string, Trait>;

    attributes?: Attribute[];
}

export interface AttributeProps {
    trait?: Trait;

    attributes?: Attribute[];

    attribute: string;

    traitNameMap?: Map<string, Trait>;

    showTraitRarity: boolean;

    onChange: (newTrait: string) => void;
}

function AttributeWrapper(props: AttributeProps) {
    const {
        attributes,
        attribute,
        trait,
        traitNameMap,
        showTraitRarity,
        onChange,
    } = props;

    const attributeDivClasses = showTraitRarity ? 'w-40' : 'w-56';
    const attributeDivBigClasses = showTraitRarity ? 'w-56' : 'w-64';

    const dropdownWidth = showTraitRarity ? 'w-40' : 'w-52';

    const availableValues = React.useMemo(() => {
        if (!attributes) {
            return [];
        }

        for (const attr of attributes) {
            if (attr.name === attribute) {
                const options = attr.values.reduce((accumulator, a) => {
                    if (a.name !== 'None') {
                        accumulator.push({
                            value: a.name,
                            label: a.name,
                        });
                    }

                    return accumulator;
                }, [] as { value: string, label: string }[]);

                options.sort((a, b) => a.label.localeCompare(b.label));

                options.unshift({
                    value: 'None',
                    label: 'None',
                });

                return options;
            }
        }

        return [];
    }, [attributes, attribute]);

    return (
        <div className={`flex flex-col items-start justify-center ${attributeDivClasses} 2xl:${attributeDivBigClasses}`} key={attribute}>
            <Dropdown
                label={attribute}
                value={trait?.name || 'None'}
                onChange={onChange}
                options={availableValues}
                headerStyle={`text-2xl text-slugGreen uppercase`}
                valueStyle={`text-4xl uppercase truncate`}
                align={Align.Start}
                dropdownWidth={dropdownWidth}
            />

            {showTraitRarity && trait && (
                <span
                    className="text-2xl uppercase"
                >
                    {traitNameMap!.get(`${attribute}-${trait.name}`)!.rarity}
                </span>
            )}
        </div>
    );
}

export function Designer(props: DesignerProps) {
    const {
        traitNameMap,
        attributes,
    } = props;

    const [image, setImage] = React.useState<Promise<string> | undefined>();

    const [showTraitRarity, setShowTraitRarity] = React.useState<boolean>(false);

    const [canvasSize, setCanvasSize] = React.useState<number>(432);

    const [background, setBackground] = React.useState<Trait>();
    const [slug, setSlug] = React.useState<Trait>();
    const [chest, setChest] = React.useState<Trait>();
    const [mouth, setMouth] = React.useState<Trait>();
    const [head, setHead] = React.useState<Trait>();
    const [eyes, setEyes] = React.useState<Trait>();
    const [tail, setTail] = React.useState<Trait>();
    const [back, setBack] = React.useState<Trait>();
    const [hands, setHands] = React.useState<Trait>();

    React.useEffect(() => {
        if (!attributes) {
            return;
        }

        setBackground(pickRandomTrait('Background', attributes));
        setSlug(pickRandomTrait('Slug', attributes));
        setChest(pickRandomTrait('Chest', attributes));
        setMouth(pickRandomTrait('Mouth', attributes));
        setHead(pickRandomTrait('Head', attributes));
        setEyes(pickRandomTrait('Eyes', attributes));
        setTail(pickRandomTrait('Tail', attributes));
        setBack(pickRandomTrait('Back', attributes));
        setHands(pickRandomTrait('Hands', attributes));
    }, [attributes]);

    React.useEffect(() => {
        if (
            !traitNameMap || 
            !attributes
        ) {
            return;
        }

        const traits = [
            {
                trait_type: 'Background',
                value: background?.name,
            },
            {
                trait_type: 'Slug',
                value: slug?.name,
            },
            {
                trait_type: 'Chest',
                value: chest?.name,
            },
            {
                trait_type: 'Mouth',
                value: mouth?.name,
            },
            {
                trait_type: 'Head',
                value: head?.name,
            },
            {
                trait_type: 'Eyes',
                value: eyes?.name,
            },
            {
                trait_type: 'Tail',
                value: tail?.name,
            },
            {
                trait_type: 'Back',
                value: back?.name,
            },
            {
                trait_type: 'Hands',
                value: hands?.name,
            },
        ];

        setImage(renderSlug(traits, traitNameMap, canvasSize));
    }, [
        attributes,
        traitNameMap,
        background,
        slug,
        chest,
        mouth,
        head,
        eyes,
        tail,
        back,
        hands,
        canvasSize,
    ]);

    function handleToggleAttributeRarity() {
        setShowTraitRarity((val) => !val);
    }

    const handleTraitChanged = React.useCallback((setFunc: (str: any) => void, attribute: string, newTraitValue: string) => {
        if (!attributes) {
            return;
        }

        for (const attr of attributes) {
            if (attr.name === attribute) {
                for (const trait of attr.values) {
                    if (trait.name === newTraitValue) {
                        setFunc(trait);
                        return;
                    }
                }
            }
        }

        setFunc(undefined);
    }, [
        attributes,
    ]);

    function onCanvasSizeChange(value: number) {
        setCanvasSize(value);
    }

    const handleRandomize = React.useCallback(() => {
        if (!attributes) {
            return;
        }

        setBackground(pickRandomTrait('Background', attributes));
        setSlug(pickRandomTrait('Slug', attributes));
        setChest(pickRandomTrait('Chest', attributes));
        setMouth(pickRandomTrait('Mouth', attributes));
        setHead(pickRandomTrait('Head', attributes));
        setEyes(pickRandomTrait('Eyes', attributes));
        setTail(pickRandomTrait('Tail', attributes));
        setBack(pickRandomTrait('Back', attributes));
        setHands(pickRandomTrait('Hands', attributes));
    }, [
        attributes,
    ]);

    const data = React.useMemo(() => {
        if (
            !traitNameMap || 
            !attributes
        ) {
            return (
                <div className="flex items-center justify-center">
                    <span className="text-6xl">
                        Loading....
                    </span>
                </div>
            );
        }

        const compactClasses = `grid-cols-1 2xl:grid-cols-2`;
        const expandedClasses = `lg:grid-cols-2`;

        const gridClasses = canvasSize === 512
            ? compactClasses 
            : expandedClasses;

        return (
            <div>
                <div className="flex flex-col items-center justify-center gap-x-4 gap-y-4 mt-8">
                    <div className="flex flex-wrap sm:flex-nowrap flex-row items-start justify-center w-full h-full gap-x-8 gap-y-4 mt-4">
                        <div className="flex flex-col items-center gap-y-6">
                            <LoadingImage
                                asyncSrc={image}
                                alt={'Slug'}
                                size={showTraitRarity ? SizeOptions.Large : SizeOptions.Giant}
                                sizeClasses={`${canvasWidths.get(canvasSize)} ${canvasHeights.get(canvasSize)}`}
                            />

                            <div className="flex flex-wrap md:flex-nowrap flex-row w-full items-center justify-center sm:justify-end gap-y-4">
                                <button
                                    className={`bg-primary disabled:bg-disabled rounded text-background w-52 sm:w-auto sm:grow h-9 sm:h-11 uppercase font-header text-xs`}
                                    onClick={handleRandomize}
                                >
                                    Randomize
                                </button>

                                <Dropdown
                                    label={'Canvas Size'}
                                    value={canvasSize}
                                    onChange={onCanvasSizeChange}
                                    options={canvasOptions}
                                    headerStyle={`text-2xl uppercase`}
                                    valueStyle={`text-4xl uppercase truncate`}
                                    align={Align.End}

                                />
                            </div>
                        </div>

                        <div className={`grid items-center justify-center gap-x-20 gap-y-4 ${gridClasses}`}>
                            <AttributeWrapper
                                attributes={attributes}
                                attribute={'Background'}
                                trait={background}
                                traitNameMap={traitNameMap}
                                showTraitRarity={showTraitRarity}
                                onChange={(trait) => handleTraitChanged(setBackground, 'Background', trait)}
                            />

                            <AttributeWrapper
                                attributes={attributes}
                                attribute={'Slug'}
                                trait={slug}
                                traitNameMap={traitNameMap}
                                showTraitRarity={showTraitRarity}
                                onChange={(trait) => handleTraitChanged(setSlug, 'Slug', trait)}
                            />

                            <AttributeWrapper
                                attributes={attributes}
                                attribute={'Chest'}
                                trait={chest}
                                traitNameMap={traitNameMap}
                                showTraitRarity={showTraitRarity}
                                onChange={(trait) => handleTraitChanged(setChest, 'Chest', trait)}
                            />

                            <AttributeWrapper
                                attributes={attributes}
                                attribute={'Mouth'}
                                trait={mouth}
                                traitNameMap={traitNameMap}
                                showTraitRarity={showTraitRarity}
                                onChange={(trait) => handleTraitChanged(setMouth, 'Mouth', trait)}
                            />

                            <AttributeWrapper
                                attributes={attributes}
                                attribute={'Head'}
                                trait={head}
                                traitNameMap={traitNameMap}
                                showTraitRarity={showTraitRarity}
                                onChange={(trait) => handleTraitChanged(setHead, 'Head', trait)}
                            />

                            <AttributeWrapper
                                attributes={attributes}
                                attribute={'Eyes'}
                                trait={eyes}
                                traitNameMap={traitNameMap}
                                showTraitRarity={showTraitRarity}
                                onChange={(trait) => handleTraitChanged(setEyes, 'Eyes', trait)}
                            />

                            <AttributeWrapper
                                attributes={attributes}
                                attribute={'Tail'}
                                trait={tail}
                                traitNameMap={traitNameMap}
                                showTraitRarity={showTraitRarity}
                                onChange={(trait) => handleTraitChanged(setTail, 'Tail', trait)}
                            />

                            <AttributeWrapper
                                attributes={attributes}
                                attribute={'Back'}
                                trait={back}
                                traitNameMap={traitNameMap}
                                showTraitRarity={showTraitRarity}
                                onChange={(trait) => handleTraitChanged(setBack, 'Back', trait)}
                            />

                            <AttributeWrapper
                                attributes={attributes}
                                attribute={'Hands'}
                                trait={hands}
                                traitNameMap={traitNameMap}
                                showTraitRarity={showTraitRarity}
                                onChange={(trait) => handleTraitChanged(setHands, 'Hands', trait)}
                            />
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
            </div>
        );
    }, [
        traitNameMap,
        image,
        showTraitRarity,
        attributes,
        background,
        slug,
        chest,
        mouth,
        head,
        eyes,
        tail,
        back,
        hands,
        canvasSize,
        handleRandomize,
        handleTraitChanged,
    ]);

    return data;
}
