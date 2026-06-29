
import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./i18n/LanguageContext";

import { AccessibilityProvider } from "./context/AccessibilityContext";
import AccessibilityWidget from "./components/AccessibilityWidget";

const Index = lazy(() => import("./pages/Index"));
const News = lazy(() => import("./pages/News"));
const Services = lazy(() => import("./pages/Services"));
const Contact = lazy(() => import("./pages/Contact"));
const Permits = lazy(() => import("./pages/services/Permits"));
const Vaccination = lazy(() => import("./pages/services/Vaccination"));
const Monitoring = lazy(() => import("./pages/services/Monitoring"));
const Promotion = lazy(() => import("./pages/services/Promotion"));
const Press = lazy(() => import("./pages/public-info/Press"));
const Jobs = lazy(() => import("./pages/public-info/Jobs"));
const Organigrama = lazy(() => import("./pages/public-info/Organigrama"));
const DepartmentDetail = lazy(() => import("./pages/public-info/DepartmentDetail"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <AccessibilityProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter basename="/dsp">
            <Suspense fallback={null}>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/news" element={<News />} />
                <Route path="/services" element={<Services />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/services/permits" element={<Permits />} />
                <Route path="/services/vaccination" element={<Vaccination />} />
                <Route path="/services/monitoring" element={<Monitoring />} />
                <Route path="/services/promotion" element={<Promotion />} />
                <Route path="/public-info/press" element={<Press />} />
                <Route path="/public-info/jobs" element={<Jobs />} />
                <Route path="/public-info/organigrama" element={<Organigrama />} />
                <Route path="/public-info/organigrama/:departmentId" element={<DepartmentDetail />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
            <AccessibilityWidget />
          </BrowserRouter>
        </TooltipProvider>
      </AccessibilityProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
