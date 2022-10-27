import { useMemo, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';

import { VerifiedAddress } from '../Types';

export interface ManageAddressesProps {
    accessToken: string;

    addresses: VerifiedAddress[];

    roles: any[];

    toggleManageAddresses: () => void;

    removeAddress: (addr: string, roleData: any[]) => void;

    setPrimary: (addr: string) => void;
}

export function ManageAddresses(props: ManageAddressesProps) {
    const {
        addresses,
        roles,
        toggleManageAddresses,
        removeAddress,
        accessToken,
        setPrimary,
    } = props;

    const [performingSetPrimary, setPerformingSetPrimary] = useState<boolean>(false);
    const [performingUnlink, setPerformingUnlink] = useState<boolean>(false);

    const performingOperation = useMemo(() => performingSetPrimary || performingUnlink, [
        performingSetPrimary,
        performingUnlink,
    ])

    async function handleSetPrimary(address: string) {
        setPerformingSetPrimary(true);
        setPrimary(address);

        try {
            const res = await fetch(
                `${process.env.REACT_APP_VERIFY_URL}/update`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type":
                            "application/json",
                    },
                    body: JSON.stringify({
                        discordToken: accessToken,
                        address,
                        primary: true,
                    }),
                }
            );

            if (res.status === 200) {
                toast.info('Successfully updated primary wallet.');
            } else {
                toast.warn(`Failed to set primary wallet, got status code ${res.status}`);
            }
        } catch (err) {
            console.log((err as any).toString());
            toast.warn(`Failed to set primary wallet: ${(err as any).toString()}`);
        }

        setPerformingSetPrimary(false);
    }

    async function handleUnlink(address: string) {
        setPerformingUnlink(true);

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

            if (res.status === 200) {
                const { roles } = await res.json();
                removeAddress(address, roles);
            } else {
                toast.warn(`Failed to unlink wallet, got status code ${res.status}`);
            }
        } catch (err) {
            toast.warn(`Failed to unlink wallet: ${(err as any).toString()}`);
            console.log((err as any).toString());
            setPerformingUnlink(false);
        }

        setPerformingUnlink(false);
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

            <span className="text-center text-4xl mt-5 mb-4">
                {performingOperation ? 'Updating...' : 'Already Linked Wallets'}
            </span>

            {addresses.map(({ address, primary }) => (
                <div className="flex flex-row flex-wrap items-center justify-center gap-x-3 gap-y-3 w-full mb-5 sm:mb-2" key={address}>
                    <FontAwesomeIcon
                        icon={faX}
                        className="text-xl mt-0.5 text-red-500 cursor-pointer"
                        onClick={() => handleUnlink(address)}
                    />

                    <span className='truncate'>
                        {address}
                    </span>

                    {addresses.length > 1 && (
                        <button
                            className={`${primary ? 'bg-primary cursor-default' : 'bg-widget cursor-pointer hover:bg-accent'} rounded text-background ml-2 px-2 h-9 uppercase font-header text-xs`}
                            onClick={() => primary ? {} : handleSetPrimary(address)}
                            disabled={performingOperation}
                        >
                            Primary
                        </button>
                    )}
                </div>
            ))}
        </div>
    );
}
