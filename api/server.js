const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const app = express();
const PORT = 4000;

// Use CORS para permitir requisições do front-end
app.use(cors());
app.use(express.json());

// Use variáveis de ambiente para senha e segredo do JWT
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';
const JWT_SECRET = process.env.JWT_SECRET || 'segredo_super_secreto';
const JWT_EXPIRES_IN = '2h';

// Middleware para proteger rotas
function autenticarToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ success: false, message: 'Token não fornecido' });
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ success: false, message: 'Token inválido ou expirado' });
    req.user = user;
    next();
  });
}

// Rota de login
app.post('/login', (req, res) => {
  const { senha } = req.body;
  if (senha === ADMIN_PASSWORD) {
    // Gera o token JWT
    const token = jwt.sign({ user: 'admin' }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
    return res.json({ success: true, token });
  }
  return res.status(401).json({ success: false, message: 'Senha incorreta' });
});

// Exemplo de rota protegida
app.get('/noticias-protegidas', autenticarToken, (req, res) => {
  res.json({ success: true, noticias: [
    { id: 1, titulo: 'Notícia secreta', conteudo: 'Só para admins!' }
  ] });
});

app.listen(PORT, () => {
  console.log(`API rodando em http://localhost:${PORT}`);
}); 