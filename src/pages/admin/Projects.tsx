
import React, { useState, useEffect } from "react";
import { Projeto, ProjetoData } from "@/entities/Projeto";
import { Plus, Trash2, Edit2, Save, X, Calendar, Tag } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

interface ProjetoFormData {
  titulo: string;
  descricao: string;
  status: 'planejado' | 'em_andamento' | 'concluido';
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
  const [responsavelInput, setResponsavelInput] = useState("");

  useEffect(() => {
    carregarProjetos();
  }, []);

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
    
    try {
      if (editingProjeto) {
        // Atualizar projeto existente
        await Projeto.update(editingProjeto.id, formData);
        toast.success("Projeto atualizado com sucesso!");
      } else {
        // Criar novo projeto
        await Projeto.create(formData);
        toast.success("Projeto criado com sucesso!");
      }
      
      // Limpar formulário e recarregar projetos
      setFormData({
        titulo: "",
        descricao: "",
        status: "planejado",
        data_inicio: new Date().toISOString().split('T')[0],
        responsaveis: []
      });
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

  const adicionarResponsavel = () => {
    if (responsavelInput.trim()) {
      setFormData(prev => ({
        ...prev,
        responsaveis: [...prev.responsaveis, responsavelInput.trim()]
      }));
      setResponsavelInput("");
    }
  };

  const removerResponsavel = (index: number) => {
    setFormData(prev => ({
      ...prev,
      responsaveis: prev.responsaveis.filter((_, i) => i !== index)
    }));
  };

  const renderStatusBadge = (status: string) => {
    switch(status) {
      case "planejado":
        return <span className="bg-yellow-100 text-yellow-700 dark:bg-yellow-500/20 dark:text-yellow-300 px-2 py-1 rounded-full text-xs font-medium">Planejado</span>;
      case "em_andamento":
        return <span className="bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-300 px-2 py-1 rounded-full text-xs font-medium">Em Andamento</span>;
      case "concluido":
        return <span className="bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-300 px-2 py-1 rounded-full text-xs font-medium">Concluído</span>;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8" style={{ color: 'var(--text-headings)' }}>
        Gerenciar Projetos
      </h1>

      {/* Formulário */}
      <div className="clay-card p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4" style={{ color: 'var(--text-headings)' }}>
          {editingProjeto ? "Editar Projeto" : "Novo Projeto"}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-default)' }}>
              Título
            </label>
            <input
              type="text"
              value={formData.titulo}
              onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
              className="clay-input w-full"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-default)' }}>
              Descrição
            </label>
            <textarea
              value={formData.descricao}
              onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
              className="clay-input w-full h-32"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-default)' }}>
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                className="clay-input w-full"
                required
              >
                <option value="planejado">Planejado</option>
                <option value="em_andamento">Em Andamento</option>
                <option value="concluido">Concluído</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-default)' }}>
                URL da Imagem (opcional)
              </label>
              <input
                type="url"
                value={formData.imagem || ""}
                onChange={(e) => setFormData({ ...formData, imagem: e.target.value })}
                className="clay-input w-full"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-default)' }}>
                Data de Início
              </label>
              <input
                type="date"
                value={formData.data_inicio}
                onChange={(e) => setFormData({ ...formData, data_inicio: e.target.value })}
                className="clay-input w-full"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-default)' }}>
                Data de Conclusão (opcional)
              </label>
              <input
                type="date"
                value={formData.data_conclusao || ""}
                onChange={(e) => setFormData({ ...formData, data_conclusao: e.target.value })}
                className="clay-input w-full"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-default)' }}>
              Responsáveis
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={responsavelInput}
                onChange={(e) => setResponsavelInput(e.target.value)}
                className="clay-input flex-grow"
                placeholder="Nome do responsável"
              />
              <button
                type="button"
                onClick={adicionarResponsavel}
                className="clay-button px-4 py-2"
                style={{ backgroundColor: 'var(--primary-color)', color: 'var(--text-on-primary-bg)' }}
              >
                <Plus size={18} />
              </button>
            </div>
            
            {/* Lista de responsáveis */}
            <div className="mt-2 flex flex-wrap gap-2">
              {formData.responsaveis.map((responsavel, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-1 bg-[var(--accent-bg)] px-2 py-1 rounded-lg"
                >
                  <span style={{ color: 'var(--text-default)' }}>{responsavel}</span>
                  <button
                    type="button"
                    onClick={() => removerResponsavel(index)}
                    className="text-[var(--text-muted)] hover:text-[var(--error-color)]"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              className="clay-button px-4 py-2 flex items-center gap-2"
              style={{ backgroundColor: 'var(--primary-color)', color: 'var(--text-on-primary-bg)' }}
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
            </button>

            {editingProjeto && (
              <button
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
                }}
                className="clay-button px-4 py-2 flex items-center gap-2"
              >
                <X size={18} />
                Cancelar Edição
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Lista de Projetos */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold mb-4" style={{ color: 'var(--text-headings)' }}>
          Projetos Cadastrados
        </h2>

        {loading ? (
          <div className="text-center py-8" style={{ color: 'var(--text-muted)' }}>
            Carregando...
          </div>
        ) : projetos.length === 0 ? (
          <div className="text-center py-8" style={{ color: 'var(--text-muted)' }}>
            Nenhum projeto cadastrado ainda.
          </div>
        ) : (
          <div className="space-y-4">
            {projetos.map((projeto) => (
              <div
                key={projeto.id}
                className="clay-card p-4 flex items-center justify-between"
              >
                <div>
                  <h3 className="font-semibold" style={{ color: 'var(--text-headings)' }}>
                    {projeto.titulo}
                  </h3>
                  <div className="flex items-center gap-3 text-sm" style={{ color: 'var(--text-muted)' }}>
                    <div className="flex items-center gap-1">
                      <Calendar size={14} className="text-[var(--primary-color)]" />
                      {new Date(projeto.data_inicio).toLocaleDateString('pt-BR')}
                    </div>
                    <div>
                      {renderStatusBadge(projeto.status)}
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(projeto)}
                    className="clay-button p-2"
                    style={{ color: 'var(--primary-color)' }}
                  >
                    <Edit2 size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(projeto.id)}
                    className="clay-button p-2"
                    style={{ color: 'var(--error-color)' }}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
