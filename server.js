const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const path = require('path');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.use(express.static(path.join(__dirname, 'public')));

// Funções que o cliente pode chamar no servidor
const tunnelAPI = {
  somar: (a, b) => a + b,
  saudacao: (nome) => `Olá, ${nome}!`
};

wss.on('connection', (ws) => {
  ws.on('message', async (message) => {
    const msg = JSON.parse(message);
    const { type, id, method, args } = msg;

    if (method === 'broadcastMensagem') {
        const mensagem = args[0];
      
        // Broadcast para todos os clientes
        wss.clients.forEach((client) => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({
              type: 'call',
              id: Date.now(),
              method: 'receberMensagem',
              args: [mensagem]
            }));
          }
        });
      
        // Responde a quem chamou só pra confirmar
        ws.send(JSON.stringify({ type: 'response', id, result: 'Enviado para todos' }));
      }
      

    if (type === 'call') {
      if (tunnelAPI[method]) {
        const result = tunnelAPI[method](...args);
        ws.send(JSON.stringify({ type: 'response', id, result }));
      } else {
        ws.send(JSON.stringify({ type: 'response', id, error: 'Método não encontrado no servidor' }));
      }
    }

    if (type === 'response') {
      // esse tipo será usado se o cliente responder chamadas feitas pelo servidor
      // opcionalmente podemos gerenciar callbacks do servidor aqui também
    }

    // 💡 Comando exemplo para o servidor chamar uma função no cliente
    if (method === 'triggerFromServer') {
      setTimeout(() => {
        ws.send(JSON.stringify({
          type: 'call',
          id: Date.now(),
          method: 'notificar',
          args: ['Mensagem do servidor!']
        }));
      }, 2000);
    }
  });
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
