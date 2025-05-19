import type { NextApiRequest, NextApiResponse } from 'next';
import { serialize } from 'cookie';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método não permitido' });
  }

  const { senha } = req.body;

  // TODO: Implementar validação mais segura com Vercel KV
  // Por enquanto, usando uma senha fixa para teste
  if (senha === process.env.ADMIN_PASSWORD) {
    // Gera um token de sessão
    const token = process.env.ADMIN_TOKEN;

    // Define o cookie com o token
    res.setHeader('Set-Cookie', serialize('admin_token', token as string, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7, // 7 dias
      path: '/',
    }));

    return res.status(200).json({ message: 'Login realizado com sucesso' });
  }

  return res.status(401).json({ message: 'Senha incorreta' });
} 