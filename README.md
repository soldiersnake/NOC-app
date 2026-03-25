# Proyecto NOC

El objetivo de este proyecto es implementar la acquitectura limpia

# Dev

1. Clonar repositorio y reemplazar .env.template por .env
2. Configurar las variables de entorno
3. Ejecutar el comando `npm install`
4. Levantar las bases de datos con el comando
   ```
   docker compose up -d
   ```
5. Ejecutrar con `npm run dev`

```
PORT=3000

MAILER_EMAIL=mail@mail.com
MAILER_SECRET_KEY=123456

PROD=true
```

3. Instalar dependencias con `npm install` y luego ejecutar con `npm run dev`
