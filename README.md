# Clay Guild Hub

Sistema de gerenciamento para o Grêmio Estudantil do IFCE Campus Maranguape.

## 🚀 Tecnologias

- React
- TypeScript
- Vite
- Tailwind CSS
- Supabase
- Framer Motion

## 📋 Pré-requisitos

- Node.js 18+
- npm ou yarn
- Conta no Supabase

## 🔧 Instalação

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/clay-guild-hub.git
cd clay-guild-hub
```

2. Instale as dependências:
```bash
npm install
# ou
yarn install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.example .env.local
```
Edite o arquivo `.env.local` com suas credenciais do Supabase.

4. Inicie o servidor de desenvolvimento:
```bash
npm run dev
# ou
yarn dev
```

## 🔐 Configuração do Supabase

1. Crie uma conta no [Supabase](https://supabase.com)
2. Crie um novo projeto
3. Configure as tabelas necessárias:
   - noticias
   - projetos
4. Configure as políticas de segurança (RLS)
5. Copie as credenciais do projeto para o arquivo `.env.local`

## 📦 Estrutura do Projeto

```
clay-guild-hub/
├── src/
│   ├── components/     # Componentes reutilizáveis
│   ├── contexts/       # Contextos do React
│   ├── entities/       # Entidades e modelos
│   ├── integrations/   # Integrações com serviços externos
│   ├── lib/           # Utilitários e configurações
│   ├── pages/         # Páginas da aplicação
│   └── App.tsx        # Componente principal
├── public/            # Arquivos estáticos
└── ...
```

## 🔒 Segurança

- Autenticação via Supabase
- Políticas de RLS para proteção dos dados
- Variáveis de ambiente para credenciais sensíveis
- Proteção contra ataques comuns

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 📧 Contato

Grêmio Estudantil do IFCE Campus Maranguape
- Email: gremio.estudantil@maranguape.ifce.edu.br

## Project info

**URL**: https://lovable.dev/projects/a69b0cc5-89d2-42e0-88e1-3537ca7798f6

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/a69b0cc5-89d2-42e0-88e1-3537ca7798f6) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/a69b0cc5-89d2-42e0-88e1-3537ca7798f6) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
