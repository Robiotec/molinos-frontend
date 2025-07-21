import Pusher from "pusher-js";

export const pusherClient = new Pusher('app-key', {
  appId: 'app-id',
  key: 'app-key',
  secret: 'app-secret',
  wsHost: process.env.NEXT_PUBLIC_BACKEND_IP,
  wsPort: 6001,
  forceTLS: false,
  encrypted: true,
  disableStats: true,
  enabledTransports: ['ws', 'wss'],
  cluster: 'mt1',
});