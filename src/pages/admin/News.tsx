import React, { useState, useEffect } from "react";
import { Noticia } from "@/entities/Noticia";
import { Plus, Trash2, Edit2, Save, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from 'react-router-dom';
import { Projeto, ProjetoData } from '@/entities/Projeto';

interface NoticiaFormData {
  titulo: string;
  conteudo: string;
  data: string;
  autor?: string;
  imagem?: string;
  destaque: boolean;
}

interface ProjetoFormData {
  titulo: string;
  descricao: string;
  status: 'planejado' | 'em_andamento' | 'concluido';
  data_inicio: string;
  data_conclusao: string;
  responsaveis: string;
  imagem?: string;
}

export default function AdminNews() {
  const [noticias, setNoticias] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingNoticia, setEditingNoticia] = useState<any>(null);
  const [formData, setFormData] = useState<NoticiaFormData>({
    titulo: "",
    conteudo: "",
    data: new Date().toISOString().split('T')[0],
    destaque: false
  });
  const [projetos, setProjetos] = useState<ProjetoData[]>([]);
  const [loadingProjetos, setLoadingProjetos] = useState(true);
  const [editingProjeto, setEditingProjeto] = useState<ProjetoData | null>(null);
  const [formProjeto, setFormProjeto] = useState<ProjetoFormData>({
    titulo: '',
    descricao: '',
    status: 'planejado',
    data_inicio: '',
    data_conclusao: '',
    responsaveis: '',
    imagem: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Protege a rota: exige token JWT
    const token = localStorage.getItem('admin_token');
    if (!token) {
      navigate('/admin/login');
      return;
    }
    carregarNoticias();
    carregarProjetos();
  }, []);

  const carregarNoticias = async () => {
    try {
      const dados = await Noticia.list("-data");
      setNoticias(dados);
    } catch (error) {
      console.error("Erro ao carregar notícias:", error);
    } finally {
      setLoading(false);
    }
  };

  const carregarProjetos = async () => {
    setLoadingProjetos(true);
    try {
      const dados = await Projeto.list();
      setProjetos(dados);
    } catch (error) {
      console.error('Erro ao carregar projetos:', error);
    } finally {
      setLoadingProjetos(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingNoticia) {
        // Atualizar notícia existente
        await Noticia.update(editingNoticia.id, formData);
      } else {
        // Criar nova notícia
        await Noticia.create(formData);
      }
      
      // Limpar formulário e recarregar notícias
      setFormData({
        titulo: "",
        conteudo: "",
        data: new Date().toISOString().split('T')[0],
        destaque: false
      });
      setEditingNoticia(null);
      await carregarNoticias();
    } catch (error) {
      console.error("Erro ao salvar notícia:", error);
    }
  };

  const handleEdit = (noticia: any) => {
    setEditingNoticia(noticia);
    setFormData({
      titulo: noticia.titulo,
      conteudo: noticia.conteudo,
      data: noticia.data,
      autor: noticia.autor,
      imagem: noticia.imagem,
      destaque: noticia.destaque
    });
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Tem certeza que deseja excluir esta notícia?")) {
      try {
        await Noticia.delete(id);
        await carregarNoticias();
      } catch (error) {
        console.error("Erro ao excluir notícia:", error);
      }
    }
  };

  const handleSubmitProjeto = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingProjeto) {
        // Atualizar projeto (mock)
        // Implemente update real se necessário
        setProjetos(prev => prev.map(p => p.id === editingProjeto.id ? { ...editingProjeto, ...formProjeto, responsaveis: formProjeto.responsaveis.split(',').map(r => r.trim()) } : p));
      } else {
        // Criar novo projeto (mock)
        setProjetos(prev => [
          ...prev,
          {
            id: Date.now().toString(),
            ...formProjeto,
            responsaveis: formProjeto.responsaveis.split(',').map(r => r.trim()),
            created_date: new Date().toISOString().split('T')[0]
          }
        ]);
      }
      setFormProjeto({
        titulo: '', descricao: '', status: 'planejado', data_inicio: '', data_conclusao: '', responsaveis: '', imagem: ''
      });
      setEditingProjeto(null);
    } catch (error) {
      console.error('Erro ao salvar projeto:', error);
    }
  };

  const handleEditProjeto = (projeto: ProjetoData) => {
    setEditingProjeto(projeto);
    setFormProjeto({
      titulo: projeto.titulo,
      descricao: projeto.descricao,
      status: projeto.status,
      data_inicio: projeto.data_inicio,
      data_conclusao: projeto.data_conclusao,
      responsaveis: projeto.responsaveis.join(', '),
      imagem: projeto.imagem || ''
    });
  };

  const handleDeleteProjeto = (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este projeto?')) {
      setProjetos(prev => prev.filter(p => p.id !== id));
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8" style={{ color: 'var(--text-headings)' }}>
        Gerenciar Notícias
      </h1>

      {/* Formulário */}
      <div className="clay-card p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4" style={{ color: 'var(--text-headings)' }}>
          {editingNoticia ? "Editar Notícia" : "Nova Notícia"}
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
              Conteúdo
            </label>
            <textarea
              value={formData.conteudo}
              onChange={(e) => setFormData({ ...formData, conteudo: e.target.value })}
              className="clay-input w-full h-32"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-default)' }}>
                Data
              </label>
              <input
                type="date"
                value={formData.data}
                onChange={(e) => setFormData({ ...formData, data: e.target.value })}
                className="clay-input w-full"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-default)' }}>
                Autor (opcional)
              </label>
              <input
                type="text"
                value={formData.autor || ""}
                onChange={(e) => setFormData({ ...formData, autor: e.target.value })}
                className="clay-input w-full"
              />
            </div>
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

          <div className="flex items-center">
            <input
              type="checkbox"
              id="destaque"
              checked={formData.destaque}
              onChange={(e) => setFormData({ ...formData, destaque: e.target.checked })}
              className="mr-2"
            />
            <label htmlFor="destaque" style={{ color: 'var(--text-default)' }}>
              Destacar esta notícia
            </label>
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              className="clay-button px-4 py-2 flex items-center gap-2"
              style={{ backgroundColor: 'var(--primary-color)', color: 'var(--text-on-primary-bg)' }}
            >
              {editingNoticia ? (
                <>
                  <Save size={18} />
                  Salvar Alterações
                </>
              ) : (
                <>
                  <Plus size={18} />
                  Adicionar Notícia
                </>
              )}
            </button>

            {editingNoticia && (
              <button
                type="button"
                onClick={() => {
                  setEditingNoticia(null);
                  setFormData({
                    titulo: "",
                    conteudo: "",
                    data: new Date().toISOString().split('T')[0],
                    destaque: false
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

      {/* Lista de Notícias */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold mb-4" style={{ color: 'var(--text-headings)' }}>
          Notícias Publicadas
        </h2>

        {loading ? (
          <div className="text-center py-8" style={{ color: 'var(--text-muted)' }}>
            Carregando...
          </div>
        ) : noticias.length === 0 ? (
          <div className="text-center py-8" style={{ color: 'var(--text-muted)' }}>
            Nenhuma notícia publicada ainda.
          </div>
        ) : (
          <div className="space-y-4">
            {noticias.map((noticia) => (
              <div
                key={noticia.id}
                className="clay-card p-4 flex items-center justify-between"
              >
                <div>
                  <h3 className="font-semibold" style={{ color: 'var(--text-headings)' }}>
                    {noticia.titulo}
                  </h3>
                  <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                    {new Date(noticia.data).toLocaleDateString('pt-BR')}
                    {noticia.destaque && (
                      <span className="ml-2 px-2 py-0.5 rounded-full text-xs"
                            style={{ backgroundColor: 'var(--accent-bg)', color: 'var(--primary-color)' }}>
                        Destaque
                      </span>
                    )}
                  </p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(noticia)}
                    className="clay-button p-2"
                    style={{ color: 'var(--primary-color)' }}
                  >
                    <Edit2 size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(noticia.id)}
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

      <div className="mt-16">
        <h1 className="text-3xl font-bold mb-8" style={{ color: 'var(--text-headings)' }}>
          Gerenciar Projetos
        </h1>
        <div className="clay-card p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4" style={{ color: 'var(--text-headings)' }}>
            {editingProjeto ? 'Editar Projeto' : 'Novo Projeto'}
          </h2>
          <form onSubmit={handleSubmitProjeto} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Título</label>
              <input type="text" value={formProjeto.titulo} onChange={e => setFormProjeto({ ...formProjeto, titulo: e.target.value })} className="clay-input w-full" required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Descrição</label>
              <textarea value={formProjeto.descricao} onChange={e => setFormProjeto({ ...formProjeto, descricao: e.target.value })} className="clay-input w-full h-24" required />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Status</label>
                <select value={formProjeto.status} onChange={e => setFormProjeto({ ...formProjeto, status: e.target.value as any })} className="clay-input w-full">
                  <option value="planejado">Planejado</option>
                  <option value="em_andamento">Em andamento</option>
                  <option value="concluido">Concluído</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Responsáveis (separados por vírgula)</label>
                <input type="text" value={formProjeto.responsaveis} onChange={e => setFormProjeto({ ...formProjeto, responsaveis: e.target.value })} className="clay-input w-full" required />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Data de Início</label>
                <input type="date" value={formProjeto.data_inicio} onChange={e => setFormProjeto({ ...formProjeto, data_inicio: e.target.value })} className="clay-input w-full" required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Data de Conclusão</label>
                <input type="date" value={formProjeto.data_conclusao} onChange={e => setFormProjeto({ ...formProjeto, data_conclusao: e.target.value })} className="clay-input w-full" required />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">URL da Imagem (opcional)</label>
              <input type="url" value={formProjeto.imagem} onChange={e => setFormProjeto({ ...formProjeto, imagem: e.target.value })} className="clay-input w-full" />
            </div>
            <div className="flex gap-4">
              <button type="submit" className="clay-button px-4 py-2 flex items-center gap-2" style={{ backgroundColor: 'var(--primary-color)', color: 'var(--text-on-primary-bg)' }}>
                {editingProjeto ? (<><Save size={18} />Salvar Alterações</>) : (<><Plus size={18} />Adicionar Projeto</>)}
              </button>
              {editingProjeto && (
                <button type="button" onClick={() => { setEditingProjeto(null); setFormProjeto({ titulo: '', descricao: '', status: 'planejado', data_inicio: '', data_conclusao: '', responsaveis: '', imagem: '' }); }} className="clay-button px-4 py-2 flex items-center gap-2">
                  <X size={18} />Cancelar Edição
                </button>
              )}
            </div>
          </form>
        </div>
        <div className="space-y-4">
          <h2 className="text-xl font-semibold mb-4">Projetos Cadastrados</h2>
          {loadingProjetos ? (
            <div className="text-center py-8" style={{ color: 'var(--text-muted)' }}>Carregando...</div>
          ) : projetos.length === 0 ? (
            <div className="text-center py-8" style={{ color: 'var(--text-muted)' }}>Nenhum projeto cadastrado ainda.</div>
          ) : (
            <div className="space-y-4">
              {projetos.map((projeto) => (
                <div key={projeto.id} className="clay-card p-4 flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold" style={{ color: 'var(--text-headings)' }}>{projeto.titulo}</h3>
                    <p className="text-sm" style={{ color: 'var(--text-muted)' }}>{projeto.status} | {projeto.data_inicio} - {projeto.data_conclusao}</p>
                    <p className="text-sm" style={{ color: 'var(--text-default)' }}>{projeto.descricao}</p>
                    <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Responsáveis: {projeto.responsaveis.join(', ')}</p>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => handleEditProjeto(projeto)} className="clay-button p-2" style={{ color: 'var(--primary-color)' }}><Edit2 size={18} /></button>
                    <button onClick={() => handleDeleteProjeto(projeto.id)} className="clay-button p-2" style={{ color: 'var(--error-color)' }}><Trash2 size={18} /></button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 