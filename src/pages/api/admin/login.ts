export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método não permitido' });
  }

  const { senha } = req.body;

  // Simulação de senha fixa
  if (senha === 'admin123') {
    // Simula um token de sessão
    return res.status(200).json({ message: 'Login realizado com sucesso', token: 'fake-token' });
  }

  return res.status(401).json({ message: 'Senha incorreta' });
} 