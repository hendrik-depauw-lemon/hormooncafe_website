import { HeroSection } from './_components/HeroSection';
import { WhatIsSection } from './_components/WhatIsSection';

export default function Page() {
    return (
        <div className="flex flex-col gap-12">
            <HeroSection />
            <WhatIsSection />
        </div>
    );
}
