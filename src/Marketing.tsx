export function Marketing() {
    return (
        <div className="flex flex-col items-center justify-center gap-y-5">
            <span className="w-3/5 text-center">
                Below is a marketing pack that includes our branding standards and various art assets. Use it to promote slugs on Twitter, or create new content to share!
            </span>

            <button
                className={`bg-primary disabled:bg-disabled rounded text-background px-2 h-9 sm:h-11 uppercase font-header text-xs`}
                onClick={() => {
                    window.location.href = 'https://github.com/SolSlugs/assets/blob/main/SlugMarketingPack.zip?raw=true';
                }}
            >
                Download
            </button>

            <span className="w-3/5 text-center">
                If you simply want access to the Twitter gifs with the black background, you can obtain the most current version here:
            </span>

            <button
                className={`bg-primary disabled:bg-disabled rounded text-background px-2 h-9 sm:h-11 uppercase font-header text-xs`}
                onClick={() => {
                    window.location.href = 'https://github.com/SolSlugs/assets/blob/main/TwitterGifs.zip?raw=true';
                }}
            >
                Download
            </button>

        </div>
    );
}
