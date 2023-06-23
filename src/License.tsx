import CC4 from './img/cc4.png';

export interface LicenseProps {
}

export function License(props: LicenseProps) {
    return (
        <div className="flex flex-col items-center justify-center gap-y-3">
            <span className="text-2xl text-center">
                Sol Slugs is licensed under a Creative Commons Attribution-ShareAlike 4.0 International License.
            </span>

            <span className="text-2xl text-center">
                {`For more information, visit the `}
                <a
                    href={'https://creativecommons.org/licenses/by-sa/4.0/'}
                    className='underline'
                >
                    Creative Commons website
                </a>
            </span>

            <a
                href={'https://creativecommons.org/licenses/by-sa/4.0/'}
            >
                <img
                    alt='CC4 Logo'
                    src={CC4}
                    className='h-16 mt-4'
                />
            </a>
        </div>
    );
}
