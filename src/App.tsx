
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

import Layout from "./components/Layout";
import Home from "./pages/Home";
import Team from "./pages/Team";
import Projects from "./pages/Projects";
import News from "./pages/News";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Wrapper component to handle current page name
const AppContent = () => {
  const location = useLocation();
  
  // Map path to page name
  const getPageName = () => {
    switch(location.pathname) {
      case "/":
        return "Home";
      case "/equipe":
        return "Membros";
      case "/projetos":
        return "Projetos";
      case "/noticias":
        return "Noticias";
      case "/contato":
        return "Contato";
      default:
        return "Home";
    }
  };

  return (
    <Layout currentPageName={getPageName()}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/equipe" element={<Team />} />
        <Route path="/projetos" element={<Projects />} />
        <Route path="/noticias" element={<News />} />
        <Route path="/contato" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
