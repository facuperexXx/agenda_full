# Etapa 1: Build con Node
FROM node:20-alpine AS builder

WORKDIR /app

# Copiamos package.json y lock file primero (cache de capas)
COPY package*.json ./

# Desactivar verificación estricta de SSL temporalmente
RUN npm config set strict-ssl false

# Instalamos dependencias
RUN npm install

# Copiamos el resto del código del frontend
COPY . .

# Construimos la app de producción
RUN npm run build

# Etapa 2: Servir con Nginx (imagen más liviana)
FROM nginx:alpine

# Copiamos el build al directorio de Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Exponemos el puerto 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
