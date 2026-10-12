import React, { useState, useEffect } from "react";
import { PageId } from "../types";
import { Outlet, useNavigate, useRouterState } from "@tanstack/react-router";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { QuoteModal } from "../components/QuoteModal";
import { WhatsAppFloatingButton } from "../components/WhatsAppIcon";
import { SEOHead } from "../components/SEOHead";
import { installWebsiteMotion } from "../lib/website-motion";

export const WebsiteLayout: React.FC = () => {
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const rawPage = pathname === "/" ? "home" : (pathname.slice(1) as PageId);
  const currentPage: PageId = rawPage === ("industries" as PageId) ? "applications" : rawPage;
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [preselectedService, setPreselectedService] = useState<string | undefined>(undefined);
  const [scrollProgress, setScrollProgress] = useState(0);

  const handleOpenQuote = (service?: string) => {
    setPreselectedService(service);
    setIsQuoteOpen(true);
  };

  useEffect(() => {
    const open = () => setIsQuoteOpen(true);
    window.addEventListener("advay:open-quote", open);
    return () => window.removeEventListener("advay:open-quote", open);
  }, []);

  // Window scroll progress bar calculation
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress(Math.min(100, Math.max(0, (window.scrollY / totalScroll) * 100)));
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Enhance visible content instead of hiding it until a timed registration succeeds.
  useEffect(() => {
    const main = document.querySelector("main");
    if (!(main instanceof HTMLElement)) return;
    return installWebsiteMotion(main);
  }, [currentPage, pathname]);

  const handleNavigate = (page: PageId) => {
    navigate({ to: page === "home" ? "/" : `/${page}` });
    window.scrollTo(0, 0);
  };

  return (
    <div
      suppressHydrationWarning
      className="min-h-screen bg-[#FAF8F5] text-[#0B2545] flex flex-col font-sans selection:bg-[#8B1E1E] selection:text-white relative"
    >
      {/* Top Dynamic Scroll Progress Indicator Bar */}
      <div
        suppressHydrationWarning
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#8B1E1E] via-[#0B2545] to-[#8B1E1E] z-[9999] origin-left pointer-events-none transition-transform duration-75 shadow-sm"
        style={{ transform: `scaleX(${scrollProgress / 100})` }}
      />
      {/* Dynamic SEO Meta Tags & Schema.org JSON-LD */}
      <SEOHead page={currentPage} />

      {/* Main Navigation Header */}
      <Header
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenQuote={() => handleOpenQuote()}
      />

      {/* Active View / Main Content */}
      <main key={currentPage} className="flex-1 page-transition">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} onOpenQuote={() => handleOpenQuote()} />

      {/* Global RFQ / Quote Modal */}
      <QuoteModal
        isOpen={isQuoteOpen}
        onClose={() => setIsQuoteOpen(false)}
        preselectedService={preselectedService}
      />

      {/* Floating Official WhatsApp Direct Action */}
      <WhatsAppFloatingButton />
    </div>
  );
};

export default WebsiteLayout;
