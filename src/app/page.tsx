import { Hero } from '@/components/home/Hero';
import { WhatIsRayu } from '@/components/home/WhatIsRayu';
import { LatestThoughts } from '@/components/home/LatestThoughts';
import { ExploreTopics } from '@/components/home/ExploreTopics';
import { AboutSection } from '@/components/home/AboutSection';
import { NewsletterSection } from '@/components/home/NewsletterSection';

export default function Home() {
  return (
    <>
      <Hero />
      <WhatIsRayu />
      <LatestThoughts />
      <ExploreTopics />
      <AboutSection />
      <NewsletterSection />
    </>
  );
}
