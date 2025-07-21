const wsHost = process.env.NEXT_PUBLIC_BACKEND_IP;
const wsURL = `ws://${wsHost}:1880/ws/molinos`;

export const webSocketCurrents = new WebSocket(wsURL);