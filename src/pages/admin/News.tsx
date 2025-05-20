import React, { useState, useEffect } from "react";
import { Noticia, NoticiaData } from "@/entities/Noticia";
import { Plus, Trash2, Edit2, Save, X } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

interface NoticiaFormData {
  titulo: string;
  conteudo: string;
  data: string;
  autor?: string;
  imagem?: string;
  destaque: boolean;
}

export default function AdminNews() {
  const [noticias, setNoticias] = useState<NoticiaData[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingNoticia, setEditingNoticia] = useState<NoticiaData | null>(null);
  const [formData, setFormData] = useState<NoticiaFormData>({
    titulo: "",
    conteudo: "",
    data: new Date().toISOString().split('T')[0],
    destaque: false
  });

  useEffect(() => {
    carregarNoticias();
  }, []);

  const carregarNoticias = async () => {
    try {
      const dados = await Noticia.list("-data");
      setNoticias(dados);
    } catch (error) {
      console.error("Erro ao carregar notícias:", error);
      toast.error("Erro ao carregar notícias");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingNoticia) {
        // Atualizar notícia existente
        await Noticia.update(editingNoticia.id, formData);
        toast.success("Notícia atualizada com sucesso!");
      } else {
        // Criar nova notícia
        await Noticia.create(formData);
        toast.success("Notícia criada com sucesso!");
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
      toast.error("Erro ao salvar notícia");
    }
  };

  const handleEdit = (noticia: NoticiaData) => {
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

  const handleDelete = async (id: string) => {
    if (window.confirm("Tem certeza que deseja excluir esta notícia?")) {
      try {
        await Noticia.delete(id);
        toast.success("Notícia excluída com sucesso!");
        await carregarNoticias();
      } catch (error) {
        console.error("Erro ao excluir notícia:", error);
        toast.error("Erro ao excluir notícia");
      }
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
    </div>
  );
}
