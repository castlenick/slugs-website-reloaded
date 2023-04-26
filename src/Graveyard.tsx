import * as React from 'react';
import { Switch } from '@headlessui/react';

import { BurntSlug, Trait, Attribute } from './Types';
import { MemeGraveyard } from './MemeGraveyard';
import { ProfessionalGraveyard } from './ProfessionalGraveyard';

export interface GraveyardProps {
    burntSlugs?: BurntSlug[];
    burnCount?: number;
    traitNameMap?: Map<string, Trait>;
    attributes?: Attribute[];
}

export function Graveyard(props: GraveyardProps) {
    const {
        burntSlugs,
        burnCount,
        traitNameMap,
        attributes,
    } = props;
    
    const [professionalGraveyard, setProfessionalGraveyard] = React.useState<boolean>(true);

    function handleToggleProfessionalGraveyard() {
        setProfessionalGraveyard((val) => !val);
    }

    const graveyardData = React.useMemo(() => {
        if (!burntSlugs || !burnCount) {
            return (
                <div className="flex items-center justify-center mt-8">
                    <span className="text-6xl">
                        Loading....
                    </span>
                </div>
            );
        }

        const sorted = burntSlugs.sort((a, b) => a.rank - b.rank);

        if (professionalGraveyard) {
            return <ProfessionalGraveyard burntSlugs={sorted} traitNameMap={traitNameMap} attributes={attributes}/>;
        }

        return (
            <MemeGraveyard
                burntSlugs={sorted}
                burnCount={burnCount}
            />
        );
    }, [
        burnCount,
        burntSlugs,
        professionalGraveyard,
        traitNameMap,
        attributes,
    ]);
    
    return (
        <div className="flex flex-col items-center justify-center">
            <div className="flex flex-wrap sm:flex-nowrap items-center justify-center gap-x-4 gap-y-4">
                <span className="text-center">
                    Toggle Graveyard Style
                </span>

                <Switch
                    checked={professionalGraveyard}
                    onChange={handleToggleProfessionalGraveyard}
                    className={`${
                        professionalGraveyard ? 'bg-slugGreen' : 'bg-gray-200'
                    } relative inline-flex items-center h-6 rounded-full w-11`}
                >
                    <span
                        className={`${
                            professionalGraveyard ? 'translate-x-6' : 'translate-x-1'
                        } inline-block w-4 h-4 transform bg-black rounded-full`}
                    />
                </Switch>
            </div>

            {graveyardData}
        </div>
    );
}
