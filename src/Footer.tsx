import CC4 from './img/cc4.png';

export function Footer() {
    return (
        <div className="flex flex-row items-center justify-center gap-x-3 mt-60">
            <span className="text-sm text-center">
                Sol Slugs is licensed under a Creative Commons Attribution-ShareAlike 4.0 International License.
            </span>

            <a
                href={'https://creativecommons.org/licenses/by-sa/4.0/'}
            >
                <img
                    alt='CC4 Logo'
                    src={CC4}
                    className='h-6 mt-1'
                />
            </a>
        </div>
    );
}
