import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export interface Noticia {
  id: number;
  titulo: string;
  conteudo: string;
  data: string;
  imagem_url?: string;
}

export interface Projeto {
  id: number;
  titulo: string;
  descricao: string;
  data_inicio: string;
  imagem_url?: string;
}

export function useNoticias(limit?: number) {
  const [noticias, setNoticias] = useState<Noticia[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchNoticias() {
      try {
        let query = supabase
          .from('noticias')
          .select('*')
          .order('data', { ascending: false });

        if (limit) {
          query = query.limit(limit);
        }

        const { data, error } = await query;

        if (error) throw error;
        setNoticias(data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro ao carregar notícias');
      } finally {
        setLoading(false);
      }
    }

    fetchNoticias();
  }, [limit]);

  return { noticias, loading, error };
}

export function useProjetos(limit?: number) {
  const [projetos, setProjetos] = useState<Projeto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProjetos() {
      try {
        let query = supabase
          .from('projetos')
          .select('*')
          .order('data_inicio', { ascending: false });

        if (limit) {
          query = query.limit(limit);
        }

        const { data, error } = await query;

        if (error) throw error;
        setProjetos(data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro ao carregar projetos');
      } finally {
        setLoading(false);
      }
    }

    fetchProjetos();
  }, [limit]);

  return { projetos, loading, error };
} 