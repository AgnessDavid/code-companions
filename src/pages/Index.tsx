import Header from "@/components/Header";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import BooksSection from "@/components/BooksSection";
import CommunitySection from "@/components/CommunitySection";
import CallToAction from "@/components/CallToAction";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <HowItWorks />
        <BooksSection />
        <CommunitySection />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
