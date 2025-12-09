import Layout from './Layout';
import HeroSection from './HeroSection';
import ServicesSection from './ServicesSection';
import StatsSection from './StatsSection';
import CTASection from './CTASection';
import ScrollIndicator from './ScrollIndicator';

const HomePage = () => {
  return (
    <Layout>
      <HeroSection />
      <ServicesSection />
      <StatsSection />
      <CTASection />
      <ScrollIndicator />
    </Layout>
  );
};

export default HomePage;

