import { useState, useMemo } from "react";
import { Switch } from '@headlessui/react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { Transaction, SystemProgram } from '@solana/web3.js';
import { encode } from "@stablelib/base64";

import { DiscordUser, VerifiedAddress } from '../Types';

interface PerformVerifyProps {
    user: DiscordUser;
    accessToken: string;
    restartProcess: () => void;
    addAddress: (addr: string, roleData: any[]) => void;
    goBack: () => void;
    addresses: VerifiedAddress[];
    primaryAddress?: string;
}

export function PerformVerify(props: PerformVerifyProps) {
    const {
        user,
        accessToken,
        restartProcess,
        addAddress,
        goBack,
        addresses,
        primaryAddress,
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
                `${process.env.REACT_APP_VERIFY_URL}/verify`,
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
            primary: address === primaryAddress,
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
            primary: address === primaryAddress,
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
                            <p className="text-center truncate w-full">
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
                                className={`bg-primary disabled:bg-disabled rounded text-background px-2 h-9 sm:h-11 uppercase font-header text-xs`}
                                disabled={verifyInProgress}
                                onClick={txVerify ? handleSend0SolTransaction : handleSignVerifyMessage}
                            >
                                {txVerify ? `Sign Transaction To Verify` : `Sign Message to Verify`}
                            </button>

                            <button
                                className={`bg-primary disabled:bg-disabled rounded text-background px-2 h-9 sm:h-11 uppercase font-header text-xs`}
                                disabled={verifyInProgress}
                                onClick={disconnect}
                            >
                                Disconnect Wallet
                            </button>

                            {addresses.length > 0 && (
                                <button
                                    className={`bg-primary disabled:bg-disabled rounded text-background px-2 h-9 sm:h-11 uppercase font-header text-xs`}
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

                            <span className='text-center'>
                                You may need to reload the page if you just swapped wallet accounts.
                            </span>

                            <button
                                className={`bg-primary disabled:bg-disabled rounded text-background px-2 h-9 sm:h-11 uppercase font-header text-xs`}
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
