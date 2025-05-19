
import React, { useState, useEffect } from "react";
import { Projeto } from "@/entities/Projeto";
import { Calendar, Clock, User, Tag, ArrowDown, ArrowUp, CheckCircle2, CircleDashed, CircleEllipsis, Users, Lightbulb, Filter, ChevronDown, Search, ExternalLink, X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";

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


const STATUS_INFO: Record<string, { label: string, Icon: any, colorClass: string, borderColor: string }> = {
  planejado: { label: "Planejado", Icon: Lightbulb, colorClass: "bg-yellow-100 text-yellow-700 dark:bg-yellow-500/20 dark:text-yellow-300", borderColor: "border-yellow-300 dark:border-yellow-500" },
  em_andamento: { label: "Em Andamento", Icon: CircleEllipsis, colorClass: "bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-300", borderColor: "border-blue-300 dark:border-blue-500" },
  concluido: { label: "Concluído", Icon: CheckCircle2, colorClass: "bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-300", borderColor: "border-green-300 dark:border-green-500" },
  todos: { label: "Todos", Icon: Tag, colorClass: "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-200", borderColor: "border-gray-300 dark:border-gray-600"}
};

export default function Projects() {
  const [projetos, setProjetos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filtroStatus, setFiltroStatus] = useState("todos");
  const [ordem, setOrdem] = useState("recentes");
  const [busca, setBusca] = useState("");
  const [projetoExpandido, setProjetoExpandido] = useState<string | null>(null);

  useEffect(() => {
    async function carregarProjetos() {
      try {
        const dados = await Projeto.list(); // Carrega todos inicialmente
        setProjetos(dados);
      } catch (error) {
        console.error("Erro ao carregar projetos:", error);
      } finally {
        setLoading(false);
      }
    }
    
    carregarProjetos();
  }, []);

  const projetosFiltrados = projetos.filter(projeto => {
    const matchStatus = filtroStatus === "todos" || projeto.status === filtroStatus;
    const matchBusca = busca === "" || 
      projeto.titulo.toLowerCase().includes(busca.toLowerCase()) ||
      (projeto.descricao && projeto.descricao.toLowerCase().includes(busca.toLowerCase()));
    return matchStatus && matchBusca;
  });

  const projetosOrdenados = [...projetosFiltrados].sort((a, b) => {
    const dateA = new Date(a.data_inicio || a.created_date || "");
    const dateB = new Date(b.data_inicio || b.created_date || "");
    if (ordem === "recentes") {
      return dateB.getTime() - dateA.getTime();
    } else if (ordem === "antigos") {
      return dateA.getTime() - dateB.getTime();
    }
    return 0;
  });

  // Função auxiliar para renderizar o ícone de status
  const renderStatusIcon = (status: string, size = 14) => {
    const statusInfo = STATUS_INFO[status];
    if (!statusInfo) return null;
    
    const IconComponent = statusInfo.Icon;
    return <IconComponent size={size} />;
  };

  return (
    <>
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <motion.div 
          className="clay-card p-8 md:p-12 bg-gradient-to-br from-[var(--accent-bg)] to-[var(--page-bg-end)] text-center mb-12 relative overflow-hidden"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="absolute -top-10 -left-10 w-60 h-60 bg-[var(--primary-color)] opacity-10 rounded-full filter blur-2xl"></div>
          <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-[var(--secondary-color)] opacity-10 rounded-full filter blur-2xl"></div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="relative z-10"
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: 'var(--text-headings)' }}>
              Nossas Iniciativas em Ação
            </h1>
            <p className="text-lg text-[var(--text-default)] max-w-3xl mx-auto mb-8">
              Explore os projetos que estamos desenvolvendo para tornar nossa escola um lugar
              ainda melhor. Cada iniciativa é um passo para um futuro mais engajado e colaborativo.
            </p>
            <Link
              to={createPageUrl("Contato")}
              className="clay-button px-6 py-3 text-lg font-semibold flex items-center gap-2 mx-auto w-fit"
              style={{ backgroundColor: 'var(--primary-color)', color: 'var(--text-on-primary-bg)' }}
            >
              Sugira um Projeto <Lightbulb size={20} />
            </Link>
          </motion.div>
        </motion.div>
        
        {/* Filtros e Ordenação */}
        <motion.div 
          className="sticky top-[calc(var(--header-height,80px)+1rem)] z-30 clay-card bg-[var(--clay-bg)] p-4 md:p-6 mb-10 shadow-lg"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
            <div className="relative md:col-span-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-[var(--text-muted)]" />
              </div>
              <input
                type="text"
                placeholder="Buscar projetos..."
                className="clay-input w-full py-2.5 pl-10 pr-4 focus:outline-none text-[var(--text-default)]"
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
              />
            </div>
            
            <div className="flex flex-wrap justify-center gap-2 md:col-span-2">
              {Object.entries(STATUS_INFO).map(([statusKey, { label, Icon }]) => (
                <StatusButton 
                  key={statusKey}
                  status={statusKey} 
                  atual={filtroStatus} 
                  onClick={() => setFiltroStatus(statusKey)} 
                  icon={<Icon size={16} />}
                  label={label}
                />
              ))}
              <button
                className={`clay-button px-3 py-2 text-sm flex items-center gap-1.5 ${
                  ordem === "recentes" ? "clay-pressed text-[var(--primary-color)]" : "text-[var(--text-muted)]"
                }`}
                onClick={() => setOrdem("recentes")}
              >
                <ArrowDown size={14} /> Recentes
              </button>
              <button
                className={`clay-button px-3 py-2 text-sm flex items-center gap-1.5 ${
                  ordem === "antigos" ? "clay-pressed text-[var(--primary-color)]" : "text-[var(--text-muted)]"
                }`}
                onClick={() => setOrdem("antigos")}
              >
                <ArrowUp size={14} /> Antigos
              </button>
            </div>
          </div>
        </motion.div>
        
        {/* Lista de Projetos */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {Array(4).fill(0).map((_, i) => <ProjetoCardSkeleton key={i} />)}
          </div>
        ) : projetosOrdenados.length === 0 ? (
          <div className="clay-card p-8 text-center text-[var(--text-muted)]">
            <Lightbulb size={48} className="mx-auto mb-4 text-[var(--primary-color)] opacity-50" />
            <p className="text-lg">
              {busca 
                ? `Nenhum projeto encontrado para "${busca}".` 
                : filtroStatus !== "todos" 
                  ? `Não há projetos ${STATUS_INFO[filtroStatus]?.label.toLowerCase()}.`
                  : "Nenhum projeto cadastrado ainda."}
            </p>
            <p className="mt-2">Que tal <Link to={createPageUrl("Contato")} className="font-semibold text-[var(--primary-color)] hover:underline">sugerir uma nova ideia</Link>?</p>
          </div>
        ) : (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            {projetosOrdenados.map((projeto) => (
              <motion.div key={projeto.id} variants={itemVariants}>
                <ProjetoCard projeto={projeto} onExpand={() => setProjetoExpandido(projeto.id)} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>

      <AnimatePresence>
        {projetoExpandido && (
           <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-70 z-[100] flex items-center justify-center p-4" 
            onClick={() => setProjetoExpandido(null)}
          >
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="clay-card bg-[var(--clay-bg)] max-w-3xl w-full max-h-[90vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-[var(--accent-color)]/30 flex justify-between items-start">
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-[var(--text-headings)] mb-1">
                    {projetos.find(p => p.id === projetoExpandido)?.titulo}
                  </h2>
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${STATUS_INFO[projetos.find(p => p.id === projetoExpandido)?.status || ""]?.colorClass}`}>
                    {renderStatusIcon(projetos.find(p => p.id === projetoExpandido)?.status || "")}
                    {STATUS_INFO[projetos.find(p => p.id === projetoExpandido)?.status || ""]?.label}
                  </span>
                </div>
                <button 
                  className="clay-button p-2 text-[var(--text-muted)] hover:text-[var(--primary-color)]" 
                  onClick={() => setProjetoExpandido(null)}
                >
                  <X size={20} />
                </button>
              </div>
              <div className="p-6 overflow-y-auto space-y-6">
                 {projetos.find(p => p.id === projetoExpandido)?.imagem && (
                  <div className="aspect-video rounded-xl overflow-hidden clay-card shadow-inner">
                    <img 
                      src={projetos.find(p => p.id === projetoExpandido)?.imagem} 
                      alt={projetos.find(p => p.id === projetoExpandido)?.titulo} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div>
                  <h3 className="text-lg font-semibold text-[var(--text-headings)] mb-2">Descrição Completa</h3>
                  <p className="text-[var(--text-default)] leading-relaxed whitespace-pre-line">
                    {projetos.find(p => p.id === projetoExpandido)?.descricao}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  {projetos.find(p => p.id === projetoExpandido)?.data_inicio && (
                    <div className="flex items-center gap-2 p-3 rounded-lg bg-[var(--accent-bg)]/50">
                      <Calendar size={18} className="text-[var(--primary-color)]" />
                      <div>
                        <span className="font-medium text-[var(--text-muted)]">Início:</span>
                        <p className="text-[var(--text-default)]">{new Date(projetos.find(p => p.id === projetoExpandido)?.data_inicio).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}</p>
                      </div>
                    </div>
                  )}
                   {projetos.find(p => p.id === projetoExpandido)?.data_conclusao && (
                    <div className="flex items-center gap-2 p-3 rounded-lg bg-[var(--accent-bg)]/50">
                      <Clock size={18} className="text-[var(--primary-color)]" />
                       <div>
                        <span className="font-medium text-[var(--text-muted)]">Conclusão:</span>
                        <p className="text-[var(--text-default)]">{new Date(projetos.find(p => p.id === projetoExpandido)?.data_conclusao).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}</p>
                      </div>
                    </div>
                  )}
                </div>
                
                {projetos.find(p => p.id === projetoExpandido)?.responsaveis && projetos.find(p => p.id === projetoExpandido)?.responsaveis.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-[var(--text-headings)] mb-2">Equipe Responsável</h3>
                    <div className="flex flex-wrap gap-2">
                      {projetos.find(p => p.id === projetoExpandido)?.responsaveis.map((resp: string, idx: number) => (
                        <span key={idx} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium bg-[var(--accent-bg)]/80 text-[var(--text-default)]">
                          <User size={14} className="text-[var(--primary-color)]" />
                          {resp}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

interface StatusButtonProps {
  status: string;
  atual: string;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}

function StatusButton({ status, atual, onClick, icon, label }: StatusButtonProps) {
  const isActive = status === atual;
  const { colorClass, borderColor } = STATUS_INFO[status] || {};
  
  return (
    <button
      className={`clay-button px-3 py-2 text-sm flex items-center gap-1.5 font-medium transition-all duration-200
                  ${isActive ? `clay-pressed border-2 ${borderColor} ${colorClass}` : 'text-[var(--text-muted)] hover:text-[var(--primary-color)]'}`}
      onClick={onClick}
    >
      {icon}
      {label}
    </button>
  );
}

interface ProjetoCardProps {
  projeto: any;
  onExpand: (id: string) => void;
}

function ProjetoCard({ projeto, onExpand }: ProjetoCardProps) {
  const { label, Icon, colorClass } = STATUS_INFO[projeto.status] || {};

  let accentColor = '';
  if (projeto.status === 'planejado') accentColor = 'var(--yellow-500)';
  else if (projeto.status === 'em_andamento') accentColor = 'var(--blue-500)';
  else if (projeto.status === 'concluido') accentColor = 'var(--green-500)';

  return (
    <div 
      className="clay-card bg-[var(--clay-bg)] h-full flex flex-col overflow-hidden group cursor-pointer hover:shadow-lg"
      onClick={() => onExpand(projeto.id)}
      style={{ "--card-accent-color": accentColor } as React.CSSProperties}
    >
      {projeto.imagem ? (
        <div className="aspect-video overflow-hidden relative">
          <img 
            src={projeto.imagem} 
            alt={projeto.titulo} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
      ) : (
        <div className="aspect-video flex items-center justify-center bg-gradient-to-br from-[var(--accent-bg)] to-[var(--page-bg-end)]">
          <Lightbulb size={48} className="text-[var(--primary-color)] opacity-30" />
        </div>
      )}
      <div className="p-5 md:p-6 flex flex-col flex-grow">
        <div className="mb-3 flex justify-between items-center">
          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${colorClass}`}>
            <Icon size={14} />
            {label}
          </span>
        </div>
        
        <h2 className="text-xl font-bold text-[var(--text-headings)] mb-2 group-hover:text-[var(--primary-color)] transition-colors duration-200">
          {projeto.titulo}
        </h2>
        <p className="text-sm text-[var(--text-default)] line-clamp-3 flex-grow mb-4 leading-relaxed">
          {projeto.descricao}
        </p>
        
        <div className="mt-auto pt-4 border-t border-[var(--accent-color)]/20">
          <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-[var(--text-muted)] mb-4">
            {projeto.data_inicio && (
              <div className="flex items-center gap-1">
                <Calendar size={14} className="text-[var(--primary-color)]" />
                <span>Início: {new Date(projeto.data_inicio).toLocaleDateString('pt-BR')}</span>
              </div>
            )}
            {projeto.responsaveis && projeto.responsaveis.length > 0 && (
              <div className="flex items-center gap-1">
                <Users size={14} className="text-[var(--primary-color)]" />
                <span>{projeto.responsaveis.length} Responsáve{projeto.responsaveis.length > 1 ? 'is' : 'l'}</span>
              </div>
            )}
          </div>
           <button className="text-sm font-semibold flex items-center gap-1 text-[var(--primary-color)] group-hover:underline">
            Ver Detalhes <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}

function ProjetoCardSkeleton() {
  return (
    <div className="clay-card p-6 animate-pulse">
      <div className="aspect-video bg-[var(--accent-bg)] rounded-lg mb-4"></div>
      <div className="h-4 bg-[var(--accent-bg)] rounded w-1/4 mb-3"></div>
      <div className="h-6 bg-[var(--accent-bg)] rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-[var(--accent-bg)] rounded mb-1"></div>
      <div className="h-4 bg-[var(--accent-bg)] rounded mb-1"></div>
      <div className="h-4 bg-[var(--accent-bg)] rounded w-5/6 mb-4"></div>
      <div className="h-4 bg-[var(--accent-bg)] rounded w-1/3"></div>
    </div>
  );
}
