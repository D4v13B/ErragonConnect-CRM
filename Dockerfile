# Usa una imagen base oficial de Node
FROM node:22-bullseye

# Crea un directorio de trabajo
WORKDIR /app

# Copia package.json y package-lock.json
COPY package*.json ./

# Instalamos puppeteer y descargamos Chromium
RUN npm install

# Instalamos dependencias necesarias para Chromium en Debian/Ubuntu
RUN apt-get update && apt-get install -y \
  wget \
  ca-certificates \
  fonts-liberation \
  libappindicator3-1 \
  libasound2 \
  libatk-bridge2.0-0 \
  libatk1.0-0 \
  libcups2 \
  libdbus-1-3 \
  libgdk-pixbuf2.0-0 \
  libnspr4 \
  libnss3 \
  libx11-xcb1 \
  libxcomposite1 \
  libxdamage1 \
  libxrandr2 \
  xdg-utils \
  --no-install-recommends \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/*

# Copia el resto del código
COPY . .

# Expon el puerto que usa tu app (si aplica)
EXPOSE 3000

# Comando para correr la aplicación
CMD ["npm", "run", "dev"]
