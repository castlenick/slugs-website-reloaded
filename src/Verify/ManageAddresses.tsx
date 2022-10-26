import { useState } from "react";

import { VerifiedAddress } from '../Types';

export interface ManageAddressesProps {
    accessToken: string;
    addresses: VerifiedAddress[];
    roles: any[];
    toggleManageAddresses: () => void;
    removeAddress: (addr: string, roleData: any[]) => void;
}

export function ManageAddresses(props: ManageAddressesProps) {
    const {
        addresses,
        roles,
        toggleManageAddresses,
        removeAddress,
        accessToken,
    } = props;

    const [performingUnlink, setPerformingUnlink] = useState<boolean>(false);
    const [unlinkAddr, setUnlinkAddr] = useState<string>();

    async function handleUnlink(address: string) {
        setPerformingUnlink(true);
        setUnlinkAddr(address);

        try {
            const res = await fetch(
                `${process.env.REACT_APP_VERIFY_URL}/unlink`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type":
                            "application/json",
                    },
                    body: JSON.stringify({
                        discordToken: accessToken,
                        address,
                    }),
                }
            );

            setPerformingUnlink(false);
            setUnlinkAddr(undefined);

            if (res.status === 200) {
                const { roles } = await res.json();
                removeAddress(address, roles);
            } else {
            }
        } catch (err) {
            console.log((err as any).toString());
            setPerformingUnlink(false);
            setUnlinkAddr(undefined);
        }
    }

    return (
        <div className="flex flex-col items-center justify-center gap-y-4">
            <div className="flex flex-row items-center justify-center gap-x-5 flex-wrap gap-y-5">
                <span className="text-center">
                    {`You have linked ${addresses.length} address${addresses.length > 1 ? 'es' : ''}. You can return to Discord, or link another wallet.`}
                </span>

                <button
                    className={`bg-primary disabled:bg-disabled rounded text-background px-2 h-9 sm:h-11 uppercase font-header text-xs`}
                    onClick={toggleManageAddresses}
                >
                    Link Another?
                </button>
            </div>

            {roles.length > 0 && (
                <>
                    <span className="text-center text-4xl mt-4">
                        Your Roles
                    </span>

                    <div className="flex flex-col items-center justify-center gap-y-1">
                        {roles.map((r) => (
                            <span className="inline mx-3 text-center" style={{ color: r.color }} key={r.name}>
                                {r.name} - {r.description}
                            </span>
                        ))}
                    </div>
                </>
            )}

            {roles.length === 0 && (
                <span className="text-center text-4xl mt-4">
                    We didn't find a Sol Slug in your wallet, but we'll keep checking, if you just bought one.
                </span>
            )}

            <span className="text-center text-4xl mt-5">
                {performingUnlink ? 'Updating...' : 'Already Linked Wallets'}
            </span>

            {addresses.map(({ address, primary }) => (
                <div className="flex flex-row flex-wrap items-center justify-center gap-x-5 gap-y-5 w-full" key={address}>
                    <span className='truncate'>
                        {address}
                    </span>

                    <div className='flex flex-row flex-wrap gap-x-5 gap-y-5 items-center justify-center'>
                        <button
                            className={`bg-primary disabled:bg-disabled rounded text-background px-2 h-9 sm:h-11 uppercase font-header text-xs`}
                            onClick={() => handleUnlink(address)}
                            disabled={performingUnlink}
                        >
                            {address === unlinkAddr ? 'Unlinking...' : 'Unlink'}
                        </button>

                        {addresses.length > 1 && (
                            <button
                                className={`bg-primary disabled:bg-disabled rounded text-background px-2 h-9 sm:h-11 uppercase font-header text-xs`}
                                onClick={() => handleUnlink(address)}
                                disabled={performingUnlink || primary}
                            >
                                {primary ? 'Primary' : 'Set Primary'}
                            </button>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}
