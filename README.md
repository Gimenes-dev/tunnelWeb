# 🔌 Tunnel WebSocket (RPC Bidirecional com Broadcast)

Este projeto é uma biblioteca e exemplo de aplicação para comunicação **bidirecional** entre cliente e servidor via **WebSocket**, usando um sistema de chamadas remotas (RPC) e suporte a **mensagens de broadcast** para todos os clientes conectados.

## ✨ Funcionalidades

- ✅ RPC cliente → servidor (`Tunnel.call`)
- ✅ RPC servidor → cliente (`Tunnel.bindInterface`)
- ✅ Comunicação assíncrona com `Promise` e `async/await`
- ✅ Mensagens de broadcast para todos os usuários conectados
- ✅ Modular com suporte a ESM (`import`)

---

## 📦 Estrutura

/tunnel-ws/
 ├── server.js # Servidor WebSocket + Express
 ├── public/
 │ ├── index.html # Frontend com botões de teste
 │ ├── tunnel.js # Biblioteca Tunnel (ESM)
 │ └── main.js # Exemplo de uso do Tunnel
 └── README.md

---

## 🚀 Como rodar localmente

### 1. Clonar o repositório

git clone https://github.com/Gimenes-dev/tunnelWeb
cd tunnel-ws

2. Instalar dependências
npm install

3. Rodar o servidor
node server.js

4. Abrir o navegador
Acesse: http://localhost:3000

🧪 Como testar
Testar Soma: Chama a função remota somar(a, b) no servidor.

Pedir notificação do servidor: Solicita que o servidor envie uma função de volta para o cliente (notificar).

Enviar mensagem para todos: Envia uma mensagem de broadcast para todos os clientes conectados (receberMensagem).

📚 API do Tunnel

Cliente

import { Tunnel } from './tunnel.js';

const tunnel = new Tunnel("ws://localhost:3000");

await tunnel.call("nomeMetodo", ...args);

tunnel.bindInterface("nomeMetodo", (...args) => { ... });


📌 Requisitos
Node.js 14+

Navegador moderno (suporte a módulos ES e WebSocket)

📄 Licença
Este projeto é open source e pode ser utilizado livremente.

Feito com 💻 por [Dev-Gimenes] – contribuições são bem-vindas!