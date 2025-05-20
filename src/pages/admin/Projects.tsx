import React, { useState, useEffect } from "react";
import { Projeto, ProjetoData } from "@/entities/Projeto";
import { Plus, Trash2, Edit2, Save, X, Briefcase } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import AdminHeader from "@/components/AdminHeader";

interface ProjetoFormData {
  titulo: string;
  descricao: string;
  status: "planejado" | "em_andamento" | "concluido";
  data_inicio: string;
  data_conclusao?: string;
  responsaveis: string[];
  imagem?: string;
}

export default function AdminProjects() {
  const [projetos, setProjetos] = useState<ProjetoData[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProjeto, setEditingProjeto] = useState<ProjetoData | null>(null);
  const [formData, setFormData] = useState<ProjetoFormData>({
    titulo: "",
    descricao: "",
    status: "planejado",
    data_inicio: new Date().toISOString().split('T')[0],
    responsaveis: []
  });
  
  // Helper state for managing responsaveis as a comma-separated string
  const [responsaveisInput, setResponsaveisInput] = useState("");

  useEffect(() => {
    carregarProjetos();
  }, []);

  useEffect(() => {
    if (editingProjeto) {
      setResponsaveisInput(editingProjeto.responsaveis.join(", "));
    } else {
      setResponsaveisInput("");
    }
  }, [editingProjeto]);

  const carregarProjetos = async () => {
    try {
      const dados = await Projeto.list();
      setProjetos(dados);
    } catch (error) {
      console.error("Erro ao carregar projetos:", error);
      toast.error("Erro ao carregar projetos");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Process responsaveis from comma-separated string to array
    const responsaveisArray = responsaveisInput
      .split(",")
      .map(item => item.trim())
      .filter(item => item.length > 0);
      
    const projectData = {
      ...formData,
      responsaveis: responsaveisArray
    };
    
    try {
      if (editingProjeto) {
        await Projeto.update(editingProjeto.id, projectData);
        toast.success("Projeto atualizado com sucesso!");
      } else {
        await Projeto.create(projectData);
        toast.success("Projeto criado com sucesso!");
      }
      
      setFormData({
        titulo: "",
        descricao: "",
        status: "planejado",
        data_inicio: new Date().toISOString().split('T')[0],
        responsaveis: []
      });
      setResponsaveisInput("");
      setEditingProjeto(null);
      await carregarProjetos();
    } catch (error) {
      console.error("Erro ao salvar projeto:", error);
      toast.error("Erro ao salvar projeto");
    }
  };

  const handleEdit = (projeto: ProjetoData) => {
    setEditingProjeto(projeto);
    setFormData({
      titulo: projeto.titulo,
      descricao: projeto.descricao,
      status: projeto.status,
      data_inicio: projeto.data_inicio,
      data_conclusao: projeto.data_conclusao,
      responsaveis: projeto.responsaveis,
      imagem: projeto.imagem
    });
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Tem certeza que deseja excluir este projeto?")) {
      try {
        await Projeto.delete(id);
        toast.success("Projeto excluído com sucesso!");
        await carregarProjetos();
      } catch (error) {
        console.error("Erro ao excluir projeto:", error);
        toast.error("Erro ao excluir projeto");
      }
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "planejado":
        return "var(--accent-color)";
      case "em_andamento":
        return "var(--primary-color)";
      case "concluido":
        return "var(--success-color)";
      default:
        return "var(--text-muted)";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "planejado":
        return "Planejado";
      case "em_andamento":
        return "Em Andamento";
      case "concluido":
        return "Concluído";
      default:
        return status;
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <AdminHeader />

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
            Gerenciar Projetos
          </h1>
          <p className="text-lg text-[var(--text-default)] max-w-3xl mx-auto">
            Crie, edite e gerencie os projetos da comunidade. Mantenha todos informados sobre o progresso das iniciativas.
          </p>
        </motion.div>
      </motion.div>

      {/* Formulário */}
      <motion.div 
        className="clay-card p-8 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2" style={{ color: 'var(--text-headings)' }}>
          <Briefcase size={24} style={{ color: 'var(--primary-color)' }} />
          {editingProjeto ? "Editar Projeto" : "Novo Projeto"}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-default)' }}>
              Título
            </label>
            <input
              type="text"
              value={formData.titulo}
              onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
              className="clay-input w-full px-4 py-3"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-default)' }}>
              Descrição
            </label>
            <textarea
              value={formData.descricao}
              onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
              className="clay-input w-full h-40 px-4 py-3"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-default)' }}>
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as ProjetoFormData["status"] })}
                className="clay-input w-full px-4 py-3"
                required
              >
                <option value="planejado">Planejado</option>
                <option value="em_andamento">Em Andamento</option>
                <option value="concluido">Concluído</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-default)' }}>
                Data de Início
              </label>
              <input
                type="date"
                value={formData.data_inicio}
                onChange={(e) => setFormData({ ...formData, data_inicio: e.target.value })}
                className="clay-input w-full px-4 py-3"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-default)' }}>
                Data de Conclusão (opcional)
              </label>
              <input
                type="date"
                value={formData.data_conclusao || ""}
                onChange={(e) => setFormData({ ...formData, data_conclusao: e.target.value })}
                className="clay-input w-full px-4 py-3"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-default)' }}>
                Responsáveis (separados por vírgula)
              </label>
              <input
                type="text"
                value={responsaveisInput}
                onChange={(e) => setResponsaveisInput(e.target.value)}
                className="clay-input w-full px-4 py-3"
                placeholder="João Silva, Maria Oliveira"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-default)' }}>
              URL da Imagem (opcional)
            </label>
            <input
              type="url"
              value={formData.imagem || ""}
              onChange={(e) => setFormData({ ...formData, imagem: e.target.value })}
              className="clay-input w-full px-4 py-3"
            />
          </div>

          <div className="flex gap-4">
            <motion.button
              type="submit"
              className="clay-button px-6 py-3 font-medium flex items-center gap-2"
              style={{ backgroundColor: 'var(--primary-color)', color: 'var(--text-on-primary-bg)' }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {editingProjeto ? (
                <>
                  <Save size={18} />
                  Salvar Alterações
                </>
              ) : (
                <>
                  <Plus size={18} />
                  Adicionar Projeto
                </>
              )}
            </motion.button>

            {editingProjeto && (
              <motion.button
                type="button"
                onClick={() => {
                  setEditingProjeto(null);
                  setFormData({
                    titulo: "",
                    descricao: "",
                    status: "planejado",
                    data_inicio: new Date().toISOString().split('T')[0],
                    responsaveis: []
                  });
                  setResponsaveisInput("");
                }}
                className="clay-button px-6 py-3 font-medium flex items-center gap-2"
                style={{ color: 'var(--text-default)' }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <X size={18} />
                Cancelar Edição
              </motion.button>
            )}
          </div>
        </form>
      </motion.div>

      {/* Lista de Projetos */}
      <motion.div 
        className="space-y-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2" style={{ color: 'var(--text-headings)' }}>
          <Briefcase size={24} style={{ color: 'var(--primary-color)' }} />
          Projetos Cadastrados
        </h2>

        {loading ? (
          <div className="text-center py-12" style={{ color: 'var(--text-muted)' }}>
            <div className="animate-spin rounded-full h-8 w-8 border-2 border-t-transparent mx-auto mb-4"></div>
            Carregando projetos...
          </div>
        ) : projetos.length === 0 ? (
          <div className="text-center py-12" style={{ color: 'var(--text-muted)' }}>
            Nenhum projeto cadastrado ainda.
          </div>
        ) : (
          <div className="grid gap-6">
            <AnimatePresence>
              {projetos.map((projeto) => (
                <motion.div
                  key={projeto.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="clay-card p-6"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-semibold" style={{ color: 'var(--text-headings)' }}>
                          {projeto.titulo}
                        </h3>
                        <span 
                          className="px-3 py-1 rounded-full text-sm font-medium"
                          style={{ 
                            backgroundColor: `${getStatusColor(projeto.status)}20`,
                            color: getStatusColor(projeto.status)
                          }}
                        >
                          {getStatusText(projeto.status)}
                        </span>
                      </div>
                      <p className="text-sm mb-4" style={{ color: 'var(--text-muted)' }}>
                        Início: {new Date(projeto.data_inicio).toLocaleDateString('pt-BR')}
                        {projeto.data_conclusao && ` • Término: ${new Date(projeto.data_conclusao).toLocaleDateString('pt-BR')}`}
                      </p>
                      <p className="line-clamp-2" style={{ color: 'var(--text-default)' }}>
                        {projeto.descricao}
                      </p>
                      {projeto.responsaveis.length > 0 && (
                        <p className="text-sm mt-2" style={{ color: 'var(--text-muted)' }}>
                          Responsáveis: {projeto.responsaveis.join(", ")}
                        </p>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <motion.button
                        onClick={() => handleEdit(projeto)}
                        className="clay-button p-2"
                        style={{ color: 'var(--primary-color)' }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Edit2 size={18} />
                      </motion.button>
                      <motion.button
                        onClick={() => handleDelete(projeto.id)}
                        className="clay-button p-2"
                        style={{ color: 'var(--destructive)' }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Trash2 size={18} />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </motion.div>
    </div>
  );
}
