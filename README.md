# SafeHer

## 1. Sobre o projeto

O SafeHer é uma aplicação web responsiva criada para empoderar mulheres com ferramentas simples de segurança pessoal, rede de apoio e acesso rápido a canais oficiais de emergência.

A proposta do MVP valida a hipótese de que uma usuária consegue abrir a aplicação, acionar ajuda rapidamente, obter a localização e compartilhar um link de apoio com sua rede de confiança.

## 2. Objetivo

O MVP do SafeHer foca em demonstrar o fluxo central:

- criar conta e fazer login;
- cadastrar contatos de confiança;
- acionar SOS com geolocalização;
- compartilhar a localização;
- acessar 190 e 180;
- visualizar histórico;
- acessar conteúdos educativos.

## 3. Tecnologias

- React
- Vite
- JavaScript
- Supabase
- PostgreSQL
- RLS

## 4. Instalação

```bash
npm install
```

## 5. Execução

```bash
npm run dev
```

## 6. Configuração do Supabase

1. Crie um projeto no Supabase.
2. Ative o recurso de autenticação por e-mail.
3. Crie as tabelas necessárias para `profiles`, `contatos`, `sessoes_sos`, `localizacoes_sos` e `conteudos`.
4. Configure o Row Level Security (RLS) para permitir que cada usuária visualize e altere apenas seus próprios dados.
5. No projeto, configure as variáveis de ambiente a seguir.

## 7. Variáveis de ambiente

Crie um arquivo `.env` baseado no `.env.example`:

```bash
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
```

> Nunca insira chaves reais no código do projeto.

## 8. Deploy

Para publicar na Vercel:

1. Crie um novo projeto no Vercel.
2. Conecte o repositório.
3. Defina as variáveis `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY`.
4. Configure o comando de build como `npm run build`.
5. Faça o deploy do projeto.

## Limitações

O SafeHer é uma ferramenta complementar de segurança. Em situações de emergência, procure os serviços oficiais de atendimento.
