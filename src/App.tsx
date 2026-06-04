
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import News from "./pages/News";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import Permits from "./pages/services/Permits";
import Vaccination from "./pages/services/Vaccination";
import Monitoring from "./pages/services/Monitoring";
import Promotion from "./pages/services/Promotion";
import Press from "./pages/public-info/Press";
import Jobs from "./pages/public-info/Jobs";
import Organigrama from "./pages/public-info/Organigrama";
import DepartmentDetail from "./pages/public-info/DepartmentDetail";
import NotFound from "./pages/NotFound";
import { LanguageProvider } from "./i18n/LanguageContext";
import { AssistantProvider } from "./context/AssistantContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <AssistantProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
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
      </BrowserRouter>
      </TooltipProvider>
      </AssistantProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
