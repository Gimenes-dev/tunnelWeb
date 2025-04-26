import { Tunnel } from './tunnel.js';

const tunnel = new Tunnel(`ws://${location.host}`);

tunnel.onOpen(() => {
  console.log("Conectado ao servidor!");

  tunnel.bindInterface('notificar', (mensagem) => {
    alert("Servidor disse: " + mensagem);
  });
});

document.getElementById('btnSoma').addEventListener('click', async () => {
  const resultado = await tunnel.call('somar', 5, 7);
  alert("Resultado da soma: " + resultado);
});

document.getElementById('btnNotificar').addEventListener('click', async () => {
  await tunnel.call('triggerFromServer');
});

document.getElementById('btnBroadcast').addEventListener('click', async () => {
    const texto = prompt("Mensagem para todos:");
    if (texto) {
      await tunnel.call('broadcastMensagem', texto);
    }
  });
  
  tunnel.bindInterface('receberMensagem', (mensagem) => {
    alert("Nova mensagem global: " + mensagem);
  });
  