import { useEffect, useState } from "react";
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

const test = true;

const backendApiURL = `https://letsalllovelain.com/verify/`;
const testBackendApiURL = `http://localhost:5353/`;
const apiURL = test ? testBackendApiURL : backendApiURL;

const mainRedirectURL = `https://solslugs.com/`;
const testRedirectURL = `http://localhost:3000/`;
const redirectURL = test ? testRedirectURL : mainRedirectURL;

const discordArgs = {
    client_id: '903156913724874832',
    redirect_uri: redirectURL,
    response_type: 'token',
    scope: 'identify',
    state: 'verify',
};

export function Verifier() {
    const [user, setUser] = useState<DiscordUser | null | false>(null);
    const [discordError, setDiscordError] = useState<string | null>(null);
    const [rolesApplied, setRolesApplied] = useState<any[] | null>(null);
    const [haveLedger, setHaveLedger] = useState<boolean>(false);

    const [verifyInProgress, setVerifyInProgress] = useState(false);

    const {
        connected,
        publicKey,
        signMessage,
        signTransaction,
    } = useWallet();

    const {
        connection,
    } = useConnection();

    const [ , query ] = window.location.hash.split('?');

    const fragment = new URLSearchParams(query);

    const [accessToken, tokenType] = [
        fragment.get("access_token"),
        fragment.get("token_type"),
    ];

    const [verified, setVerified] = useState<boolean | null>(null);

    function handleToggleHaveLedger() {
        setHaveLedger((val) => !val);
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

        setVerifyInProgress(true);
        setRolesApplied(null);

        const verifyRequest = {
            address,
            transaction: encode(signedTransaction.serialize()),
            discordToken: accessToken,
        };

        try {
            const res = await fetch(
                apiURL,
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
                setRolesApplied(roleData);
            } else {
                setVerified(false);
            }
        } catch (err) {
            console.log((err as any).toString());
            setVerified(false);
            setVerifyInProgress(false);
        }
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

        setVerifyInProgress(true);
        setRolesApplied(null);

        const verifyRequest = {
            address,
            toSign: encode(toSign),
            signature: encode(sig),
            discordToken: accessToken,
        };

        try {
            const res = await fetch(
                apiURL,
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
                setRolesApplied(roleData);
            } else {
                setVerified(false);
            }
        } catch (err) {
            console.log((err as any).toString());
            setVerified(false);
            setVerifyInProgress(false);
        }

    }

    useEffect(() => {
        if (!accessToken || !tokenType) {
            return;
        }

        const grabDetails = async () => {
            setDiscordError(null);

            try {
                const res = await fetch("https://discord.com/api/users/@me", {
                    headers: {
                        authorization: `${tokenType} ${accessToken}`,
                    },
                });

                if (res.status === 200) {
                    setUser(await res.json());
                } else {
                    setUser(false);
                }
            } catch (err) {
                setUser(false);
                setDiscordError((err as any).toString());
                console.log(err);
            }
        };

        grabDetails();
    }, [accessToken, tokenType]);

    if (!accessToken) {
        return (
            <div className="flex flex-col items-center justify-center gap-y-5">
                <span className="w-3/5 text-center">
                    Let's get verified! This will verify you are a slug holder and unlock certain channels and roles in the Discord server.
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

    if (user) {
        return (
            <div className="flex flex-col items-center justify-center gap-y-5">
                {!connected && (
                    <>
                        <p>
                            {user!.username}#{user!.discriminator}, your Discord has been linked!
                        </p>

                        <p>
                            Connect your wallet via the header above to continue the verification process.
                        </p>
                    </>
                )}

                {connected && publicKey && (
                    <>
                        {verified === null && (
                            <>
                                <p>
                                    Wallet Connected!
                                </p>

                                <p>
                                    {verifyInProgress ? 'Please wait, verifying your holder status and applying roles...' : 'Finally, sign a message to verify your address and get your roles.'}
                                </p>

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
                                    className="background-transparent border-slugGreen border-2 uppercase text-4xl p-4 rounded h-16 align-middle flex items-center justify-center"
                                    disabled={verifyInProgress}
                                    onClick={(haveLedger || !signMessage) ? handleSend0SolTransaction : handleSignVerifyMessage}
                                >
                                    {haveLedger ? `Sign Transaction To Verify` : `Sign Message to Verify`}
                                </button>
                            </>
                        )}

                        {rolesApplied && verified === true && (
                            <div className="flex flex-col items-center justify-center gap-y-5 w-3/5">
                                <span className="text-center">
                                    Success! You have been given the following roles:
                                </span>

                                <span className="text-center">
                                    {rolesApplied.map((r) => (
                                        <span className="inline mx-3 my-3" style={{ color: r.color }} key={r.name}>
                                            {r.name}
                                        </span>
                                    ))}
                                </span>

                                <p>
                                    You can return to Discord.
                                </p>
                            </div>
                        )}

                        {verified === false && (
                            <>
                                <p>
                                    Something's wrong!
                                </p>

                                <p className="text-center">
                                    That didn't work. Make sure you have a
                                    Solana Slug in your wallet and that you're
                                    linking the correct Discord account.
                                </p>

                                <button
                                    className="background-transparent border-slugGreen border-2 uppercase w-52 text-4xl p-4 rounded h-16 align-middle flex items-center justify-center"
                                    onClick={() => {
                                        window.location.href = `/#/verify`;
                                        setUser(null);
                                        setVerified(null);
                                    }}
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

    if (user === null) {
        return (
            <div className="flex flex-col items-center justify-center gap-y-5">
                <p>
                    Loading user info from discord...
                </p>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center gap-y-5">
            <p>
                {`Failed to fetch info from discord! You may need to disable your ad blocker/privacy badger/umatrix extensions. ${discordError ? `Error: ${discordError}` : ''}`}
            </p>
        </div>
    );
}
