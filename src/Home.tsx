import { Roadmap } from './Roadmap';
import { FAQ } from './FAQ';
import { Team } from './Team';
import { FoundingMessage } from './FoundingMessage';

/* eslint-disable jsx-a11y/anchor-is-valid */
export function Home() {
    return (
        <div className="flex flex-col gap-y-32">
            <Roadmap
            />

            <FAQ
            />

            <Team
            />

            <FoundingMessage
            />

            <div className="flex items-center justify-center">
                <a className="text-2xl" href='#'>
                    Scroll to Top
                </a>
            </div>
        </div>
    );
}
