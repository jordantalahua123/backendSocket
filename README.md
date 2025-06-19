# Backend de Seguimiento de Conductores

Este es un servidor backend desarrollado con Node.js y Socket.IO para el seguimiento en tiempo real de conductores y rutas.

## Características

- Conexión en tiempo real mediante WebSockets
- Seguimiento de ubicación de conductores
- Actualización de estado de rutas
- Soporte para múltiples conexiones simultáneas
- CORS habilitado para conexiones desde cualquier origen

## Requisitos Previos

- Node.js (versión 14 o superior)
- npm (administrador de paquetes de Node.js)

## Instalación

1. Clona este repositorio:
```bash
git clone [URL_DEL_REPOSITORIO]
cd [NOMBRE_DEL_DIRECTORIO]
```

2. Instala las dependencias:
```bash
npm install
```

## Configuración

El servidor utiliza las siguientes variables de entorno:
- `PORT`: Puerto en el que se ejecutará el servidor (por defecto: 3000)

Para configurar las variables de entorno:
1. Crea un archivo `.env` en la raíz del proyecto
2. Añade las variables necesarias:
```
PORT=3000
```

## Ejecución

Para iniciar el servidor en modo desarrollo:
```bash
npm start
```

El servidor estará disponible en `http://localhost:3000`

## Endpoints y Eventos WebSocket

### HTTP Endpoints
- `GET /`: Ruta de verificación del servidor

### Eventos WebSocket

#### Eventos del Conductor
- `driver:connect`: Conecta un conductor al sistema
  ```javascript
  // Ejemplo de emisión
  socket.emit('driver:connect', { driverId: 'ID_DEL_CONDUCTOR' })
  ```

- `driver:location`: Actualiza la ubicación de un conductor
  ```javascript
  // Ejemplo de emisión
  socket.emit('driver:location', { 
    driverId: 'ID_DEL_CONDUCTOR',
    location: { lat: 0.0000, lng: 0.0000 }
  })
  ```

- `driver:disconnect`: Desconecta un conductor

#### Eventos de Ruta
- `route:status`: Actualiza el estado de una ruta
  ```javascript
  // Ejemplo de emisión
  socket.emit('route:status', {
    routeId: 'ID_DE_RUTA',
    status: 'ESTADO_DE_RUTA'
  })
  ```

## Contribución

Si deseas contribuir al proyecto, por favor:
1. Haz un Fork del repositorio
2. Crea una rama para tu característica (`git checkout -b feature/AmazingFeature`)
3. Haz commit de tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request 