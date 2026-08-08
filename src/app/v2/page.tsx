import { HeroV2 } from '@/components/home/HeroV2';
import { WhatIsRayu } from '@/components/home/WhatIsRayu';
import { LatestThoughts } from '@/components/home/LatestThoughts';
import { ExploreTopics } from '@/components/home/ExploreTopics';
import { AboutSection } from '@/components/home/AboutSection';
import { NewsletterSection } from '@/components/home/NewsletterSection';

export default function HomeV2() {
  return (
    <>
      <HeroV2 />
      <WhatIsRayu />
      <LatestThoughts />
      <ExploreTopics />
      <AboutSection />
      <NewsletterSection />
    </>
  );
}
