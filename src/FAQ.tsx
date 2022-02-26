export function FAQ() {
    return (
        <div className="flex flex-col items-center justify-center">
            <span className="text-5xl uppercase align-center">
                Frequently Asked Questions!
            </span>

            <div className="flex flex-row gap-y-8 gap-x-10 mt-8 flex-wrap items-start justify-center xl:gap-x-16">
                <div className="flex flex-col gap-y-8 gap-x-8 basis-full grow lg:basis-2/5 xl:grow-0">
                    <div className="flex flex-col gap-y-2">
                        <span className="text-3xl text-slugGreen">
                            When did Sol Slugs launch, and what was the mint price?
                        </span>

                        <span className="text-2xl">
                            We were a free mint that launched on October 23rd at 10pm UTC.
                        </span>
                    </div>

                    <div className="flex flex-col gap-y-2">
                        <span className="text-3xl text-slugGreen">
                            What are dev royalties on this project?
                        </span>

                        <span className="text-2xl">
                            5%
                        </span>
                    </div>

                    <div className="flex flex-col gap-y-2">
                        <span className="text-3xl text-slugGreen">
                            Why were you a free mint?
                        </span>

                        <span className="text-[1.35rem]">
                            We believed too many projects capitalize off of the euphoria of this space to get a big bag up front. Once this happens, the incentive to deliver isnt as strong, and as weve seen, many many projects in this space stop putting as much effort in post-mint.
                        </span>

                        <span className="text-[1.35rem] mt-5">
                            We wanted a new norm - one where projects prove their value first.
                        </span>
                    </div>
                </div>

                <div className="flex flex-col gap-y-8 gap-x-8 basis-full grow lg:basis-2/5 xl:grow-0">
                    <div className="flex flex-col gap-y-2">
                        <span className="text-3xl text-slugGreen">
                            How do you plan on making money from a free mint?
                        </span>

                        <span className="text-[1.35rem]">
                            The devs took 10% of the gen 1 supply in addition to the 5% royalty. We were not given a large sum up front, but there is much you can accomplish without needing significant funds in this space.
                        </span>

                        <span className="text-[1.35rem] mt-5">
                            We are hedging our bets that Sol Slugs will turn out to be a successful long term project with longevity.
                        </span>
                    </div>

                    <div className="flex flex-col gap-y-2">
                        <span className="text-3xl text-slugGreen">
                            What is burning? And what are the rewards for burning?
                        </span>

                        <span className="text-[1.35rem]">
                            Burning is when the burn instruction is ran on an NFT, irreversibly removing it from the supply. By burning slug nfts, you gain special roles which come with benefits and privileges.
                        </span>

                        <span className="text-[1.35rem] mt-5">
                            From Burning, you receive:
                        </span>

                        <span className="text-[1.35rem] -mt-2">
                            - A special role + color
                        </span>

                        <span className="text-[1.35rem] -mt-3">
                            - Access to giveaways
                        </span>

                        <span className="text-[1.35rem] -mt-3">
                            - Access to our alpha channel and candy machine finder
                        </span>

                        <span className="text-[1.35rem] -mt-3">
                            - Future slug mints
                        </span>

                        <span className="text-[1.35rem] mt-5">
                            All of this, and you help contribute to the deflationary mechanism.
                        </span>

                        <span className="text-[1.35rem] mt-5">
                            There are 4 ranks for burning: At 1, 5, 10 and 25 slugs burned.
                        </span>

                        <span className="text-[1.35rem] mt-5 text-scorcher">
                            1 - Slug Scorcher
                        </span>

                        <span className="text-[1.35rem] -mt-3 text-pyro">
                            5 - Slug Pyro
                        </span>

                        <span className="text-[1.35rem] -mt-3 text-incinerator">
                            10 - Slug Incinerator
                        </span>

                        <span className="text-[1.35rem] -mt-3 text-acolyte">
                            25 - Slug Reaper Acolyte
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
