export function DiscordError(props: { discordError: string | null }) {
    const {
        discordError,
    } = props;

    return (
        <div className="flex flex-col items-center justify-center gap-y-5 text-center">
            <p className='text-center'>
                {`Failed to fetch info from Discord or verify backend! You may need to disable your ad blocker/privacy badger/umatrix extensions. ${discordError ? `Error: ${discordError}` : ''}`}
            </p>
        </div>
    );
}
