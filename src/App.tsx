
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import News from "./pages/News";
import Projects from "./pages/Projects";
import Team from "./pages/Team";
import Contact from "./pages/Contact";
import AdminNews from "./pages/admin/News";
import AdminProjects from "./pages/admin/Projects";
import NotFound from "./pages/NotFound";
import "./App.css";
import { Toaster } from "sonner";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/noticias" element={<News />} />
          <Route path="/projetos" element={<Projects />} />
          <Route path="/equipe" element={<Team />} />
          <Route path="/contato" element={<Contact />} />
          <Route path="/admin/noticias" element={<AdminNews />} />
          <Route path="/admin/projetos" element={<AdminProjects />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
      <Toaster />
    </Router>
  );
}

export default App;
