import { Roadmap } from './Roadmap';
import { FAQ } from './FAQ';
import { Team } from './Team';
import { FoundingMessage } from './FoundingMessage';

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
        </div>
    );
}
