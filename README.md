# Mensagens — Frontend

Aplicação frontend simples de mensagens construída com React + Vite. Fornece autenticação básica (JWT), listagem, criação, edição, exclusão e busca por ID de mensagens.

## Tecnologias
- React 19
- Vite
- Axios
- React Router
- CSS simples

## Estrutura principal
- Componente de aplicação: [`App`](src/App.jsx) — [src/App.jsx](src/App.jsx)  
- Páginas:
  - [`Home`](src/pages/Home.jsx) — [src/pages/Home.jsx](src/pages/Home.jsx)  
  - [`Login`](src/pages/Login.jsx) — [src/pages/Login.jsx](src/pages/Login.jsx)  
  - [`Register`](src/pages/Register.jsx) — [src/pages/Register.jsx](src/pages/Register.jsx)  
- Rota privada: [`PrivateRoute`](src/components/PrivateRoute.jsx) — [src/components/PrivateRoute.jsx](src/components/PrivateRoute.jsx)  
- Cliente HTTP: [`api`](src/services/api.js) — [src/services/api.js](src/services/api.js)  
- Estilos: [src/style/app.css](src/style/app.css)  
- Configuração do Vite: [vite.config.js](vite.config.js)  
- Ponto de entrada: [src/main.jsx](src/main.jsx)  
- HTML: [index.html](index.html)  
- Scripts e dependências: [package.json](package.json)

## Como rodar (desenvolvimento)
1. Instalar dependências:
```sh
npm install
```
2. Iniciar servidor de desenvolvimento:
```sh
npm run dev
```
3. Abrir no navegador:
```sh
$BROWSER http://localhost:5173
```

Para build de produção:
```sh
npm run build
```
Preview do build:
```sh
npm run preview
```

## Configuração da API e autenticação
- A URL base do backend está em [`src/services/api.js`](src/services/api.js). Atualize `baseURL` conforme necessário.
- O token JWT é armazenado em `localStorage` (chave `token`). O interceptor em [`api`](src/services/api.js) adiciona o header `Authorization: Bearer <token>` automaticamente.
- Rotas privadas são protegidas por [`PrivateRoute`](src/components/PrivateRoute.jsx) que verifica a presença do token e redireciona para a tela de login quando necessário.

## Fluxo de uso
- Cadastro: [`Register`](src/pages/Register.jsx) envia POST para `/usuarios`.
- Login: [`Login`](src/pages/Login.jsx) envia POST para `/auth/login` e salva o token.
- Área autenticada: [`Home`](src/pages/Home.jsx) lista `/mensagens`, permite criar, editar, excluir e buscar por ID.
- Operações típicas:
  - GET /mensagens — lista mensagens
  - POST /mensagens — cria mensagem
  - PUT /mensagens/:id — atualiza mensagem
  - DELETE /mensagens/:id — remove mensagem
  - GET /mensagens/:id — busca por ID

## Variáveis e arquivos importantes
- src/services/api.js — configuração do Axios e baseURL.
- src/components/PrivateRoute.jsx — proteção de rotas.
- src/style/app.css — estilo global.
- .env (opcional) — se usar variáveis de ambiente, configure build/env conforme necessário.

## Deploy
- Esta é uma aplicação estática gerada por Vite; o build em `dist/` pode ser servido por qualquer host (Netlify, Vercel, Nginx, etc).
- Para Vercel, verifique/adicione `vercel.json` com rewrites para `index.html` se necessário.

## Dicas e resolução de problemas
- Erro CORS: verifique a configuração do backend e permita a origem do frontend.
- URL do backend: edite `src/services/api.js` ou use variável de ambiente no build.
- HMR não funcionando: reinicie `npm run dev` e verifique `vite.config.js`.
- Problemas com dependências: tente `rm -rf node_modules package-lock.json && npm install`.

## Testes e lint
- Se houver scripts de teste e lint no `package.json`, execute:
```sh
npm run test
npm run lint
```

## Contribuição
Pull requests são bem-vindos. Siga as regras de lint e testes do projeto antes de enviar PR.

## Licença
Verifique o arquivo `LICENSE` na raiz do projeto para informações sobre a licença.
