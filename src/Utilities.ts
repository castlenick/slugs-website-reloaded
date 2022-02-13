export function commify(s: string | number) {
    const x: string = typeof s === 'number'
        ? s.toString()
        : s;

    return x.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}

export function shortenAddress(address: string): string {
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
}
