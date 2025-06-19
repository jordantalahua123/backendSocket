import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// Almacenar las conexiones de los conductores
const connectedDrivers = new Map();

io.on('connection', (socket) => {
  console.log('Cliente conectado:', socket.id);

  // Cuando un conductor se conecta
  socket.on('driver:connect', ({ driverId }) => {
    // Guardar la relación socket-conductor
    connectedDrivers.set(driverId, socket.id);
    socket.driverId = driverId;
    console.log(`Conductor ${driverId} conectado`);
  });

  // Cuando un conductor actualiza su ubicación
  socket.on('driver:location', ({ driverId, location }) => {
    // Emitir la ubicación a todos los interesados en este conductor
    io.emit(`driver:${driverId}:location`, location);
  });

  // Cuando se actualiza el estado de una ruta
  socket.on('route:status', ({ routeId, status }) => {
    // Notificar a todos los interesados sobre el cambio
    io.emit(`route:${routeId}:status`, status);
  });

  // Cuando un conductor se desconecta explícitamente
  socket.on('driver:disconnect', () => {
    if (socket.driverId) {
      connectedDrivers.delete(socket.driverId);
      console.log(`Conductor ${socket.driverId} desconectado`);
    }
  });

  // Cuando se pierde la conexión
  socket.on('disconnect', () => {
    if (socket.driverId) {
      connectedDrivers.delete(socket.driverId);
      console.log(`Conductor ${socket.driverId} desconectado por cierre de socket`);
    }
  });
});

// Ruta básica para verificar que el servidor está funcionando
app.get('/', (req, res) => {
  res.send('Servidor de sockets funcionando');
});

// Iniciar servidor
const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
}); 