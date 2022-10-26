import { VerifiedAddress, DiscordUser } from '../Types';

export interface ConnectWalletProps {
    addresses: VerifiedAddress[];
    goBack: () => void;
    user: DiscordUser;
}

export function ConnectWallet(props: ConnectWalletProps) {
    const {
        user,
        addresses,
        goBack,
    } = props;

    return (
        <div className="flex flex-col items-center justify-center gap-y-5">
            <p className='text-center'>
                {user!.username}#{user!.discriminator}, your Discord has been linked!
            </p>

            <span className="text-center">
                Connect your wallet via the header above to continue the verification process.
            </span>

            {addresses.length > 0 && (
                <button
                    className={`bg-primary disabled:bg-disabled rounded text-background px-2 h-9 sm:h-11 uppercase font-header text-xs`}
                    onClick={goBack}
                >
                    Go Back
                </button>
            )}

        </div>
    );
}
