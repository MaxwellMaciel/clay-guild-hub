
import React, { useState, useEffect } from "react";
import { Projeto, ProjetoData } from "@/entities/Projeto";
import { Plus, Trash2, Edit2, Save, X } from "lucide-react";
import { toast } from "sonner";
import AdminHeader from "@/components/AdminHeader";

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
        // Update existing project
        await Projeto.update(editingProjeto.id, projectData);
        toast.success("Projeto atualizado com sucesso!");
      } else {
        // Create new project
        await Projeto.create(projectData);
        toast.success("Projeto criado com sucesso!");
      }
      
      // Clear form and reload projects
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

  return (
    <div className="max-w-7xl mx-auto p-6">
      <AdminHeader />

      {/* Project Form */}
      <div className="clay-card p-6 mb-8" style={{ backgroundColor: 'var(--clay-bg)' }}>
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
                onChange={(e) => setFormData({ 
                  ...formData, 
                  status: e.target.value as 'planejado' | 'em_andamento' | 'concluido'
                })}
                className="clay-input w-full"
                required
              >
                <option value="planejado">Planejado</option>
                <option value="em_andamento">Em andamento</option>
                <option value="concluido">Concluído</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-default)' }}>
                Data de início
              </label>
              <input
                type="date"
                value={formData.data_inicio}
                onChange={(e) => setFormData({ ...formData, data_inicio: e.target.value })}
                className="clay-input w-full"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-default)' }}>
              Data de conclusão (opcional)
            </label>
            <input
              type="date"
              value={formData.data_conclusao || ""}
              onChange={(e) => setFormData({ ...formData, data_conclusao: e.target.value })}
              className="clay-input w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-default)' }}>
              Responsáveis (separados por vírgula)
            </label>
            <input
              type="text"
              value={responsaveisInput}
              onChange={(e) => setResponsaveisInput(e.target.value)}
              className="clay-input w-full"
              placeholder="João Silva, Maria Oliveira"
            />
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
                  setResponsaveisInput("");
                }}
                className="clay-button px-4 py-2 flex items-center gap-2"
                style={{ color: 'var(--text-default)' }}
              >
                <X size={18} />
                Cancelar Edição
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Project List */}
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
                style={{ backgroundColor: 'var(--clay-bg)' }}
              >
                <div>
                  <h3 className="font-semibold" style={{ color: 'var(--text-headings)' }}>
                    {projeto.titulo}
                  </h3>
                  <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                    {new Date(projeto.data_inicio).toLocaleDateString('pt-BR')}
                    <span className="ml-2 px-2 py-0.5 rounded-full text-xs"
                          style={{
                            backgroundColor: 
                              projeto.status === 'planejado' ? 'var(--info-color-light, "#e0e7ff")' :
                              projeto.status === 'em_andamento' ? 'var(--warning-color-light, "#fef9c3")' :
                              'var(--success-color-light, "#dcfce7")',
                            color:
                              projeto.status === 'planejado' ? 'var(--info-color, "#4f46e5")' :
                              projeto.status === 'em_andamento' ? 'var(--warning-color, "#eab308")' :
                              'var(--success-color, "#16a34a")'
                          }}>
                      {projeto.status === 'planejado' ? 'Planejado' : 
                       projeto.status === 'em_andamento' ? 'Em andamento' : 
                       'Concluído'}
                    </span>
                  </p>
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
                    style={{ color: 'var(--error-color, "#dc2626")' }}
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
