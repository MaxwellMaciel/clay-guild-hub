import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Lista de rotas que requerem autenticação
const ROTAS_PROTEGIDAS = ['/admin'];

export function middleware(request: NextRequest) {
  // Verifica se a rota atual requer autenticação
  const rotaAtual = request.nextUrl.pathname;
  const requerAutenticacao = ROTAS_PROTEGIDAS.some(rota => rotaAtual.startsWith(rota));

  if (requerAutenticacao) {
    // Verifica se o usuário está autenticado
    const token = request.cookies.get('admin_token')?.value;
    
    if (!token) {
      // Redireciona para a página de login se não estiver autenticado
      const url = new URL('/admin/login', request.url);
      url.searchParams.set('from', rotaAtual);
      return NextResponse.redirect(url);
    }

    // TODO: Validar o token com o Vercel KV
    // Por enquanto, usando um token fixo para teste
    if (token !== process.env.ADMIN_TOKEN) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/:path*',
  ],
}; 