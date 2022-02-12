export async function fetchBurntData() {
    const url = 'https://letsalllovelain.com/burntslugs/';

    try {
        const data = await fetch(url);

        const raw = await data.json();

        for (let item of raw.tokenInfo) {
            item.name = Number(item.name.split(' - ')[1]);

            item.attributes.push(
                getAttributeCount(item.attributes), {
                    trait_type: 'Generation',
                    value: item.generation.split(' ').splice(-1)[0],
                },
            );
        }

        return raw;
    } catch (err) {
        console.log(`Failed to fetch burn data: ${(err as any).toString()}!`);
        return undefined;
    }
}

export function calculateStatRarity(items: any[]) {
    const rarityMap = new Map();

    for (const item of items) {
        for (const layer of item.attributes) {
            const existing = rarityMap.get(`${layer.trait_type}-${layer.value}`);

            const newCount = existing
                ? existing + 1
                : 1;

            rarityMap.set(`${layer.trait_type}-${layer.value}`, newCount);
        }
    }

    return rarityMap;
}

function getAttributeCount(attributes: any[]) {
    let count = 0;

    for (const attribute of attributes) {
        if (attribute.value !== 'None') {
            count++;
        }
    }

    return {
        trait_type: 'Attribute Count',
        value: count,
    };
}

export function calculateRarity(
    rarityMap: Map<string, any>,
    item: any,
    nftCount: number) {

    let totalRarityScore = 0;

    const attributes = [];

    for (const layer of item.attributes) {
        const attributeCount = rarityMap.get(`${layer.trait_type}-${layer.value}`);

        if (layer.trait_type !== 'Generation') {
            const rarityScore = 1 / (attributeCount / nftCount);

            totalRarityScore += rarityScore;
        }

        attributes.push({
            trait_type: layer.trait_type,
            value: layer.value + ` - ${((attributeCount / nftCount) * 100).toFixed(2)}%`,
        });
    }

    return {
        rarity: totalRarityScore,
        attributes,
    };
}

export function calculateRanks(items: any[], field: string) {
    const statRarity = calculateStatRarity(items);

    const rankedItems = [];

    for (let item of items) {
        const { rarity, attributes } = calculateRarity(
            statRarity,
            item,
            items.length,
        );

        rankedItems.push({
            name: item.name,
            rarity,
            attributes,
            mint: item.mint,
            image: item.image,
            generation: item.generation,
        });
    }

    const sortedItems = rankedItems.sort((a, b) => b.rarity - a.rarity);

    const rankMap = new Map();

    let rank = 1;

    for (let item of sortedItems) {
        (item as any).rank = rank++;
        rankMap.set((item as any)[field], item);
    }

    return rankMap;
}

export function createBurntMap(burntData: any) {
    const map = new Map();

    for (const token of burntData.tokenInfo) {
        map.set(token.mint, token.burnt);
    }

    return map;
}
