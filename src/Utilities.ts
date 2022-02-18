export function commify(s: string | number) {
    const x: string = typeof s === 'number'
        ? s.toString()
        : s;

    return x.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}

export function shortenAddress(address: string, totalLength: number = 11): string {
    const excludingDots = totalLength - 3;
    const half = Math.floor(excludingDots / 2);

    return `${address.slice(0, half)}...${address.slice(-half)}`;
}

export function sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export function shortenValue(value: string, length: number): string {
    if (value.length <= length) {
        return value;
    }

    return value.substr(0, length) + '...';
}
