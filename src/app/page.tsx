import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import MarketTicker from '@/components/MarketTicker';
import FeaturesGrid from '@/components/FeaturesGrid';
import HowItWorks from '@/components/HowItWorks';
import AuthCard from '@/components/AuthCard';
import Footer from '@/components/Footer';
import AuthSection from '@/components/AuthSection';

export const metadata: Metadata = {
  title: 'AgriSense AI — Grow smarter, yield better',
  description: 'AI-driven crop advisory platform trusted by 12,000+ farmers. 94% prediction accuracy. 3.2x average profit increase. Start for free.',
  keywords: 'agtech, crop advisory, AI farming, yield prediction, soil intelligence, precision agriculture',
  openGraph: {
    title: 'AgriSense AI — Grow smarter, yield better',
    description: 'AI-driven crop advisory platform trusted by 12,000+ farmers.',
    type: 'website',
  },
};

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <MarketTicker />
        <FeaturesGrid />
        <HowItWorks />
        <AuthSection />
      </main>
      <Footer />
    </>
  );
}
