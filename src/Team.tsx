import Buggles from './img/profile-pic-slugs/Buggles.png';
import Slorg from './img/profile-pic-slugs/Slorg.png';
import TS from './img/profile-pic-slugs/TS.png';
import Xaz from './img/profile-pic-slugs/Xaz.png';
import Wafflez from './img/profile-pic-slugs/Wafflez.png';
import Zpalm from './img/profile-pic-slugs/Zpalm.png';

import { SizeOptions, LoadingImage } from './LoadingImage';

export function Team() {
    return (
        <div className="flex flex-col items-center text-center">
            <span className="text-5xl text-slugGreen uppercase">
                Meet the Team!
            </span>

            <span className="text-2xl w-80 mt-1">
                Behind an NFT full of degeneracy, there's the team of degenerates.
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 items-center mt-8 gap-y-12 gap-x-8 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6">
                <div className="flex flex-col items-center justify-start gap-y-3 h-full">
                    <span className="text-4xl">
                        Buggles
                    </span>

                    <LoadingImage
                        src={Buggles}
                        alt='Buggles'
                        size={SizeOptions.Small}
                    />

                    <span className="text-3xl">
                        Tinker Dev
                    </span>

                    <span className="text-xl">
                        "You may live to see man-made horrors beyond your comprehension." - Nikola Tesla
                    </span>
                </div>

                <div className="flex flex-col items-center justify-start gap-y-3 h-full">
                    <span className="text-4xl">
                        Slorg
                    </span>

                    <LoadingImage
                        src={Slorg}
                        alt='Slorg'
                        size={SizeOptions.Small}
                    />

                    <span className="text-3xl">
                        Project Lead
                    </span>

                    <span className="text-xl">
                        Project Outreach
                    </span>

                    <span className="text-xl -mt-3">
                        Part time rug investigator
                    </span>
                </div>

                <div className="flex flex-col items-center justify-start gap-y-3 h-full">
                    <span className="text-4xl">
                        TS
                    </span>

                    <LoadingImage
                        src={TS}
                        alt='TS'
                        size={SizeOptions.Small}
                    />

                    <span className="text-3xl">
                        Social Media Rockstar
                    </span>

                    <span className="text-xl uppercase">
                        Rule #2
                    </span>

                    <span className="text-xl -mt-3">
                        NEVER pay for sluggussy
                    </span>
                </div>

                <div className="flex flex-col items-center justify-start gap-y-3 h-full">
                    <span className="text-4xl">
                        WaffleZ
                    </span>

                    <LoadingImage
                        src={Wafflez}
                        alt='WaffleZ'
                        size={SizeOptions.Small}
                    />

                    <span className="text-3xl">
                        Artist/Co-Creator
                    </span>

                    <span className="text-xl">
                        He's a dog mom! He's got eight nipples!
                    </span>
                </div>

                <div className="flex flex-col items-center justify-start gap-y-3 h-full">
                    <span className="text-4xl">
                        Xaz
                    </span>

                    <LoadingImage
                        src={Xaz}
                        alt='Xaz'
                        size={SizeOptions.Small}
                    />

                    <span className="text-3xl">
                        Co-Creator
                    </span>

                    <span className="text-xl">
                        Tragically slammed his dick in a car door.
                    </span>
                </div>

                <div className="flex flex-col items-center justify-start gap-y-3 h-full">
                    <span className="text-4xl">
                        zpalmtree
                    </span>

                    <LoadingImage
                        src={Zpalm}
                        alt='Zpalmtree'
                        size={SizeOptions.Small}
                    />

                    <span className="text-3xl uppercase">
                        The Dev
                    </span>

                    <span className="text-xl">
                        *groans*
                    </span>
                </div>
            </div>
        </div>
    );
}
