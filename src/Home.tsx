import { FAQ } from './FAQ';
import { Team } from './Team';
import { FoundingMessage } from './FoundingMessage';

/* eslint-disable jsx-a11y/anchor-is-valid */
export function Home() {
    return (
        <div className="flex flex-col gap-y-32">
            <Team />
            <FAQ />
            <FoundingMessage />
            <div className="flex items-center justify-center">
                <a className="text-2xl" href='#'>
                    Scroll to Top
                </a>
            </div>
        </div>
    );
}
