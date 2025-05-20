
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import News from "./pages/News";
import Projects from "./pages/Projects";
import Team from "./pages/Team";
import Contact from "./pages/Contact";
import AdminNews from "./pages/admin/News";
import AdminProjects from "./pages/admin/Projects";
import AdminLogin from "./pages/admin/Login";
import NotFound from "./pages/NotFound";
import "./App.css";
import { Toaster } from "sonner";
import { useEffect, useState } from "react";
import { AuthProvider } from "./contexts/AuthContext";
import AuthGuard from "./components/AuthGuard";

// Layout wrapper component to determine current page
function LayoutWrapper({ children }) {
  const location = useLocation();
  const [currentPageName, setCurrentPageName] = useState("");
  
  useEffect(() => {
    const pathname = location.pathname;
    if (pathname === "/") setCurrentPageName("home");
    else if (pathname === "/noticias") setCurrentPageName("news");
    else if (pathname === "/projetos") setCurrentPageName("projects");
    else if (pathname === "/equipe") setCurrentPageName("team");
    else if (pathname === "/contato") setCurrentPageName("contact");
    else if (pathname.startsWith("/admin")) setCurrentPageName("admin");
    else setCurrentPageName("");
  }, [location]);

  return <Layout currentPageName={currentPageName}>{children}</Layout>;
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <LayoutWrapper>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/noticias" element={<News />} />
            <Route path="/projetos" element={<Projects />} />
            <Route path="/equipe" element={<Team />} />
            <Route path="/contato" element={<Contact />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/noticias" element={
              <AuthGuard>
                <AdminNews />
              </AuthGuard>
            } />
            <Route path="/admin/projetos" element={
              <AuthGuard>
                <AdminProjects />
              </AuthGuard>
            } />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </LayoutWrapper>
        <Toaster />
      </Router>
    </AuthProvider>
  );
}

export default App;
