export function Marketing() {
    return (
        <div className="flex flex-col items-center justify-center gap-y-5">
            <span className="w-3/5 text-center">
                Below is a marketing pack that includes our branding standards and various art assets. Use it to promote slugs on Twitter, or create new content to share!
            </span>

            <button
                className="background-transparent border-slugGreen border-2 uppercase text-4xl p-4 rounded h-16 align-middle flex items-center justify-center"
                onClick={() => {
                    window.location.href = 'https://github.com/SolSlugs/assets/blob/main/SlugMarketingPack.zip?raw=true';
                }}
            >
                Download
            </button>
        </div>
    );
}
