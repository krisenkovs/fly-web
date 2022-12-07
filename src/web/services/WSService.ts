import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

type Callback = (data: any) => void;

class WSService {
  subscriptions: Map<number, { topic: string; callback: (data: any) => void }> = new Map();
  stompClient?: Client;

  connect() {
    if (!this.stompClient) {
      this.stompClient = new Client({
        webSocketFactory: () => new SockJS(`/wsocket`, undefined),
        debug: (message) => console.debug(message),
        onConnect: () => {
          this.subscriptions.forEach(({ topic, callback }, key) => {
            this.stompClient?.subscribe(
              `${topic}`,
              (message) => {
                callback(JSON.parse(message.body));
              },
              { id: key.toString() },
            );
          });
        },

        onStompError: (frame) => {
          console.error(`Stomp broker reported error: ${frame.headers['message']}`);
          console.error(`Additional details: ${frame.body}`);
        },
      });
    }
    this.stompClient.activate();
  }

  reconnect() {
    try {
      this.stompClient?.deactivate();
    } catch (e) {
      console.error(e);
    }
    this.stompClient = undefined;
    this.connect();
  }

  disconnect() {
    try {
      this.stompClient?.deactivate();
    } catch (e) {
      console.error(e);
    }
    this.stompClient = undefined;
  }

  subscribe(topic: string, callback: Callback): number {
    const id = Date.now();

    try {
      if (!topic) {
        throw new Error('topic is not set');
      }
      if (callback) {
        if (this.stompClient?.connected) {
          const i = this.stompClient.subscribe(
            topic,
            (message) => {
              callback(JSON.parse(message.body));
            },
            { id: id.toString() },
          );
        }

        this.subscriptions.set(id, { topic, callback });
      }
    } catch (e) {
      console.error(e);
    }
    return id;
  }

  unsubscribe(id: number) {
    if (id) {
      if (this.stompClient?.connected) {
        this.stompClient.unsubscribe(id.toString());
      }
      this.subscriptions.delete(id);
    }
  }
}

export const wsService = new WSService();
