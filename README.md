# ApoiaDesenvolvedores 🪙

**ApoiaDesenvolvedores** é uma plataforma moderna e elegante criada especificamente para desenvolvedores e criadores de conteúdo monetizarem seu trabalho. Com ela, os criadores podem ter uma página pública personalizada para receber doações financeiras de seus apoiadores via PIX, cartão ou outros métodos suportados pelo Stripe, contando com repasses automáticos e painel financeiro integrado.

---

## 🚀 Principais Funcionalidades

### 🔐 1. Autenticação Social com GitHub
- Login rápido e seguro utilizando o **Next-Auth (Auth.js v5)**.
- Criação automática da conta do usuário no banco de dados no primeiro login.
- Associação segura das sessões e credenciais.

### 👤 2. Página do Criador Personalizável (`/creator/[username]`)
- Página pública contendo a foto de perfil, banner, nome e biografia do criador.
- **Formulário de Doações:** Permite aos apoiadores escolherem ou digitarem um valor de doação (mínimo de R$ 15,00), informarem seu nome (ou optarem por anonimato) e enviarem uma mensagem de apoio.
- Redirecionamento seguro para o checkout do Stripe.

### 💳 3. Integração Financeira Completa com Stripe Connect
- **Onboarding Simplificado:** Criadores criam e vinculam uma conta **Stripe Express** diretamente pelo painel com poucos cliques.
- **Monetização da Plataforma:** Taxa de conveniência de 10% cobrada automaticamente sobre o valor total de cada doação para sustentabilidade do ecossistema, enquanto 90% é transferido diretamente para a conta conectada do criador.
- **Dashboard Stripe:** Link direto no painel para que o criador acompanhe seus saldos, transferências e configure dados bancários dentro da infraestrutura segura do Stripe.

### 📊 4. Painel de Controle (Dashboard) do Criador
- **Métricas Gerais:** Visualização rápida do total arrecadado, valores recebidos no mês atual e relatórios rápidos.
- **Tabela de Doações:** Histórico detalhado de todas as doações pagas, exibindo o nome do doador, data, valor e a mensagem de apoio enviada.
- **Gerenciamento de Perfil:** Seção `/dashboard/me` dedicada para personalizar o username (slug da página de doações), biografia e nome exibido.

### 🔗 5. Webhooks em Tempo Real
- Sincronização automatizada do status de pagamentos utilizando Webhooks do Stripe (`checkout.session.completed`).
- Atualiza o status das doações no banco de dados de `PENDING` para `PAID`, processando os metadados do doador assim que o pagamento é aprovado.

---

## 🛠️ Tecnologias Utilizadas

- **Framework:** [Next.js 15](https://nextjs.org/) (App Router & React 19)
- **Estilização:** [Tailwind CSS v4](https://tailwindcss.com/) & [shadcn/ui](https://ui.shadcn.com/)
- **Banco de Dados:** PostgreSQL (hospedado no [Neon PostgreSQL](https://neon.tech/))
- **ORM:** [Prisma Client](https://www.prisma.io/)
- **Autenticação:** [Auth.js v5 (Next-Auth)](https://authjs.dev/)
- **Integração de Pagamentos:** [Stripe API](https://stripe.com/) & Stripe SDK
- **Validação de Dados:** [Zod](https://zod.dev/) & [React Hook Form](https://react-hook-form.com/)
- **Gerenciamento de Estado:** [TanStack React Query](https://tanstack.com/query/latest)

---

## ⚙️ Pré-requisitos & Configuração

Siga os passos abaixo para configurar o ambiente de desenvolvimento local:

### 1. Clonar o Repositório
```bash
git clone <url-do-repositorio>
cd apoia_desenvolvedores
```

### 2. Instalar as Dependências
```bash
npm install
```

### 3. Configurar as Variáveis de Ambiente (`.env`)
Crie um arquivo `.env` na raiz da pasta `apoia_desenvolvedores` e preencha as seguintes chaves:

```env
# Auth.js (Gere com: npx auth secret)
AUTH_SECRET="sua_chave_secreta_aqui"

# GitHub OAuth App (Configure no Github Developer Settings)
AUTH_GITHUB_ID="seu_github_client_id"
AUTH_GITHUB_SECRET="seu_github_client_secret"

# Banco de Dados (Neon.tech PostgreSQL)
DATABASE_URL="postgresql://usuario:senha@host/dbname?sslmode=require"

# URLs de Redirecionamento
NEXT_PUBLIC_HOST_URL="http://localhost:3000"
HOST_URL="http://localhost:3000"

# Stripe (Desenvolvimento / Produção)
NEXT_PUBLIC_STIPE_PUBLIC_KEY="pk_test_..."
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
```

---

## 🚀 Executando o Projeto

### Passo 1: Inicializar o Banco de Dados (Prisma)
Certifique-se de aplicar as migrations ao banco de dados e gerar o cliente do Prisma:

```bash
npx prisma db push
```

### Passo 2: Executar o Webhook do Stripe localmente
Para receber as notificações de pagamento localmente, você deve ter a **Stripe CLI** instalada.

1. Faça login na sua conta do Stripe pelo terminal:
   ```bash
   stripe login
   ```
2. Inicie a escuta dos eventos redirecionando para a rota do webhook do projeto:
   ```bash
   npm run stripe:listen
   ```
3. Copie a chave secreta gerada no terminal (`whsec_...`) e cole na variável `STRIPE_WEBHOOK_SECRET` do seu arquivo `.env`.

### Passo 3: Rodar o Servidor de Desenvolvimento
Com as variáveis configuradas e o listener do Stripe ativo, execute:

```bash
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no seu navegador para testar a aplicação.

---

## 📁 Estrutura de Pastas Principal

```text
apoia_desenvolvedores/
├── prisma/               # Schema e migrações do banco de dados (Prisma)
└── src/
    ├── app/              # Rotas e páginas (App Router)
    │   ├── api/          # Rotas de API (Autenticação, Donates e Webhooks/Stripe)
    │   ├── creator/      # Páginas públicas dos criadores (/creator/[username])
    │   └── dashboard/    # Painel administrativo do criador
    ├── components/       # Componentes globais da interface (e UI shadcn)
    ├── lib/              # Configurações de clientes (Prisma, Stripe, Auth.js)
    ├── providers/        # Provedores de contexto (React Query, etc.)
    └── utils/            # Utilitários globais (Formatação de valores, slugs)
```