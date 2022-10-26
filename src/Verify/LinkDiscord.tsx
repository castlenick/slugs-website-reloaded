const discordArgs = {
    client_id: '903156913724874832',
    redirect_uri: process.env.REACT_APP_REDIRECT_URL!,
    response_type: 'token',
    scope: 'identify',
    state: 'verify',
};

export function LinkDiscord() {
    const args = new URLSearchParams(discordArgs).toString();

    return (
        <div className="flex flex-col items-center justify-center gap-y-5">
            <span className="sm:w-3/5 text-center">
                Let's get verified! This will verify you are a slug burner/holder and unlock certain channels and roles in the Discord server.
            </span>

            <span className="sm:w-3/5 text-center">
                You can also link more wallets if you have already verified your address.
            </span>

            <span className='text-center'>
                Start by linking your Discord account.
            </span>

            <button
                className={`bg-primary disabled:bg-disabled rounded text-background px-2 h-9 sm:h-11 uppercase font-header text-xs`}
                onClick={() => {
                    window.location.href = `https://discord.com/api/oauth2/authorize?${args}`;
                }}
            >
                Link Discord
            </button>
        </div>
    );
}
