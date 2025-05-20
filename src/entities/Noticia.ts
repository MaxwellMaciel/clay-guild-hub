
import { supabase } from "@/integrations/supabase/client";

export interface NoticiaData {
  id: string;
  titulo: string;
  conteudo: string;
  data: string;
  autor?: string;
  imagem?: string;
  destaque: boolean;
  created_at?: string;
}

export class Noticia {
  static async list(ordem?: string): Promise<NoticiaData[]> {
    try {
      let query = supabase
        .from('noticias')
        .select('*');
      
      // Ordenar conforme solicitado (- para ordem decrescente)
      if (ordem) {
        const campo = ordem.startsWith("-") ? ordem.substring(1) : ordem;
        const ascending = !ordem.startsWith("-");
        
        query = query.order(campo, { ascending });
      } else {
        // Por padrão, ordenar por data mais recente
        query = query.order('data', { ascending: false });
      }
      
      const { data, error } = await query;
      
      if (error) throw error;
      return data as NoticiaData[];
    } catch (error) {
      console.error("Error fetching news:", error);
      return [];
    }
  }

  static async get(id: string): Promise<NoticiaData | null> {
    try {
      const { data, error } = await supabase
        .from('noticias')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      return data as NoticiaData;
    } catch (error) {
      console.error(`Error fetching news with id ${id}:`, error);
      return null;
    }
  }

  static async create(noticia: Omit<NoticiaData, 'id'>): Promise<NoticiaData | null> {
    try {
      const { data, error } = await supabase
        .from('noticias')
        .insert([noticia])
        .select()
        .single();
      
      if (error) throw error;
      return data as NoticiaData;
    } catch (error) {
      console.error("Error creating news:", error);
      return null;
    }
  }

  static async update(id: string, noticia: Partial<NoticiaData>): Promise<NoticiaData | null> {
    try {
      const { data, error } = await supabase
        .from('noticias')
        .update(noticia)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data as NoticiaData;
    } catch (error) {
      console.error(`Error updating news with id ${id}:`, error);
      return null;
    }
  }

  static async delete(id: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('noticias')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      return true;
    } catch (error) {
      console.error(`Error deleting news with id ${id}:`, error);
      return false;
    }
  }
}
