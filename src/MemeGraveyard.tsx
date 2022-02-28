import * as React from 'react';
import LazyLoad from 'react-lazyload';

import { BurntSlug } from './Types';
import { SizeOptions, LoadingImage } from './LoadingImage';

import Tombstone from './img/meme-graveyard/tombstone.gif';
import Graveyard from './img/meme-graveyard/graveyard.gif';
import Fire from './img/meme-graveyard/fire.gif';
import FireBG from './img/meme-graveyard/fire-bg.gif';
import Skeleton from './img/meme-graveyard/skeleton.gif';

const InTheEnd = require('./audio/InTheEnd.mp3');

export interface GraveyardProps {
    burntSlugs: BurntSlug[];

    burnCount: number;
}

export function MemeGraveyard(props: GraveyardProps) {
    const {
        burntSlugs,
        burnCount,
    } = props;

    const [isPlaying, setIsPlaying] = React.useState(false);

    const data = React.useMemo(() => {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-12 mt-14 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
                {burntSlugs.map((slug) => (
                    <LazyLoad>
                        <div className="flex flex-col items-center justify-center relative">
                            <LoadingImage
                                src={slug.image}
                                alt={`Sol Slug ${slug.name}`}
                                size={SizeOptions.Small}
                            />

                            <span className="absolute top-0 text-yellow-300 font-['Times_New_Roman']">
                                {`Formerly rank ${slug.rank}`}
                            </span>
                        </div>
                    </LazyLoad>
                ))}
            </div>
        );
    }, [burntSlugs]);
    
    const play = React.useCallback(() => {
        if (isPlaying) {
            return;
        }

        const audio = document.getElementById('audio');

        if (!audio) {
            return;
        }

        const a = audio as HTMLAudioElement;

        a.volume = 0.5;
        a.play();

        setIsPlaying(true);
    }, [isPlaying]);

    const playOnce = React.useCallback(() => {
        play();

        document.removeEventListener('click', playOnce);
        document.removeEventListener('scroll', playOnce);
    }, [play]);

    React.useEffect(() => {
        document.addEventListener('click', playOnce, { once: true });
        document.addEventListener('scroll', playOnce, { once: true });
    /* eslint-disable react-hooks/exhaustive-deps */
    }, []);
    /* eslint-enable react-hooks/exhaustive-deps */

    function stop() {
        if (!isPlaying) {
            return;
        }

        const audio = document.getElementById('audio');

        if (!audio) {
            return;
        }

        const a = audio as HTMLAudioElement;

        a.pause();

        setIsPlaying(false);
    }

    return (
        <div className="flex flex-col items-center justify-center mt-8 bg-repeat" style={{ backgroundImage: `url(${FireBG})` }}>
            <div className="flex flex-row items-center justify-center gap-x-8">
                <div className="flex flex-row items-center justify-center flex-wrap gap-y-4">
                    <img
                        src={Tombstone}
                        alt='Tombstone'
                    />

                    <img
                        src={Fire}
                        alt='Fire'
                    />
                </div>

                <div className="flex flex-row flex-wrap items-center justify-center">
                    <span className="text-4xl text-blue-500 font-['Times_New_Roman']">
                        Welcome to the
                    </span>

                    <img
                        src={Graveyard}
                        alt='Graveyard'
                    />
                </div>

                <div className="flex flex-row items-center justify-center flex-wrap gap-y-4">
                    <img
                        src={Fire}
                        alt='Fire'
                    />

                    <img
                        src={Tombstone}
                        alt='Tombstone'
                    />
                </div>
            </div>

            <span
                className="font-['Comic_Sans_MS'] text-4xl animate-rainbow bg-clip-text text-transparent"
                style={{
                    backgroundImage: 'linear-gradient(to right, red,orange,yellow,green,blue,indigo,violet)',
                }}
            >
                {`${burnCount} slugs have been burnt`}
            </span>

            <button
                onClick={isPlaying ? stop : play}
                className="text-3xl font-['Times_New_Roman'] bg-green-900 mt-6 px-4"
            >
                {isPlaying ? 'Stop Music' : 'Play Music'}
            </button>

            <audio
                style={{
                    display: 'hidden',
                }}
                src={InTheEnd}
                id='audio'
                loop
            />

            <img
                src={Skeleton}
                alt='Skeleton'
                className='fixed bottom-0 left-24 z-10 h-80 overflow-hidden'
            />

            <img
                src={Skeleton}
                alt='Skeleton'
                className='fixed bottom-0 right-24 z-10 h-80 overflow-hidden'
            />

            {data}
        </div>
    );
}
