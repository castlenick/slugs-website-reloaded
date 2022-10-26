import { useEffect, useState } from "react";
import { useWallet } from '@solana/wallet-adapter-react';

import { VerifiedAddress, DiscordUser } from '../Types';
import { PerformVerify } from './PerformVerify';
import { ManageAddresses } from './ManageAddresses';
import { DiscordError } from './DiscordError';
import { LinkDiscord } from './LinkDiscord';
import { ConnectWallet } from './ConnectWallet';

async function fetchDiscordUserInfo(tokenType: string, accessToken: string) {
    let user;

    const discordRes = await fetch("https://discord.com/api/users/@me", {
        headers: {
            authorization: `${tokenType} ${accessToken}`,
        },
    });

    if (discordRes.status === 200) {
        user = await discordRes.json();
    } else {
        return undefined;
    }

    const userRequest = {
        discordToken: accessToken,
    };

    const userRes = await fetch(
        `${process.env.REACT_APP_VERIFY_URL}/user`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userRequest),
        },
    );

    if (userRes.status === 200) {
        const json = await userRes.json();

        return {
            ...json,
            user,
        };
    }

    return {
        user,
        roles: [],
        addresses: [],
    };
}

function Loading() {
    return (
        <div className="flex flex-col items-center justify-center gap-y-5">
            <p>
                Loading user info from Discord...
            </p>
        </div>
    );
}

export function Verifier() {
    const [user, setUser] = useState<DiscordUser | null | false>(null);
    const [discordError, setDiscordError] = useState<string | null>(null);
    const [addresses, setAddresses] = useState<VerifiedAddress[]>([]);
    const [roles, setRoles] = useState<any[]>([]);
    const [manageAddresses, setManageAddresses] = useState<boolean>(true);
    const [primaryAddress, setPrimaryAddress] = useState<string>();

    const {
        connected,
    } = useWallet();

    const [ , query ] = window.location.hash.split('?');

    const fragment = new URLSearchParams(query);

    const [accessToken, tokenType] = [
        fragment.get("access_token"),
        fragment.get("token_type"),
    ];

    function restartProcess() {
        window.location.href = `/#/verify`;
        setUser(null);
        setAddresses([]);
        setRoles([]);
    }

    function toggleManageAddresses() {
        setManageAddresses((val) => !val);
    }

    function addAddress(address: string, newRoles: any[]) {
        const newAddresses = [...addresses];

        /* Primary wallet if none added yet */
        const primary = newAddresses.length === 0;

        newAddresses.push({
            address,
            primary,
        });

        setAddresses([...new Set(newAddresses)]);
        setManageAddresses(true);
        setRoles(newRoles);
    }

    function removeAddress(removedAddress: string, newRoles: any[]) {
        const newAddresses = [];

        for (const existingAddress of addresses) {
            if (existingAddress.address !== removedAddress) {
                newAddresses.push(existingAddress);
            }
        }

        setAddresses(newAddresses);
        setRoles(newRoles);
    }

    useEffect(() => {
        if (!accessToken || !tokenType) {
            return;
        }

        const grabDetails = async () => {
            setDiscordError(null);

            try {
                const data = await fetchDiscordUserInfo(tokenType, accessToken);

                if (data) {
                    const {
                        user,
                        addresses,
                        roles,
                    } = data;

                    setUser(user);
                    setRoles(roles);
                    setAddresses(addresses);
                } else {
                    setUser(false);
                }
            } catch (err) {
                if (err) {
                    console.log(`Got error: ${(err as any).toString()}`);
                    setDiscordError((err as any).toString());
                }

                setUser(false);
                console.log(err);
            }
        };

        grabDetails();
    }, [
        accessToken,
        tokenType,
    ]);

    if (!accessToken) {
        return <LinkDiscord/>;
    }

    if (user === null) {
        return <Loading/>;
    }

    if (user === false) {
        return (
            <DiscordError
                discordError={discordError}
            />
        );
    }

    if (addresses.length > 0 && manageAddresses) {
        return (
            <ManageAddresses
                addresses={addresses}
                roles={roles}
                toggleManageAddresses={toggleManageAddresses}
                removeAddress={removeAddress}
                accessToken={accessToken}
            />
        );
    }

    if (!connected) {
        return (
            <ConnectWallet
                user={user}
                goBack={toggleManageAddresses}
                addresses={addresses}
            />
        );
    }

    return (
        <PerformVerify
            primaryAddress={primaryAddress}
            user={user}
            accessToken={accessToken}
            restartProcess={restartProcess}
            addAddress={addAddress}
            goBack={toggleManageAddresses}
            addresses={addresses}
        />
    );
}
