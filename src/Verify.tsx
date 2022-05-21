import { useEffect, useState, useMemo } from "react";
import { Switch } from '@headlessui/react';
import { encode } from "@stablelib/base64";
import * as Qs from 'querystring';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { Transaction, SystemProgram } from '@solana/web3.js';

interface DiscordUser {
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

interface PerformVerifyProps {
    user: DiscordUser;
    accessToken: string;
    restartProcess: () => void;
    addAddress: (addr: string, roleData: any[]) => void;
    goBack: () => void;
    addresses: string[];
}

interface ManageAddressesProps {
    accessToken: string;
    addresses: string[];
    roles: any[];
    toggleManageAddresses: () => void;
    removeAddress: (addr: string, roleData: any[]) => void;
}

interface ConnectWalletProps {
    addresses: string[];
    goBack: () => void;
    user: DiscordUser;
}

const redirectURL = process.env.REACT_APP_REDIRECT_URL;
const verifyURL = process.env.REACT_APP_VERIFY_URL;

const discordArgs = {
    client_id: '903156913724874832',
    redirect_uri: redirectURL,
    response_type: 'token',
    scope: 'identify',
    state: 'verify',
};

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
        `${verifyURL}/user`,
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

function DiscordError(props: { discordError: string | null }) {
    const {
        discordError,
    } = props;

    return (
        <div className="flex flex-col items-center justify-center gap-y-5 text-center">
            <p>
                {`Failed to fetch info from Discord or verify backend! You may need to disable your ad blocker/privacy badger/umatrix extensions. ${discordError ? `Error: ${discordError}` : ''}`}
            </p>
        </div>
    );
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

function LinkDiscord() {
    return (
        <div className="flex flex-col items-center justify-center gap-y-5">
            <span className="w-3/5 text-center">
                Let's get verified! This will verify you are a slug holder and unlock certain channels and roles in the Discord server.
            </span>

            <span className="w-3/5 text-center">
                You can also link more wallets if you have already verified your address.
            </span>

            <span>
                Start by linking your Discord account.
            </span>

            <button
                className="background-transparent border-slugGreen border-2 uppercase text-4xl p-4 rounded h-16 align-middle flex items-center justify-center"
                onClick={() => {
                    window.location.href = `https://discord.com/api/oauth2/authorize?${Qs.stringify(discordArgs)}`;
                }}
            >
                Link Discord
            </button>
        </div>
    );
}

function PerformVerify(props: PerformVerifyProps) {
    const {
        user,
        accessToken,
        restartProcess,
        addAddress,
        goBack,
        addresses,
    } = props;

    const {
        connected,
        publicKey,
        signTransaction,
        signMessage,
        disconnect,
    } = useWallet();

    const {
        connection,
    } = useConnection();

    const [verified, setVerified] = useState<boolean | null>(null);
    const [verifyInProgress, setVerifyInProgress] = useState(false);
    const [haveLedger, setHaveLedger] = useState<boolean>(false);

    function handleToggleHaveLedger() {
        setHaveLedger((val) => !val);
    }

    async function sendVerifyRequest(address: string, verifyRequest: any) {
        setVerifyInProgress(true);

        try {
            const res = await fetch(
                `${verifyURL}/verify`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type":
                            "application/json",
                    },
                    body: JSON.stringify(
                        verifyRequest
                    ),
                }
            );

            setVerifyInProgress(false);

            if (res.status === 200) {
                const roleData = await res.json();
                setVerified(true);
                addAddress(address, roleData);
            } else {
                setVerified(false);
            }
        } catch (err) {
            console.log((err as any).toString());
            setVerified(false);
            setVerifyInProgress(false);
        }
    }

    async function handleSend0SolTransaction() {
        if (!user || !publicKey || !signTransaction) {
            return;
        }

        const transaction = new Transaction().add(
            SystemProgram.transfer({
                fromPubkey: publicKey,
                toPubkey: publicKey,
                lamports: 0,
            })
        );

        transaction.feePayer = publicKey;
        transaction.recentBlockhash = (await connection.getRecentBlockhash('finalized')).blockhash;

        const signedTransaction = await signTransaction(transaction);

        const address = publicKey.toString();

        sendVerifyRequest(address, {
            address,
            transaction: encode(signedTransaction.serialize()),
            discordToken: accessToken,
        });
    }

    async function handleSignVerifyMessage() {
        if (!user || !publicKey) {
            return;
        }

        const address = publicKey.toString();

        const toSign = new TextEncoder().encode(
            `I am signing this to link my discord identity ${
                user!.username.replace(/\s/g, '')
            }#${user!.discriminator} with id ${
                user!.id
            } to my solana wallet ${address}`
        );

        const sig = await signMessage!(
            toSign,
        );

        sendVerifyRequest(address, {
            address,
            toSign: encode(toSign),
            signature: encode(sig),
            discordToken: accessToken,
        });
    }

    const txVerify = useMemo(() => {
        return haveLedger || !signMessage;
    }, [
        haveLedger,
        signMessage,
    ]);

    return (
        <div className="flex flex-col items-center justify-center gap-y-5">
            {connected && publicKey && (
                <>
                    {verified === null && (
                        <>
                            <p className="text-center">
                                {`Linking ${publicKey.toString()} to ${user.username}#${user.discriminator}`}
                            </p>

                            <span className="text-center">
                                {verifyInProgress
                                    ? 'Please wait, verifying your holder status and applying roles...'
                                    : `Sign a ${txVerify ? 'transaction' : 'message'} to verify your address and get your roles.`
                                }
                            </span>

                            <div className="flex items-center justify-center gap-x-4">
                                <span>
                                    Using Ledger?
                                </span>

                                <Switch
                                    checked={haveLedger}
                                    onChange={handleToggleHaveLedger}
                                    className={`${
                                        haveLedger ? 'bg-slugGreen' : 'bg-gray-200'
                                    } relative inline-flex items-center h-6 rounded-full w-11`}
                                >
                                    <span
                                        className={`${
                                            haveLedger ? 'translate-x-6' : 'translate-x-1'
                                        } inline-block w-4 h-4 transform bg-black rounded-full`}
                                    />
                                </Switch>
                            </div>

                            <button
                                className="background-transparent border-slugGreen border-2 uppercase text-2xl p-4 rounded h-12 align-middle flex items-center justify-center"
                                disabled={verifyInProgress}
                                onClick={txVerify ? handleSend0SolTransaction : handleSignVerifyMessage}
                            >
                                {txVerify ? `Sign Transaction To Verify` : `Sign Message to Verify`}
                            </button>

                            <button
                                className="background-transparent border-slugGreen border-2 uppercase text-2xl p-4 rounded h-12 align-middle flex items-center justify-center"
                                disabled={verifyInProgress}
                                onClick={disconnect}
                            >
                                Disconnect Wallet
                            </button>

                            {addresses.length > 0 && (
                                <button
                                    className="background-transparent border-slugGreen border-2 uppercase text-2xl p-4 rounded h-12 align-middle flex items-center justify-center"
                                    onClick={goBack}
                                >
                                    Go Back
                                </button>
                            )}
                        </>
                    )}

                    {verified === false && (
                        <>
                            <p>
                                Something's wrong!
                            </p>

                            <p className="text-center">
                                We weren't able to verify that wallet signature.
                            </p>

                            <span>
                                You may need to reload the page if you just swapped wallet accounts.
                            </span>

                            <button
                                className="background-transparent border-slugGreen border-2 uppercase w-52 text-4xl p-4 rounded h-16 align-middle flex items-center justify-center"
                                onClick={restartProcess}
                            >
                                Try again
                            </button>
                        </>
                    )}
                </>
            )}
        </div>
    );
}

function ConnectWallet(props: ConnectWalletProps) {
    const {
        user,
        addresses,
        goBack,
    } = props;

    return (
        <div className="flex flex-col items-center justify-center gap-y-5">
            <p>
                {user!.username}#{user!.discriminator}, your Discord has been linked!
            </p>

            <span className="text-center">
                Connect your wallet via the header above to continue the verification process.
            </span>

            {addresses.length > 0 && (
                <button
                    className="background-transparent border-slugGreen border-2 uppercase text-2xl p-4 rounded h-12 align-middle flex items-center justify-center"
                    onClick={goBack}
                >
                    Go Back
                </button>
            )}

        </div>
    );
}

function ManageAddresses(props: ManageAddressesProps) {
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
                `${verifyURL}/unlink`,
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
            <div className="flex flex-row items-center justify-center gap-x-5">
                <span className="text-center">
                    {`You have linked ${addresses.length} address${addresses.length > 1 ? 'es' : ''}. You can return to Discord, or link another wallet.`}
                </span>

                <button
                    className="background-transparent border-slugGreen border-2 uppercase text-2xl p-4 rounded h-12 align-middle flex items-center justify-center shrink-0"
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
                            <span className="inline mx-3" style={{ color: r.color }} key={r.name}>
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

            {addresses.map((addr) => (
                <div className="flex flex-row items-center justify-center gap-x-5" key={addr}>
                    <span>
                        {addr}
                    </span>

                    <button
                        className="background-transparent border-slugGreen border-2 uppercase text-2xl p-4 rounded h-12 align-middle flex items-center justify-center"
                        onClick={() => handleUnlink(addr)}
                        disabled={performingUnlink}
                    >
                        {addr === unlinkAddr ? 'Unlinking...' : 'Unlink'}
                    </button>
                </div>
            ))}
        </div>
    );
}

export function Verifier() {
    const [user, setUser] = useState<DiscordUser | null | false>(null);
    const [discordError, setDiscordError] = useState<string | null>(null);
    const [addresses, setAddresses] = useState<string[]>([]);
    const [roles, setRoles] = useState<any[]>([]);
    const [manageAddresses, setManageAddresses] = useState<boolean>(true);

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
        newAddresses.push(address);

        setAddresses([...new Set(newAddresses)]);
        setManageAddresses(true);
        setRoles(newRoles);
    }

    function removeAddress(address: string, newRoles: any[]) {
        const newAddresses = new Set(addresses);
        newAddresses.delete(address);

        setAddresses([...newAddresses]);
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
            user={user}
            accessToken={accessToken}
            restartProcess={restartProcess}
            addAddress={addAddress}
            goBack={toggleManageAddresses}
            addresses={addresses}
        />
    );
}
