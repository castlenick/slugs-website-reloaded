import { useEffect, useState } from "react";
import { encode } from "@stablelib/base64";
import * as Qs from 'querystring';
import { useWallet } from '@solana/wallet-adapter-react';

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

const backendApiURL = `https://letsalllovelain.com/verify/`;

const discordArgs = {
    client_id: '903156913724874832',
    redirect_uri: 'https://solslugs.com/',
    response_type: 'token',
    scope: 'identify',
    state: 'verify',
};

export function Verifier() {
    const [user, setUser] = useState<DiscordUser | null | false>(null);
    const [discordError, setDiscordError] = useState<string | null>(null);

    const [verifyInProgress, setVerifyInProgress] = useState(false);

    const {
        connected,
        publicKey,
        signMessage,
    } = useWallet();

    const [ , query ] = window.location.hash.split('?');

    const fragment = new URLSearchParams(query);

    const [accessToken, tokenType] = [
        fragment.get("access_token"),
        fragment.get("token_type"),
    ];

    const [verified, setVerified] = useState<boolean | null>(null);

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
                <p>
                    Let's Get Verified!
                </p>

                <p>
                    Start by linking your Discord account.
                </p>

                <button
                    className="background-transparent border-slugGreen border-2 uppercase w-52 text-4xl p-4 rounded h-16 align-middle flex items-center justify-center"
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
        if (connected && !signMessage) {
            return (
                <div className="flex flex-col items-center justify-center gap-y-5">
                    <p>
                        Uh oh, it looks like your wallet doesn't support signing messages... Please try again with Phantom or Solflare.
                    </p>
                </div>
            );
        }

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
                                    {verifyInProgress ? 'Please wait, verifying your holder status and applying roles...' : 'Finally, sign a message to verify your NFT.'}
                                </p>

                                <button
                                    className="background-transparent border-slugGreen border-2 uppercase w-96 text-4xl p-4 rounded h-16 align-middle flex items-center justify-center"
                                    disabled={verifyInProgress}
                                    onClick={async () => {
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

                                        const verifyRequest = {
                                            address,
                                            toSign: encode(toSign),
                                            signature: encode(sig),
                                            discordToken: accessToken,
                                        };

                                        try {
                                            const res = await fetch(
                                                backendApiURL,
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
                                                setVerified(true);
                                            } else {
                                                setVerified(false);
                                            }
                                        } catch (err) {
                                            console.log((err as any).toString());
                                            setVerified(false);
                                            setVerifyInProgress(false);
                                        }
                                    }}
                                >
                                    Sign Message to Verify
                                </button>
                            </>
                        )}

                        {verified === true && (
                            <>
                                <p>
                                    Success!
                                </p>

                                <p>
                                    You have been verified. You can return to
                                    Discord.
                                </p>
                            </>
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
                {`Failed to fetch info from discord! ${discordError ? `Error: ${discordError}` : ''}`}
            </p>
        </div>
    );
}
