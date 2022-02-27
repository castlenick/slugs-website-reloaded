import * as React from 'react';

import { Disclosure } from '@headlessui/react';

export interface RoadmapItem {
    item: string;
    complete?: boolean;
}

export interface RoadmapBundleProps {
    label: string;

    items: RoadmapItem[];

    initiallyExpanded?: boolean;
}

export function RoadmapBundle(props: RoadmapBundleProps) {
    const {
        label,
        items,
        initiallyExpanded = false,
    } = props;

    return (
        <Disclosure defaultOpen={initiallyExpanded}>
            {({ open }) => (
                <div className="flex flex-col gap-y-4">
                    <Disclosure.Button className="border-slugGreen border rounded p-3 px-4 w-72 flex items-center justify-between">
                        <span className="uppercase text-4xl">
                            {label}
                        </span>

                        <span className="text-3xl">
                            {open ? '▼' : '▶'}
                        </span>
                    </Disclosure.Button>

                    <Disclosure.Panel className="flex flex-col gap-y-2">
                        {items.map((item) => (
                            <div className="flex flex-row gap-x-3 items-start justify-start" key={item.item}>
                                <div className={`w-5 h-5 shrink-0 ${item.complete === false ? 'border-slugGreen' : 'bg-slugGreen border-gray-600'} border rounded`}>
                                </div>

                                <span className="text-2xl -mt-1.5">
                                    {item.item}
                                </span>
                            </div>
                        ))}
                    </Disclosure.Panel>
                </div>
            )}
        </Disclosure>
    );
}

export function Roadmap() {
    return (
        <div className="flex flex-col items-center justify-center">
            <div className="flex flex-row gap-x-12 gap-y-8 items-start justify-center">
                <div className="flex flex-col items-start justify-center gap-y-2 xl:basis-2/5">
                    <span className="text-slugGreen text-4xl uppercase">
                        SolSlugs Roadmap to Bluechip
                    </span>

                    <span className="text-2xl">
                        Our plan to take over Solana with degeneracy and community as a priority. Much of what we do for our project is influenced by our amazing community.
                    </span>

                    <span className="text-2xl mt-6">
                        Sol Slugs wouldn't be the same without Slug Gang.
                    </span>
                </div>

                <div className="flex flex-col justify-center gap-y-6 md:basis-2/5">
                    <RoadmapBundle
                        label={'October 2021'}
                        items={[
                            {
                                item: 'Launched Sol Slugs as a Free Mint - 10k supply',
                            },
                            {
                                item: 'Listed on Secondary Markets',
                            },
                            {
                                item: 'Created Website with Attributes and Rarities',
                            },
                            {
                                item: 'Added Quality of Life Bot',
                            },
                            {
                                item: 'Slugageddon - Created Burn Bot and Roles',
                            },
                        ]}
                    />

                    <RoadmapBundle
                        label={'November 2021'}
                        items={[
                            {
                                item: 'Added Slug Designer and Graveyard to site',
                            },
                            {
                                item: 'Listed on HowRare.is',
                            },
                            {
                                item: 'Added improved functionality to QoL bot and website',
                            },
                            {
                                item: 'Initiated Partnerships and Project Outreach',
                            },
                        ]}
                    />

                    <RoadmapBundle
                        label={'December 2021'}
                        items={[
                            {
                                item: 'Onboarded TS as Social Media Coordinator',
                            },
                            {
                                item: 'Burn Event to qualify for Gen 2',
                            },
                            {
                                item: 'Released Sol Incinerator',
                            },
                            {
                                item: 'Infungibles Partnership',
                            },
                        ]}
                    />

                    <RoadmapBundle
                        label={'January 2022'}
                        items={[
                            {
                                item: 'Gen 2 released',
                            },
                            {
                                item: '3D Slugs Released',
                            },
                            {
                                item: 'Token burning functionality added to incinerator',
                            },
                            {
                                item: 'Candy Finder and Alpha channel added for slug-gang members',
                            },
                            {
                                item: 'DCF Partnership',
                            },
                        ]}
                    />

                    <RoadmapBundle
                        label={'Febuary 2022'}
                        items={[
                            {
                                item: 'Onboarded Buggles as Tinker Dev',
                            },
                            {
                                item: 'Added safety features to the Incinerator',
                            },
                            {
                                item: 'Website Overhaul',
                            },
                            {
                                item: 'Listing Bot',
                            },
                            {
                                item: 'Partnership with large non-NFT project in the space',
                                complete: false,
                            },
                        ]}
                        initiallyExpanded={true}
                    />

                    <RoadmapBundle
                        label={'Future'}
                        items={[
                            {
                                item: '50/50',
                                complete: false,
                            },
                            {
                                item: 'PFP Slugs',
                                complete: false,
                            },
                            {
                                item: 'Additional NFT Bots',
                                complete: false,
                            },
                            {
                                item: 'Onboarding new community manager/events coordinator',
                                complete: false,
                            },
                            {
                                item: 'Slugmutation',
                                complete: false,
                            },
                            {
                                item: 'Gen 3',
                                complete: false,
                            },
                            {
                                item: 'Limited Release Merch for slug-gang',
                                complete: false,
                            },
                            {
                                item: 'Dating Sim',
                                complete: false,
                            },
                        ]}
                    />
                </div>
            </div>
        </div>
    );
}
