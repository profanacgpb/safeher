<<<<<<< HEAD
# SafeHer

Aplicativo web responsivo e aplicativo Android para organizar uma rede de apoio, registrar sessões SOS e compartilhar a localização. O SafeHer é complementar e não substitui os serviços oficiais de emergência.

## Requisitos

- Node.js 20.19+ ou 22.12+
- Projeto Supabase para autenticação e dados online
- Android Studio e Android SDK para compilar o APK
- Java JDK compatível com a versão do Android Gradle Plugin instalada pelo Capacitor

## Configuração do Supabase

1. Crie um projeto no Supabase.
2. No SQL Editor do projeto, execute `supabase/schema.sql` e depois `supabase/policies.sql`.
3. Copie `.env.example` para `.env` e preencha:

   ```dotenv
   VITE_SUPABASE_URL=https://seu-projeto.supabase.co
   VITE_SUPABASE_ANON_KEY=sua-chave-publica-anon
   ```

   Use somente a chave pública anon/publishable no cliente. Nunca coloque a `service_role` ou outra chave privilegiada no app.
4. Configure confirmação de e-mail e URLs de redirecionamento em **Authentication > URL Configuration** no Supabase.
5. A autenticação e o banco são protegidos pelo Supabase; os arquivos SQL habilitam RLS e restringem os dados à conta autenticada.

Sem as variáveis do Supabase, o projeto ainda pode ser compilado, mas login, contatos e histórico não estarão disponíveis.

## Executar e publicar na web

```bash
npm install
npm run dev
```

Para validar e gerar os arquivos estáticos:

```bash
npm run lint
npm run build
npm run preview
```

O diretório de publicação é `dist`. Para publicar na Vercel:

1. Importe o repositório na Vercel.
2. Use `npm run build` como comando de build e `dist` como diretório de saída.
3. Cadastre `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY` nas variáveis de ambiente do projeto, para cada ambiente usado.
4. Faça o deploy e inclua o domínio público em **Authentication > URL Configuration** no Supabase.

O arquivo `vercel.json` mantém as rotas da aplicação funcionando ao atualizar ou abrir uma URL interna diretamente. Para outro provedor, configure o fallback de rotas SPA para `index.html`.

## Gerar o APK Android

As variáveis do Supabase precisam estar configuradas antes do build; os valores públicos são incluídos no app cliente.

```bash
npm install
npx cap add android
npm run cap:sync
npm run android
```

No Android Studio, aguarde a sincronização do Gradle e use **Build > Build Bundle(s) / APK(s) > Build APK(s)**. O APK de depuração costuma ser gerado em `android/app/build/outputs/apk/debug/app-debug.apk`. Para distribuir publicamente, gere uma versão assinada em **Build > Generate Signed Bundle / APK** e guarde a chave de assinatura em local seguro, fora do repositório.

Após alterações no front-end, execute `npm run cap:sync` novamente antes de recompilar o Android. O app solicita permissão de localização no dispositivo quando o SOS é iniciado.

## Limitações importantes

- O link de localização só é enviado quando a usuária escolhe um meio de compartilhamento; o app não envia alertas automaticamente nem monitora a localização em segundo plano.
- A versão web precisa ser servida por HTTPS para acessar a geolocalização nos navegadores.
- O SOS depende de conectividade com o Supabase para registrar e encerrar sessões.
- Em uma emergência, priorize os serviços oficiais, como 190 e 180.
=======
# safeher
>>>>>>> 9779d921116febdc5225eb44ec40119721b740b2
