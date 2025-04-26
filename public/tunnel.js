// tunnel.js (ESM)

export class Tunnel {
    constructor(url) {
      this.socket = new WebSocket(url);
      this.callbacks = {};
      this.handlers = {};
      this.idCounter = 0;
  
      this.socket.onmessage = (event) => this._onMessage(event);
    }
  
    _onMessage(event) {
      const msg = JSON.parse(event.data);
      const { type, id, method, args, result, error } = msg;
  
      if (type === 'response') {
        if (this.callbacks[id]) {
          this.callbacks[id](result, error);
          delete this.callbacks[id];
        }
      }
  
      if (type === 'call') {
        const handler = this.handlers[method];
        if (handler) {
          Promise.resolve(handler(...args))
            .then((res) => {
              this._send({ type: 'response', id, result: res });
            })
            .catch((err) => {
              this._send({ type: 'response', id, error: err.message });
            });
        } else {
          this._send({ type: 'response', id, error: 'Método não encontrado no cliente' });
        }
      }
    }
  
    _send(obj) {
      this.socket.send(JSON.stringify(obj));
    }
  
    call(method, ...args) {
      return new Promise((resolve, reject) => {
        const id = ++this.idCounter;
        this.callbacks[id] = (result, error) => {
          if (error) reject(error);
          else resolve(result);
        };
        this._send({ type: 'call', id, method, args });
      });
    }
  
    bindInterface(method, fn) {
      this.handlers[method] = fn;
    }
  
    onOpen(callback) {
      this.socket.onopen = callback;
    }
  
    onClose(callback) {
      this.socket.onclose = callback;
    }
  
    onError(callback) {
      this.socket.onerror = callback;
    }
  }
  