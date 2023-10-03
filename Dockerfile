# Build client
FROM node:16 AS client-build
WORKDIR /app/client
COPY ./client/package*.json ./
RUN npm install
COPY ./client ./
RUN ls -al /app/client/public
RUN npm run build

# Build server
FROM python:3.11 AS server-build
WORKDIR /app
COPY --from=client-build /app/client ./client
RUN pip install Flask PGPy
COPY ./server ./server

# Expose port and run
EXPOSE 3000
CMD ["python", "./server/app.py"]
