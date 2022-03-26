FROM node:latest
WORKDIR /app
COPY . /app
ENV REACT_APP_REST=/api/
RUN npm i
RUN npm i -g serve
RUN npm run build
EXPOSE 3000
CMD ["serve","-s","build"]