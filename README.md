# SafeHer

Site responsivo com abordagem mobile-first para organizar contatos de confiança, acessar canais de emergência, consultar conteúdos educativos e compartilhar a localização em uma situação de risco.

O projeto é uma aplicação web: não gera APK. O frontend usa React, Vite e JavaScript; autenticação e dados são fornecidos pelo Supabase (PostgreSQL). O deploy está preparado para GitHub Pages e Vercel.

> O SafeHer é uma ferramenta complementar e não substitui os serviços oficiais de emergência. O SOS registra uma sessão e obtém a localização quando acionado; o compartilhamento é iniciado pela própria usuária. O site não envia alertas automaticamente nem acompanha localização em segundo plano.

## Funcionalidades

- Cadastro, login e sessão de usuária com Supabase Auth.
- Cadastro e gerenciamento de até cinco contatos de confiança.
- Acionamento do SOS com localização do navegador, registro e histórico no Supabase.
- Compartilhamento pelo recurso nativo do navegador ou cópia do link, quando disponível.
- Atalhos para os canais 190 e 180, conteúdos educativos e modo demonstração.

A geolocalização em produção requer HTTPS e permissão da usuária no navegador. O registro e a consulta de dados precisam de conexão com o Supabase.

## Requisitos

- Node.js `^20.19.0` ou `>=22.12.0` (requisito do Vite instalado).
- npm.
- Um projeto Supabase para habilitar autenticação, contatos e histórico online.

## Executar localmente

Instale as dependências:

```bash
npm ci
```

Crie um arquivo `.env.local` na raiz a partir de `.env.example` e configure as credenciais públicas do seu projeto Supabase:

```dotenv
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_ANON_KEY=sua-chave-publica-anon
```

Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

Sem as variáveis do Supabase, o site pode ser compilado, mas o login, os contatos e o histórico não funcionarão.

## Deploy no GitHub Pages

O repositório `profanacgpb/safeher` publica o site em `https://profanacgpb.github.io/safeher/`. As rotas internas, incluindo o cadastro, ficam abaixo desse caminho (por exemplo, `/safeher/cadastro`); `https://profanacgpb.github.io/cadastro/` não é o endereço deste projeto.

1. Em **Settings > Secrets and variables > Actions**, crie os secrets de repositório `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY` com os valores do projeto Supabase. O workflow exige ambos no build e não imprime seus valores.
2. Em **Settings > Pages**, selecione **GitHub Actions** como origem de publicação.
3. Execute o workflow **Deploy to GitHub Pages** manualmente na aba **Actions** ou faça push para `main`.
4. No Supabase, configure `https://profanacgpb.github.io/safeher/` como URL do site e permita redirecionamentos para as rotas do app em **Authentication > URL Configuration**.

Somente a chave pública `anon`/publishable deve ser usada em `VITE_SUPABASE_ANON_KEY`; nunca coloque a chave `service_role` no frontend ou nos secrets usados pelo build do site.

## Configurar Supabase

1. Crie um projeto no Supabase.
2. No **SQL Editor**, execute `supabase/schema.sql` e, em seguida, `supabase/policies.sql`.
3. Copie a URL do projeto e a chave pública anon/publishable para `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY`.
4. Em **Authentication > URL Configuration**, configure a URL local de desenvolvimento e o domínio de produção conforme necessário.
5. Ajuste a confirmação de e-mail conforme a política de autenticação desejada para o projeto.

O schema cria as tabelas PostgreSQL necessárias, e as políticas habilitam Row Level Security (RLS) para restringir contatos e sessões SOS à conta autenticada. Conteúdos ativos podem ser lidos publicamente.

As variáveis `VITE_*` são incluídas no bundle do navegador: utilize somente a chave pública anon/publishable. **Nunca exponha `service_role`, senhas ou qualquer segredo privilegiado no frontend ou no repositório.** O `.gitignore` exclui `.env.local` e arquivos de ambiente para evitar que credenciais locais sejam versionadas.

## Verificar e compilar

```bash
npm run lint
npm run build
npm run preview
```

O comando `npm run build` gera os arquivos de produção em `dist`. `npm run preview` serve localmente essa versão compilada.

## Deploy na Vercel

1. Importe este repositório na Vercel e selecione a raiz do projeto.
2. Configure o comando de build como `npm run build` e o diretório de saída como `dist` (ou deixe a Vercel detectar o preset Vite).
3. Cadastre `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY` em **Settings > Environment Variables** para os ambientes desejados.
4. Faça o deploy ou um novo redeploy após configurar as variáveis.
5. Adicione o domínio publicado à configuração de URLs permitidas em **Authentication > URL Configuration** no Supabase.

O arquivo `vercel.json` encaminha as rotas da aplicação para `index.html`, permitindo abrir e atualizar rotas internas do React Router diretamente.

## Scripts disponíveis

| Comando | Descrição |
| --- | --- |
| `npm run dev` | Inicia o servidor de desenvolvimento Vite. |
| `npm run lint` | Executa o Oxlint. |
| `npm run build` | Gera o site de produção em `dist`. |
| `npm run preview` | Pré-visualiza localmente o build de produção. |