import Pusher from "pusher-js";

export const pusherClientCurrents = new Pusher('app-key', {
  appId: 'app-id',
  key: 'app-key',
  secret: 'app-secret',
  wsHost: process.env.NEXT_PUBLIC_BACKEND_IP,
  wsPort: 1880,
  forceTLS: false,
  encrypted: true,
  disableStats: true,
  enabledTransports: ['ws', 'wss'],
  cluster: 'mt1',
});