import React, { useState, useEffect } from "react";
import { Membro } from "@/entities/Membro";
import { Filter, ChevronDown, Users, Mail, Phone, MapPin, ArrowRight, Star, Rocket, Award } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100
    }
  }
};

export default function Team() {
  const [membros, setMembros] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtroComissao, setFiltroComissao] = useState("todas");
  const [comissoes, setComissoes] = useState([]);
  const [menuComissao, setMenuComissao] = useState(false);
  const [membroSelecionado, setMembroSelecionado] = useState(null);

  useEffect(() => {
    async function carregarMembros() {
      try {
        const dados = await Membro.list();
        setMembros(dados);
        
        const comissoesUnicas = [...new Set(dados.map(m => m.comissao))].filter(Boolean);
        setComissoes(comissoesUnicas);
      } catch (error) {
        console.error("Erro ao carregar membros:", error);
      } finally {
        setLoading(false);
      }
    }
    
    carregarMembros();
  }, []);

  const membrosFiltrados = filtroComissao === "todas" 
    ? membros 
    : membros.filter(membro => membro.comissao === filtroComissao);

  const diretoria = membrosFiltrados.filter(membro => 
    ["presidente", "vice-presidente", "secretário", "tesoureiro"].includes(membro.cargo?.toLowerCase())
  );
  
  const outros = membrosFiltrados.filter(membro => 
    !["presidente", "vice-presidente", "secretário", "tesoureiro"].includes(membro.cargo?.toLowerCase())
  );

  return (
    <>
      <div className="max-w-7xl mx-auto mb-20">
        {/* Hero Section */}
        <motion.div 
          className="clay-card p-8 md:p-12 bg-gradient-to-br from-[var(--accent-bg)] to-[var(--page-bg-end)] text-center mb-12 relative overflow-hidden"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Círculos decorativos */}
          <div className="absolute -top-20 -left-20 w-72 h-72 bg-[var(--primary-color)] opacity-10 rounded-full filter blur-3xl"></div>
          <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-[var(--secondary-color)] opacity-10 rounded-full filter blur-3xl"></div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="relative z-10"
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: 'var(--text-headings)' }}>
              Nossa Equipe
            </h1>
            <p className="text-lg text-[var(--text-default)] max-w-3xl mx-auto">
              Conheça os estudantes que fazem parte do Grêmio Estudantil, trabalhando juntos
              para representar os interesses de todos os alunos e promover atividades que
              enriquecem nossa vida escolar.
            </p>
          </motion.div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <div className="clay-card p-6 flex items-center gap-4">
            <div className="p-4 rounded-2xl" style={{ background: 'var(--accent-bg)' }}>
              <Users className="w-8 h-8" style={{ color: 'var(--primary-color)' }} />
            </div>
            <div>
              <h3 className="text-2xl font-bold" style={{ color: 'var(--text-headings)' }}>
                {membros.length}
              </h3>
              <p className="text-[var(--text-muted)]">Membros Ativos</p>
            </div>
          </div>
          <div className="clay-card p-6 flex items-center gap-4">
            <div className="p-4 rounded-2xl" style={{ background: 'var(--accent-bg)' }}>
              <Star className="w-8 h-8" style={{ color: 'var(--primary-color)' }} />
            </div>
            <div>
              <h3 className="text-2xl font-bold" style={{ color: 'var(--text-headings)' }}>
                {comissoes.length}
              </h3>
              <p className="text-[var(--text-muted)]">Comissões</p>
            </div>
          </div>
          <div className="clay-card p-6 flex items-center gap-4">
            <div className="p-4 rounded-2xl" style={{ background: 'var(--accent-bg)' }}>
              <Rocket className="w-8 h-8" style={{ color: 'var(--primary-color)' }} />
            </div>
            <div>
              <h3 className="text-2xl font-bold" style={{ color: 'var(--text-headings)' }}>
                {diretoria.length}
              </h3>
              <p className="text-[var(--text-muted)]">Diretoria</p>
            </div>
          </div>
        </motion.div>
        
        {/* Filtro por comissão */}
        {comissoes.length > 0 && (
          <motion.div 
            className="mb-12 flex justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <div className="relative">
              <button
                className={`clay-button px-6 py-3 flex items-center gap-2 text-[var(--text-default)] text-lg`}
                onClick={() => setMenuComissao(!menuComissao)}
              >
                <Filter size={20} className="text-[var(--primary-color)]" />
                <span>
                  {filtroComissao === "todas" 
                    ? "Todas as comissões" 
                    : `Comissão: ${filtroComissao}`}
                </span>
                <ChevronDown 
                  size={20} 
                  className={`transform transition-transform ${menuComissao ? "rotate-180" : ""}`}
                />
              </button>
              
              <AnimatePresence>
                {menuComissao && (
                  <motion.div 
                    className="absolute top-full left-0 z-10 w-full mt-2 clay-card bg-[var(--clay-bg)] divide-y divide-gray-100 rounded-xl shadow-lg"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <button
                      className="w-full px-4 py-3 text-left hover:bg-[var(--accent-bg)] rounded-t-xl text-[var(--text-default)]"
                      onClick={() => {
                        setFiltroComissao("todas");
                        setMenuComissao(false);
                      }}
                    >
                      Todas as comissões
                    </button>
                    {comissoes.map((comissao) => (
                      <button
                        key={comissao}
                        className="w-full px-4 py-3 text-left hover:bg-[var(--accent-bg)] last:rounded-b-xl text-[var(--text-default)]"
                        onClick={() => {
                          setFiltroComissao(comissao);
                          setMenuComissao(false);
                        }}
                      >
                        {comissao}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
        
        {/* Estado de carregamento */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {Array(8).fill(0).map((_, i) => (
              <motion.div 
                key={i} 
                className="clay-card p-6 animate-pulse"
                variants={itemVariants}
              >
                <div className="w-32 h-32 bg-[var(--accent-bg)] rounded-full mx-auto mb-4"></div>
                <div className="h-5 bg-[var(--accent-bg)] rounded w-3/4 mx-auto mb-2"></div>
                <div className="h-4 bg-[var(--accent-bg)] rounded w-1/2 mx-auto"></div>
              </motion.div>
            ))}
          </div>
        ) : membros.length === 0 ? (
          <div className="clay-card p-8 text-center text-[var(--text-muted)]">
            Nenhum membro cadastrado ainda.
          </div>
        ) : (
          <>
            {/* Diretoria */}
            {diretoria.length > 0 && (
              <motion.section 
                className="mb-16"
                variants={containerVariants}
                initial="hidden"
                animate="show"
              >
                <h2 className="text-2xl font-bold text-center mb-10 flex items-center justify-center gap-2" style={{ color: 'var(--text-headings)' }}>
                  <Award className="w-6 h-6" style={{ color: 'var(--primary-color)' }} />
                  Diretoria
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {diretoria.map((membro) => (
                    <motion.div key={membro.id} variants={itemVariants}>
                      <MembroCard 
                        membro={membro} 
                        onClick={() => setMembroSelecionado(membro)}
                      />
                    </motion.div>
                  ))}
                </div>
              </motion.section>
            )}
            
            {/* Outros membros */}
            {outros.length > 0 && (
              <motion.section 
                className="mb-16"
                variants={containerVariants}
                initial="hidden"
                animate="show"
              >
                <h2 className="text-2xl font-bold text-center mb-10 flex items-center justify-center gap-2" style={{ color: 'var(--text-headings)' }}>
                  <Users className="w-6 h-6" style={{ color: 'var(--primary-color)' }} />
                  {filtroComissao !== "todas" ? filtroComissao : "Outros Membros"}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {outros.map((membro) => (
                    <motion.div key={membro.id} variants={itemVariants}>
                      <MembroCard 
                        membro={membro}
                        onClick={() => setMembroSelecionado(membro)}
                      />
                    </motion.div>
                  ))}
                </div>
              </motion.section>
            )}
          </>
        )}
      </div>

      {/* Modal de Detalhes do Membro */}
      <AnimatePresence>
        {membroSelecionado && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            onClick={() => setMembroSelecionado(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="clay-card bg-[var(--clay-bg)] max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                {/* Imagem de Capa (decorativa) */}
                <div 
                  className="h-32 w-full bg-gradient-to-r from-[var(--primary-color)] to-[var(--secondary-color)] opacity-20"
                ></div>
                
                {/* Avatar */}
                <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="w-32 h-32 rounded-full border-4 border-[var(--clay-bg)] overflow-hidden">
                    {membroSelecionado.foto ? (
                      <img 
                        src={membroSelecionado.foto} 
                        alt={membroSelecionado.nome} 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-[var(--primary-color)] to-[var(--secondary-color)] flex items-center justify-center text-white text-4xl font-bold">
                        {membroSelecionado.nome?.charAt(0) || "?"}
                      </div>
                    )}
                  </div>
                </div>

                {/* Conteúdo */}
                <div className="pt-20 p-8">
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold mb-2" style={{ color: 'var(--text-headings)' }}>
                      {membroSelecionado.nome}
                    </h3>
                    <p className="text-[var(--primary-color)] font-medium text-lg mb-2">
                      {membroSelecionado.cargo}
                    </p>
                    {membroSelecionado.comissao && (
                      <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium" style={{ background: 'var(--accent-bg)', color: 'var(--primary-color)' }}>
                        {membroSelecionado.comissao}
                      </span>
                    )}
                  </div>

                  {membroSelecionado.descricao && (
                    <div className="mb-8">
                      <h4 className="text-lg font-semibold mb-2" style={{ color: 'var(--text-headings)' }}>
                        Sobre
                      </h4>
                      <p className="text-[var(--text-default)] leading-relaxed">
                        {membroSelecionado.descricao}
                      </p>
                    </div>
                  )}

                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function MembroCard({ membro, onClick }) {
  return (
    <motion.div 
      className="clay-card bg-[var(--clay-bg)] hover:shadow-lg transition-all duration-300 cursor-pointer group"
      onClick={onClick}
      whileHover={{ y: -5 }}
      style={{ color: 'var(--text-default)' }}
    >
      <div className="p-6 text-center">
        <div className="mb-4 relative mx-auto">
          <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-2 border-4 transition-colors duration-300"
               style={{ borderColor: 'var(--accent-bg)', background: 'var(--accent-bg)' }}>
            {membro.foto ? (
              <img 
                src={membro.foto} 
                alt={membro.nome} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-[var(--primary-color)] to-[var(--secondary-color)] flex items-center justify-center text-white text-3xl font-bold">
                {membro.nome?.charAt(0) || "?"}
              </div>
            )}
          </div>
          {membro.comissao && (
            <motion.span 
              className="absolute bottom-0 right-1/2 transform translate-x-1/2 inline-block px-3 py-1 rounded-full text-xs font-medium"
              style={{ background: 'var(--accent-bg)', color: 'var(--primary-color)' }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {membro.comissao}
            </motion.span>
          )}
        </div>
        <h3 className="text-xl font-bold mb-1 group-hover:text-[var(--primary-color)] transition-colors">
          {membro.nome}
        </h3>
        <p className="text-[var(--primary-color)] font-medium mb-4">
          {membro.cargo}
        </p>
        {membro.descricao && (
          <p className="text-sm text-[var(--text-muted)] line-clamp-2 mb-4">
            {membro.descricao}
          </p>
        )}
        <button 
          className="text-sm font-medium flex items-center gap-1 mx-auto group-hover:underline"
          style={{ color: 'var(--primary-color)' }}
        >
          Ver detalhes <ArrowRight size={14} />
        </button>
      </div>
    </motion.div>
  );
}
