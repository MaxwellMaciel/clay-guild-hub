
import React, { useState, useEffect } from "react";
import { Noticia } from "@/entities/Noticia";
import { Calendar, Search, Star, AlertCircle, Info, X, ChevronRight, FileText, ArrowRight, Clock, User, Tag, ArrowUp, BookOpen } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const NOTICIAS_POR_PAGINA = 5; // Exibir 5 notícias inicialmente + 1 destaque

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  show: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    }
  }
};

export default function News() {
  const [noticiasTodas, setNoticiasTodas] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [busca, setBusca] = useState("");
  const [filtroDestaque, setFiltroDestaque] = useState(false);
  const [noticiaExpandida, setNoticiaExpandida] = useState<any>(null);
  const [noticiasVisiveis, setNoticiasVisiveis] = useState(NOTICIAS_POR_PAGINA);

  useEffect(() => {
    async function carregarNoticias() {
      try {
        const dados = await Noticia.list("-data"); // Ordena por data mais recente
        setNoticiasTodas(dados);
      } catch (error) {
        console.error("Erro ao carregar notícias:", error);
      } finally {
        setLoading(false);
      }
    }
    
    carregarNoticias();
  }, []);

  const noticiasFiltradas = noticiasTodas.filter(noticia => {
    const matchBusca = busca === "" || 
      noticia.titulo.toLowerCase().includes(busca.toLowerCase()) ||
      (noticia.conteudo && noticia.conteudo.toLowerCase().includes(busca.toLowerCase()));
    
    const matchDestaque = !filtroDestaque || noticia.destaque;
    
    return matchBusca && matchDestaque;
  });

  const noticiaDestaquePrincipal = noticiasFiltradas.find(n => n.destaque && n.imagem) || noticiasFiltradas.find(n => n.imagem) || noticiasFiltradas[0];
  
  const outrasNoticias = noticiasFiltradas.filter(n => n.id !== (noticiaDestaquePrincipal?.id || 0));

  const carregarMaisNoticias = () => {
    setNoticiasVisiveis(prev => prev + NOTICIAS_POR_PAGINA);
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Hero Section */}
      <motion.div 
        className="clay-card p-8 md:p-12 bg-gradient-to-br from-[var(--accent-bg)] to-[var(--page-bg-end)] text-center mb-12 relative overflow-hidden"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Círculos decorativos */}
        <div className="absolute -top-20 -left-20 w-72 h-72 bg-[var(--primary-color)] opacity-10 dark:opacity-20 rounded-full filter blur-2xl"></div>
        <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-[var(--secondary-color)] opacity-10 dark:opacity-20 rounded-full filter blur-2xl"></div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="relative z-10"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: 'var(--text-headings)' }}>
            Notícias e Avisos
          </h1>
          <p className="text-lg text-[var(--text-default)] max-w-3xl mx-auto">
            Acompanhe as últimas novidades, eventos e comunicados do Grêmio Estudantil
            e fique por dentro de tudo que acontece em nossa escola.
          </p>
        </motion.div>
      </motion.div>
      
      {/* Filtros e Busca */}
      <motion.div 
        className="flex flex-col md:flex-row gap-4 mb-10 items-center sticky top-[calc(var(--header-height,80px)+1rem)] z-30 clay-card p-4 md:p-6"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <div className="relative flex-grow w-full md:w-auto">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-[var(--text-muted)]" />
          </div>
          <input
            type="text"
            placeholder="Buscar notícias..."
            className="clay-input w-full py-2.5 pl-10 pr-4 focus:outline-none text-[var(--text-default)]"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />
        </div>
        
        <button
          className={`clay-button px-4 py-2.5 flex items-center gap-2 w-full md:w-auto justify-center ${
            filtroDestaque ? "clay-pressed text-[var(--primary-color)]" : "text-[var(--text-muted)]"
          }`}
          onClick={() => setFiltroDestaque(!filtroDestaque)}
        >
          <Star size={18} className={filtroDestaque ? "text-[var(--primary-color)] fill-[var(--primary-color)]" : ""} />
          Apenas Destaques
        </button>
      </motion.div>
      
      {/* Conteúdo das Notícias */}
      {loading ? (
        <LoadingSkeleton />
      ) : noticiasFiltradas.length === 0 ? (
        <motion.div 
          className="clay-card p-8 text-center text-[var(--text-muted)]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Info size={48} className="mx-auto mb-4 text-[var(--text-muted)]" />
          <p>
            {busca 
              ? `Nenhuma notícia encontrada para "${busca}".` 
              : filtroDestaque 
                ? "Não há notícias em destaque no momento."
                : "Nenhuma notícia publicada ainda."}
          </p>
        </motion.div>
      ) : (
        <div className="space-y-12">
          {/* Notícia de Destaque Principal (se houver) */}
          {noticiaDestaquePrincipal && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <NoticiaCardDestaque 
                noticia={noticiaDestaquePrincipal} 
                onExpand={() => setNoticiaExpandida(noticiaDestaquePrincipal)} 
              />
            </motion.div>
          )}

          {/* Outras Notícias em Grid */}
          {outrasNoticias.length > 0 && (
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={containerVariants}
              initial="hidden"
              animate="show"
            >
              <AnimatePresence>
                {outrasNoticias.slice(0, noticiasVisiveis).map((noticia) => (
                  <motion.div
                    key={noticia.id}
                    variants={itemVariants}
                  >
                    <NoticiaCard 
                      noticia={noticia} 
                      onExpand={() => setNoticiaExpandida(noticia)} 
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}

          {/* Botão Carregar Mais */}
          {outrasNoticias.length > noticiasVisiveis && (
            <motion.div 
              className="text-center mt-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <button
                className="clay-button px-6 py-3 font-semibold flex items-center gap-2 mx-auto"
                style={{ backgroundColor: 'var(--primary-color)', color: 'var(--text-on-primary-bg)' }}
                onClick={carregarMaisNoticias}
              >
                Carregar Mais Notícias
                <ChevronRight size={18} />
              </button>
            </motion.div>
          )}
        </div>
      )}
      
      {/* Modal de notícia expandida */}
      <AnimatePresence>
        {noticiaExpandida && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-70 z-[100] flex items-center justify-center p-4" 
            onClick={() => setNoticiaExpandida(null)}
          >
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="clay-card bg-[var(--clay-bg)] max-w-3xl w-full max-h-[90vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 z-10 bg-[var(--clay-bg)]/80 backdrop-blur-sm p-5 border-b border-[var(--accent-color)]/30 flex justify-between items-center rounded-t-2xl">
                <h2 className="text-xl md:text-2xl font-bold text-[var(--text-headings)] flex items-center gap-2">
                  {noticiaExpandida.destaque && (
                    <Star size={20} className="text-[var(--primary-color)] fill-[var(--primary-color)]/50" />
                  )}
                  {noticiaExpandida.titulo}
                </h2>
                <button 
                  className="clay-button p-2 text-[var(--text-muted)] hover:text-[var(--primary-color)]" 
                  onClick={() => setNoticiaExpandida(null)}
                >
                  <X size={20} />
                </button>
              </div>
              <div className="p-6 overflow-y-auto">
                <p className="text-sm text-[var(--text-muted)] mb-4 flex items-center">
                  <Calendar size={14} className="mr-1.5 text-[var(--primary-color)]" />
                  {new Date(noticiaExpandida.data).toLocaleDateString('pt-BR', { year: 'numeric', month: 'long', day: 'numeric' })}
                  {noticiaExpandida.autor && (
                    <span className="ml-3 pl-3 border-l border-[var(--accent-color)]/30">
                      Por: <span className="font-medium text-[var(--text-default)]">{noticiaExpandida.autor}</span>
                    </span>
                  )}
                </p>
                
                {noticiaExpandida.imagem && (
                  <div className="mb-6 aspect-video rounded-xl overflow-hidden clay-card shadow-inner">
                    <img 
                      src={noticiaExpandida.imagem} 
                      alt={noticiaExpandida.titulo} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                
                <div className="prose max-w-none text-[var(--text-default)] leading-relaxed">
                  {noticiaExpandida.conteudo.split('\n').map((paragraph: string, i: number) => (
                    paragraph.trim() !== "" && <p key={i} className="mb-4">{paragraph}</p>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Card para Notícia de Destaque Principal
function NoticiaCardDestaque({ noticia, onExpand }: { noticia: any, onExpand: () => void }) {
  return (
    <div 
      className="clay-card bg-[var(--clay-bg)] hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer group"
      onClick={onExpand}
    >
      <div className="md:flex">
        {noticia.imagem && (
          <div className="md:w-1/2 xl:w-3/5">
            <div className="aspect-video md:aspect-auto md:h-full overflow-hidden">
              <img 
                src={noticia.imagem} 
                alt={noticia.titulo} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        )}
        <div className={`p-6 md:p-8 flex flex-col justify-center ${noticia.imagem ? 'md:w-1/2 xl:w-2/5' : 'w-full'}`}>
          {noticia.destaque && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold mb-3 w-fit" 
                  style={{ backgroundColor: 'var(--accent-bg)', color: 'var(--primary-color)' }}>
              <Star size={14} className="fill-[var(--primary-color)]/50" /> Destaque
            </span>
          )}
          <h2 className="text-2xl lg:text-3xl font-bold text-[var(--text-headings)] mb-3 group-hover:text-[var(--primary-color)] transition-colors">
            {noticia.titulo}
          </h2>
          <p className="text-sm text-[var(--text-muted)] mb-4 flex items-center">
            <Calendar size={14} className="mr-1.5 text-[var(--primary-color)]" />
            {new Date(noticia.data).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}
          </p>
          <p className="text-[var(--text-default)] line-clamp-4 mb-6 leading-relaxed">
            {noticia.conteudo}
          </p>
          <button className="clay-button text-[var(--primary-color)] font-medium py-2 px-4 rounded-lg w-fit group-hover:bg-[var(--accent-bg)] transition-colors flex items-center gap-2">
            Ler mais
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

// Card para Notícias Menores
function NoticiaCard({ noticia, onExpand }: { noticia: any, onExpand: () => void }) {
  return (
    <div 
      className="clay-card bg-[var(--clay-bg)] h-full flex flex-col overflow-hidden cursor-pointer group hover:shadow-lg transition-all duration-300"
      onClick={onExpand}
    >
      {noticia.imagem ? (
        <div className="aspect-video overflow-hidden">
          <img 
            src={noticia.imagem} 
            alt={noticia.titulo} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      ) : (
        <div className="aspect-video bg-gradient-to-br from-[var(--accent-bg)] to-[var(--page-bg-end)] flex items-center justify-center">
          <FileText size={48} className="text-[var(--primary-color)] opacity-30" />
        </div>
      )}
      <div className="p-5 flex flex-col flex-grow">
        {noticia.destaque && (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold mb-2 w-fit"
                style={{ backgroundColor: 'var(--accent-bg)', color: 'var(--primary-color)' }}>
            <Star size={12} className="fill-[var(--primary-color)]/50" /> Destaque
          </span>
        )}
        <h3 className="text-lg font-bold text-[var(--text-headings)] mb-2 group-hover:text-[var(--primary-color)] transition-colors">
          {noticia.titulo}
        </h3>
        <p className="text-xs text-[var(--text-muted)] mb-3 flex items-center">
          <Calendar size={12} className="mr-1 text-[var(--primary-color)]" />
          {new Date(noticia.data).toLocaleDateString('pt-BR')}
        </p>
        <p className="text-sm text-[var(--text-default)] line-clamp-3 flex-grow mb-4">
          {noticia.conteudo}
        </p>
        <button className="text-sm text-[var(--primary-color)] font-medium mt-auto self-start flex items-center gap-1 group-hover:underline">
          Ler mais
          <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="space-y-12">
      {/* Skeleton para Destaque Principal */}
      <div className="clay-card bg-[var(--clay-bg)] p-6 animate-pulse">
        <div className="md:flex">
          <div className="md:w-1/2 xl:w-3/5 aspect-video md:aspect-auto bg-[var(--accent-bg)] rounded-lg"></div>
          <div className="md:w-1/2 xl:w-2/5 p-6 md:p-8 space-y-4">
            <div className="h-5 bg-[var(--accent-bg)] rounded w-1/4"></div>
            <div className="h-8 bg-[var(--accent-bg)] rounded w-3/4"></div>
            <div className="h-4 bg-[var(--accent-bg)] rounded w-1/3"></div>
            <div className="h-4 bg-[var(--accent-bg)] rounded"></div>
            <div className="h-4 bg-[var(--accent-bg)] rounded"></div>
            <div className="h-10 bg-[var(--accent-bg)] rounded w-1/3"></div>
          </div>
        </div>
      </div>
      {/* Skeleton para Grid de Notícias */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Array(3).fill(0).map((_, i) => (
          <div key={i} className="clay-card bg-[var(--clay-bg)] p-5 animate-pulse space-y-4">
            <div className="aspect-video bg-[var(--accent-bg)] rounded-lg"></div>
            <div className="h-5 bg-[var(--accent-bg)] rounded w-3/4"></div>
            <div className="h-3 bg-[var(--accent-bg)] rounded w-1/2"></div>
            <div className="h-3 bg-[var(--accent-bg)] rounded"></div>
            <div className="h-3 bg-[var(--accent-bg)] rounded"></div>
            <div className="h-4 bg-[var(--accent-bg)] rounded w-1/4 mt-2"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
