import React, { useState, useEffect } from "react";
import { Noticia, NoticiaData } from "@/entities/Noticia";
import { Plus, Trash2, Edit2, Save, X, FileText } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import AdminHeader from "@/components/AdminHeader";

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
        await Noticia.update(editingNoticia.id, formData);
        toast.success("Notícia atualizada com sucesso!");
      } else {
        await Noticia.create(formData);
        toast.success("Notícia criada com sucesso!");
      }
      
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
            Gerenciar Notícias
          </h1>
          <p className="text-lg text-[var(--text-default)] max-w-3xl mx-auto">
            Crie, edite e gerencie as notícias do site. Mantenha a comunidade informada sobre as últimas novidades.
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
          <FileText size={24} style={{ color: 'var(--primary-color)' }} />
          {editingNoticia ? "Editar Notícia" : "Nova Notícia"}
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
              Conteúdo
            </label>
            <textarea
              value={formData.conteudo}
              onChange={(e) => setFormData({ ...formData, conteudo: e.target.value })}
              className="clay-input w-full h-40 px-4 py-3"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-default)' }}>
                Data
              </label>
              <input
                type="date"
                value={formData.data}
                onChange={(e) => setFormData({ ...formData, data: e.target.value })}
                className="clay-input w-full px-4 py-3"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-default)' }}>
                Autor (opcional)
              </label>
              <input
                type="text"
                value={formData.autor || ""}
                onChange={(e) => setFormData({ ...formData, autor: e.target.value })}
                className="clay-input w-full px-4 py-3"
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

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="destaque"
              checked={formData.destaque}
              onChange={(e) => setFormData({ ...formData, destaque: e.target.checked })}
              className="w-4 h-4 rounded border-gray-300"
            />
            <label htmlFor="destaque" className="text-sm" style={{ color: 'var(--text-default)' }}>
              Destacar esta notícia
            </label>
          </div>

          <div className="flex gap-4">
            <motion.button
              type="submit"
              className="clay-button px-6 py-3 font-medium flex items-center gap-2"
              style={{ backgroundColor: 'var(--primary-color)', color: 'var(--text-on-primary-bg)' }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
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
            </motion.button>

            {editingNoticia && (
              <motion.button
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

      {/* Lista de Notícias */}
      <motion.div 
        className="space-y-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2" style={{ color: 'var(--text-headings)' }}>
          <FileText size={24} style={{ color: 'var(--primary-color)' }} />
          Notícias Publicadas
        </h2>

        {loading ? (
          <div className="text-center py-12" style={{ color: 'var(--text-muted)' }}>
            <div className="animate-spin rounded-full h-8 w-8 border-2 border-t-transparent mx-auto mb-4"></div>
            Carregando notícias...
          </div>
        ) : noticias.length === 0 ? (
          <div className="text-center py-12" style={{ color: 'var(--text-muted)' }}>
            Nenhuma notícia publicada ainda.
          </div>
        ) : (
          <div className="grid gap-6">
            <AnimatePresence>
              {noticias.map((noticia) => (
                <motion.div
                  key={noticia.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="clay-card p-6"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--text-headings)' }}>
                        {noticia.titulo}
                      </h3>
                      <p className="text-sm mb-4" style={{ color: 'var(--text-muted)' }}>
                        {new Date(noticia.data).toLocaleDateString('pt-BR')}
                        {noticia.autor && ` • Por ${noticia.autor}`}
                      </p>
                      <p className="line-clamp-2" style={{ color: 'var(--text-default)' }}>
                        {noticia.conteudo}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <motion.button
                        onClick={() => handleEdit(noticia)}
                        className="clay-button p-2"
                        style={{ color: 'var(--primary-color)' }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Edit2 size={18} />
                      </motion.button>
                      <motion.button
                        onClick={() => handleDelete(noticia.id)}
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
