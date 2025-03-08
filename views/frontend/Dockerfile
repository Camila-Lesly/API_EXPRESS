# Usamos una imagen base de Node.js
FROM node:18-alpine

# Establecemos el directorio de trabajo
WORKDIR /app

# Copiamos el archivo de dependencias de React
COPY package*.json ./

# Instalamos las dependencias de React
RUN npm install

# Copiamos el código fuente de React
COPY . .

# Creamos la aplicación de React en modo producción
RUN npm run build

# Instalamos un servidor web para servir los archivos estáticos
RUN npm install -g serve

# Exponemos el puerto del cliente React
EXPOSE 3000

# Comando para ejecutar el servidor
CMD ["serve", "-s", "build", "-l", "3000"]
