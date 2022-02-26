import { Roadmap } from './Roadmap';

export function Home() {
    return (
        <div className="flex flex-col">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 items-start justify-start">
                <div className="flex flex-col items-start justify-center gap-y-2">
                    <span className="text-slugGreen text-4xl uppercase">
                        SolSlugs Roadmap to Bluechip
                    </span>

                    <span className="text-2xl">
                        Our plan to take over Solana with degeneracy and community as a priority. Much of what we do for our project is influenced by our amazing community.
                    </span>

                    <span className="text-2xl mt-6">
                        Sol Slugs wouldn't be the same without Slug Gang.
                    </span>
                </div>

                <Roadmap
                />
            </div>
        </div>
    );
}
