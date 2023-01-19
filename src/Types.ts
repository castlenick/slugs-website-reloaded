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
    value?: string;
}

export interface UnburntSlug extends Slug {
    formerRank: number;

    ranksGained: number;
}

export interface BurntSlug extends Slug {
    burntBy: string;
}

export interface Slug {
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
    GenerationThree = 'Generation 3',
}

export enum Align {
    Start = 0,
    Center = 1,
    End = 2,
}

export interface VerifiedAddress {
    address: string;

    primary: boolean;
}

export interface DiscordUser {
    id: string;
    username: string;
    discriminator: string;
    avatar: string;
    verified: boolean;
    email: string;
    flags: number;
    banner: string;
    accent_color: number;
    premium_type: number;
    public_flags: number;
}


