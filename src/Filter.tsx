import * as React from "react";
import { Switch } from "@headlessui/react";

import { Trait, Attribute, Align } from "./Types";
import { Dropdown } from "./Dropdown";

export interface Traits {
    Background?: string;
    Slug?: string;
    Chest?: string;
    Mouth?: string;
    Head?: string;
    Eyes?: string;
    Tail?: string;
    Back?: string;
    Hands?: string;
}

export interface FilterProps {
    traitNameMap?: Map<string, Trait>;

    attributes?: Attribute[];

    onChange: (data: Traits) => void;
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

    const attributeDivClasses = showTraitRarity ? "w-40" : "w-56";
    const attributeDivBigClasses = showTraitRarity ? "w-56" : "w-64";

    const dropdownWidth = showTraitRarity ? "w-40" : "w-52";

    const availableValues = React.useMemo(() => {
        if (!attributes) {
            return [];
        }

        for (const attr of attributes) {
            if (attr.name === attribute) {
                const options = attr.values.reduce((accumulator, a) => {
                    if (a.name !== "None") {
                        accumulator.push({
                            value: a.name,
                            label: a.name,
                        });
                    }

                    return accumulator;
                }, [] as { value: string; label: string }[]);

                options.sort((a, b) => a.label.localeCompare(b.label));

                options.unshift({
                    value: "",
                    label: "None",
                });

                return options;
            }
        }

        return [];
    }, [attributes, attribute]);

    return (
        <div
            className={`flex flex-col items-start justify-center ${attributeDivClasses} 2xl:${attributeDivBigClasses}`}
            key={attribute}
        >
            <Dropdown
                label={attribute}
                value={trait?.name || ""}
                onChange={onChange}
                options={availableValues}
                headerStyle={`text-2xl text-slugGreen uppercase`}
                valueStyle={`text-4xl uppercase truncate`}
                align={Align.Start}
                dropdownWidth={dropdownWidth}
            />

            {showTraitRarity && trait && (
                <span className="text-2xl uppercase">
                    {traitNameMap!.get(`${attribute}-${trait.name}`)!.rarity}
                </span>
            )}
        </div>
    );
}


export function Filter(props: FilterProps) {
    const { traitNameMap, attributes, onChange } = props;
    const [showTraitRarity, setShowTraitRarity] = React.useState<boolean>(false);

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
        if (!traitNameMap || !attributes) {
            return;
        }

        const traits: Traits = {
            Background: background?.name,
            Slug: slug?.name,
            Chest: chest?.name,
            Mouth: mouth?.name,
            Head: head?.name,
            Eyes: eyes?.name,
            Tail: tail?.name,
            Back: back?.name,
            Hands: hands?.name,
        };

        onChange(traits);

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
        onChange
    ]);

    function handleToggleAttributeRarity() {
        setShowTraitRarity((val) => !val);
    }

    const handleTraitChanged = React.useCallback(
        (setFunc: (str: any) => void, attribute: string, newTraitValue: string) => {
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
        },
        [attributes]
    );

    const data = React.useMemo(() => {
        if (!traitNameMap || !attributes) {
            return (
                <div className="flex items-center justify-center">
                    <span className="text-6xl">Loading....</span>
                </div>
            );
        }

        return (
            <div>
                <div className="flex flex-col items-center justify-center gap-x-4 gap-y-4 mt-8">
                    <div className="flex flex-wrap sm:flex-nowrap flex-row items-start justify-center w-full h-full gap-x-8 gap-y-4 mt-4">
                        <div
                            className={`grid items-center justify-center gap-x-20 gap-y-4 grid-cols-1 2xl:grid-cols-2`}
                        >
                            <AttributeWrapper
                                attributes={attributes}
                                attribute={"Background"}
                                trait={background}
                                traitNameMap={traitNameMap}
                                showTraitRarity={showTraitRarity}
                                onChange={(trait) =>
                                    handleTraitChanged(setBackground, "Background", trait)
                                }
                            />

                            <AttributeWrapper
                                attributes={attributes}
                                attribute={"Slug"}
                                trait={slug}
                                traitNameMap={traitNameMap}
                                showTraitRarity={showTraitRarity}
                                onChange={(trait) => handleTraitChanged(setSlug, "Slug", trait)}
                            />

                            <AttributeWrapper
                                attributes={attributes}
                                attribute={"Chest"}
                                trait={chest}
                                traitNameMap={traitNameMap}
                                showTraitRarity={showTraitRarity}
                                onChange={(trait) =>
                                    handleTraitChanged(setChest, "Chest", trait)
                                }
                            />

                            <AttributeWrapper
                                attributes={attributes}
                                attribute={"Mouth"}
                                trait={mouth}
                                traitNameMap={traitNameMap}
                                showTraitRarity={showTraitRarity}
                                onChange={(trait) =>
                                    handleTraitChanged(setMouth, "Mouth", trait)
                                }
                            />

                            <AttributeWrapper
                                attributes={attributes}
                                attribute={"Head"}
                                trait={head}
                                traitNameMap={traitNameMap}
                                showTraitRarity={showTraitRarity}
                                onChange={(trait) => handleTraitChanged(setHead, "Head", trait)}
                            />

                            <AttributeWrapper
                                attributes={attributes}
                                attribute={"Eyes"}
                                trait={eyes}
                                traitNameMap={traitNameMap}
                                showTraitRarity={showTraitRarity}
                                onChange={(trait) => handleTraitChanged(setEyes, "Eyes", trait)}
                            />

                            <AttributeWrapper
                                attributes={attributes}
                                attribute={"Tail"}
                                trait={tail}
                                traitNameMap={traitNameMap}
                                showTraitRarity={showTraitRarity}
                                onChange={(trait) => handleTraitChanged(setTail, "Tail", trait)}
                            />

                            <AttributeWrapper
                                attributes={attributes}
                                attribute={"Back"}
                                trait={back}
                                traitNameMap={traitNameMap}
                                showTraitRarity={showTraitRarity}
                                onChange={(trait) => handleTraitChanged(setBack, "Back", trait)}
                            />

                            <AttributeWrapper
                                attributes={attributes}
                                attribute={"Hands"}
                                trait={hands}
                                traitNameMap={traitNameMap}
                                showTraitRarity={showTraitRarity}
                                onChange={(trait) =>
                                    handleTraitChanged(setHands, "Hands", trait)
                                }
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-center mt-10 gap-x-4">
                        <span>Toggle Trait Rarity</span>

                        <Switch
                            checked={showTraitRarity}
                            onChange={handleToggleAttributeRarity}
                            className={`${
                                showTraitRarity ? "bg-slugGreen" : "bg-gray-200"
                            } relative inline-flex items-center h-6 rounded-full w-11`}
                        >
                            <span
                                className={`${
                                    showTraitRarity ? "translate-x-6" : "translate-x-1"
                                } inline-block w-4 h-4 transform bg-black rounded-full`}
                            />
                        </Switch>
                    </div>
                </div>
            </div>
        );
    }, [
        traitNameMap,
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
        handleTraitChanged,
    ]);

    return data;
}


