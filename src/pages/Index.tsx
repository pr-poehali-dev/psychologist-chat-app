import { useState } from "react";
import HeroSection from "@/components/HeroSection";
import BookingSection from "@/components/BookingSection";
import PricingSection from "@/components/PricingSection";
import DashboardSection from "@/components/DashboardSection";
import NavBar from "@/components/NavBar";

type Section = "home" | "booking" | "pricing" | "dashboard";

const Index = () => {
  const [activeSection, setActiveSection] = useState<Section>("home");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = (section: Section) => {
    setActiveSection(section);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-mesh font-sans">
      <NavBar
        activeSection={activeSection}
        onNavigate={navigate}
        isLoggedIn={isLoggedIn}
        onLogin={() => { setIsLoggedIn(true); navigate("dashboard"); }}
        onLogout={() => { setIsLoggedIn(false); navigate("home"); }}
      />

      {activeSection === "home" && (
        <HeroSection
          onBook={() => navigate("booking")}
          onPricing={() => navigate("pricing")}
        />
      )}

      {activeSection === "booking" && (
        <BookingSection onBack={() => navigate("home")} />
      )}

      {activeSection === "pricing" && (
        <PricingSection
          onBook={() => navigate("booking")}
          onBack={() => navigate("home")}
        />
      )}

      {activeSection === "dashboard" && (
        <DashboardSection onBook={() => navigate("booking")} />
      )}
    </div>
  );
};

export default Index;
