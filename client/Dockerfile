FROM node:latest
WORKDIR /app
COPY . /app
ENV REACT_APP_REST=/api/
RUN npm i
RUN npm i -g serve
EXPOSE 3000
CMD ["serve","-s","build"]