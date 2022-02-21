export interface BurnTransaction {
    signature: string;
    slugsBurnt: string[];
}

export interface UserBurn {
    address: string;

    burns: number;

    rank: string;

    transactions: BurnTransaction;
}

export interface GenerationBurnt {
    name: string;
    count: number;
}

export interface SlugGangStats {
    totalMembers: number;

    slugScorchers: number;
    
    slugPyros: number;

    slugIncinerators: number;

    slugReaperAcolytes: number;
}

export interface Trait {
    name: string;

    count: number;

    burnt: number;

    rarity: string;

    percentBurnt: string;

    generations: string[];

    image: string;
}

export interface Attribute {
    name: string;
    values: Trait[];
}

export interface SlugAttributes {
    trait_type: string;
    
    value: string;
}

export interface UnburntSlug extends BurntSlug {
    formerRank: number;

    ranksGained: number;
}

export interface BurntSlug {
    name: string;

    image: string;

    mint: string;

    attributes: SlugAttributes[];

    rank: number;
}

export interface SlugData {
    unburnt: UnburntSlug[];

    burnt: BurntSlug[];
}

export interface BurnStats {
    biggestBurner: {
        address: string;
        count: number;
    }

    slugsBurnt: number;

    generations: GenerationBurnt[];

    slugGang: SlugGangStats;

    users: UserBurn[];
}

export interface APIData {
    lastUpdated: string;

    slugStats: {
        slugCount: number;
    }

    burnStats: BurnStats;

    attributes: Attribute[];

    slugs: SlugData;
}

export enum Generation {
    All = 'All',
    GenerationOne = 'Generation 1',
    GenerationTwo = 'Generation 2',
}
