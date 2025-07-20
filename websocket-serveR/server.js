const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 8080 });

console.log("WebSocket server running on ws://localhost:8080");

wss.on("connection", (ws) => {
  console.log("Client connected");

  const exchanges = ["Binance", "OKX", "Bybit", "Deribit"];

  const sendRandomUpdate = () => {
    const fromIndex = Math.floor(Math.random() * exchanges.length);
    let toIndex;
    do {
      toIndex = Math.floor(Math.random() * exchanges.length);
    } while (toIndex === fromIndex);

    const latency = Math.floor(Math.random() * 300);
    const volume = Math.floor(Math.random() * 600) + 50; // Trading volume

    const message = {
      from: exchanges[fromIndex],
      to: exchanges[toIndex],
      latency,
      volume,
    };

    ws.send(JSON.stringify(message));
  };

  const interval = setInterval(sendRandomUpdate, 3000);

  ws.on("close", () => {
    console.log("Client disconnected");
    clearInterval(interval);
  });
});
