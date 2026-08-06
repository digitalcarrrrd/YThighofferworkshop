import TopBar from './components/TopBar';
import HeroSection from './components/HeroSection';
import PainSection from './components/PainSection';
import SolutionSection from './components/SolutionSection';
import CreatorShowcase from './components/CreatorShowcase';
import IncomeCalculator from './components/IncomeCalculator';
import TestimonialsSection from './components/TestimonialsSection';
import WorkshopAgenda from './components/WorkshopAgenda';
import ComparisonSection from './components/ComparisonSection';
import GuaranteeSection from './components/GuaranteeSection';
import RegistrationSection from './components/RegistrationSection';
import FAQSection from './components/FAQSection';
import FinalUrgency from './components/FinalUrgency';
import Footer from './components/Footer';
import SocialProofTicker from './components/SocialProofTicker';
import FloatingCTA from './components/FloatingCTA';

export default function App() {
  return (
    <div className="min-h-screen bg-dark-bg text-gray-200 font-sans">
      <TopBar />
      <HeroSection />
      <PainSection />
      <SolutionSection />
      <CreatorShowcase />
      <IncomeCalculator />
      <TestimonialsSection />
      <WorkshopAgenda />
      <ComparisonSection />
      <GuaranteeSection />
      <RegistrationSection />
      <FAQSection />
      <FinalUrgency />
      <Footer />
      
      {/* Floating elements */}
      <SocialProofTicker />
      <FloatingCTA />
      
      {/* Bottom padding for mobile floating CTA */}
      <div className="h-20 sm:h-0" />
    </div>
  );
}
